"use client";

import { useEffect, useRef } from "react";

// ──────────────────────────────────────────────────────────────────
// Donorbox OmniGive Embed
// ──────────────────────────────────────────────────────────────────
// Donorbox's widgets.js has multiple bugs that surface in React/Next:
//   1. `attachAddressAutocomplete` reads `.parentElement` on null
//   2. `attributeChangedCallback` crashes with `Object.values(null)`
//   3. Re-registration of custom elements throws on re-mount
//   4. Constructor sets attributes, violating CE spec on createElement
//
// Strategy: inject the widget via innerHTML (bypasses createElement
// constructor issues), load the script only once globally, and
// suppress known Donorbox errors at the window level.
// ──────────────────────────────────────────────────────────────────

// Global flag — Donorbox script must only be loaded once per page
// since custom elements can never be re-registered.
const DONORBOX_SCRIPT_ID = "__donorbox_widgets_script";

function ensureDonorboxScript(): void {
    if (document.getElementById(DONORBOX_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = DONORBOX_SCRIPT_ID;
    script.type = "module";
    script.src = "https://donorbox.org/widgets.js";
    script.async = true;
    document.body.appendChild(script);
}

// Install a one-time global error suppression for known Donorbox bugs.
// This lives outside the component so it's never duplicated or torn down.
let errorHandlersInstalled = false;

function installGlobalErrorHandlers(): void {
    if (typeof window === "undefined" || errorHandlersInstalled) return;
    errorHandlersInstalled = true;

    // Suppress known Donorbox TypeErrors that hit the global window object
    const errorsToIgnore = [
        "Cannot read properties of null (reading 'parentElement')",
        "Cannot convert undefined or null to object", // Donorbox Object.values null check
        "must not have attributes", // Donorbox createElement bug
        "Cannot read properties of undefined (reading 'disconnectedCallback')", // Early unmount bug
        "disconnectedCallback",
        "Orphaned iframed", // Browser extensions/iframes clashing
    ];

    window.addEventListener(
        "error",
        (event) => {
            if (
                errorsToIgnore.some((msg) =>
                    event.message?.toLowerCase().includes(msg.toLowerCase())
                )
            ) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        },
        true
    );

    window.addEventListener(
        "unhandledrejection",
        (event) => {
            const msg = event.reason?.message || String(event.reason);
            if (
                errorsToIgnore.some((ignoreMsg) =>
                    msg.toLowerCase().includes(ignoreMsg.toLowerCase())
                )
            ) {
                event.preventDefault();
            }
        },
        true
    );

    // Extremely aggressive Next.js overlay suppression for Donorbox unmount bugs
    // Next.js patches console.error to show the overlay. We patch it back for these specific messages.
    const originalConsoleError = console.error;
    console.error = function (...args) {
        const msg = args.join(" ").toLowerCase();
        if (errorsToIgnore.some((ignoreMsg) => msg.includes(ignoreMsg.toLowerCase()))) {
            return; // Swallow it completely
        }
        originalConsoleError.apply(console, args);
    };
}

// Patch customElements.define once to wrap Donorbox's lifecycle methods
let cePatched = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function patchDboxPrototype(proto: any) {
    if (proto.__patched) return;
    proto.__patched = true;

    // Wrap connectedCallback to catch parentElement bug during init
    const origConnected = proto.connectedCallback;
    if (origConnected) {
        proto.connectedCallback = function (this: HTMLElement) {
            try {
                return origConnected.call(this);
            } catch {
                // Silently swallow
            }
        };
    }

    // Wrap attributeChangedCallback to catch null-object bug
    const origAttr = proto.attributeChangedCallback;
    if (origAttr) {
        proto.attributeChangedCallback = function (
            this: HTMLElement,
            ...args: unknown[]
        ) {
            try {
                return origAttr.apply(this, args);
            } catch {
                // Silently swallow
            }
        };
    }

    // Wrap disconnectedCallback to prevent unmount crashes
    const origDisconnected = proto.disconnectedCallback;
    if (origDisconnected) {
        proto.disconnectedCallback = function (this: any) {
            try {
                // If the widget was unmounted before widgetClass initialized
                if (!this.widgetClass) return;
                return origDisconnected.call(this);
            } catch {
                // Silently swallow
            }
        };
    }
}

function patchCustomElementsDefine(): void {
    if (cePatched) return;
    cePatched = true;

    // Next.js Hot Reload Support: If the element is ALREADY defined via a previous render,
    // we must patch its prototype directly, because customElements.define won't run again.
    const existingDbox = customElements.get("dbox-widget");
    if (existingDbox) {
        patchDboxPrototype(existingDbox.prototype);
    }

    const originalDefine = customElements.define.bind(customElements);

    // Patch customElements.define to catch prototype methods for initial registration
    customElements.define = function (
        name: string,
        constructor: CustomElementConstructor,
        options?: ElementDefinitionOptions
    ) {
        if (name.startsWith("dbox-")) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            patchDboxPrototype((constructor as any).prototype);
        }

        // Guard against duplicate registration (throws NotSupportedError)
        if (customElements.get(name)) return;
        return originalDefine(name, constructor, options);
    };
}

// ──────────────────────────────────────────────────────────────────
// Address Autocomplete Bug Fix
// ──────────────────────────────────────────────────────────────────
// Donorbox's address autocomplete tries to access `.parentElement`
// on specific elements queried from its shadow root, even if the
// campaign doesn't use those fields (resulting in a null reference).
// We intercept `DocumentFragment.prototype.querySelector` to return
// dummy elements for these specific IDs if missing.
// ──────────────────────────────────────────────────────────────────
let qSelectorPatched = false;

function patchShadowRootQuerySelector(): void {
    if (qSelectorPatched) return;
    if (typeof DocumentFragment === "undefined") return;
    qSelectorPatched = true;

    const originalQuerySelector = DocumentFragment.prototype.querySelector;
    DocumentFragment.prototype.querySelector = function (
        this: DocumentFragment,
        selectors: string
    ) {
        const res = originalQuerySelector.call(this, selectors);
        if (res !== null) return res;

        // If the query failed, and it's one of Donorbox's expected fields:
        const donorboxFields = [
            "#donation_address",
            "#donation_zip_code",
            "#donation_country",
            "#donation_city",
            "#state_selector",
        ];

        if (donorboxFields.includes(selectors)) {
            const dummyInput = document.createElement("input");
            const dummyWrapper = document.createElement("div");
            dummyInput.id = selectors.replace("#", "");
            dummyWrapper.appendChild(dummyInput);
            return dummyInput;
        }

        return res;
    };
}

export function DonorboxEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // One-time global setup (idempotent)
        installGlobalErrorHandlers();
        patchCustomElementsDefine();
        patchShadowRootQuerySelector();

        // Inject the widget via innerHTML so the browser's HTML parser
        // creates the element — this avoids the createElement constructor
        // crash that happens when `dbox-widget` is already registered.
        const container = containerRef.current;
        container.innerHTML = `<dbox-widget campaign="medical-missions-917264" type="donation_form" enable-auto-scroll="true"></dbox-widget>`;

        // Load (or re-use) the Donorbox script
        ensureDonorboxScript();

        return () => {
            // Clean up the widget DOM on unmount
            container.innerHTML = "";
        };
    }, []);

    return (
        <div className="w-full h-full min-h-[600px] flex flex-col items-center justify-center relative bg-white/[0.02] rounded-[3rem] border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl p-4 md:p-14">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
            
            <div className="w-full h-full max-w-md mx-auto z-10 relative">
                <p className="text-white/40 text-[10px] uppercase font-mono tracking-widest text-center mb-6">
                    Secure International Gateway
                </p>
                
                {/* 
                    Container for the OmniGive Web Component.
                    We inject the actual <dbox-widget> via innerHTML into this div.
                */}
                <div 
                    ref={containerRef} 
                    className="w-full max-w-[425px] min-w-[250px] mx-auto min-h-[400px]"
                />
            </div>
        </div>
    );
}
