"use client";

import { Building2, Globe2, Smartphone } from "lucide-react";
import { useState } from "react";

function CopyableField({ label, value }: { label: string; value: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col justify-center py-3 border-b border-white/5 last:border-0 group cursor-pointer" onClick={handleCopy}>
            <span className="text-white/50 text-[10px] md:text-xs font-mono tracking-widest uppercase mb-2">
                {label}
            </span>
            <div className="flex items-center justify-between w-full gap-4">
                <span className="text-white font-medium text-base md:text-lg truncate" style={{ fontFamily: "var(--font-body)" }}>
                    {value}
                </span>
                <span className={`shrink-0 text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded transition-colors ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-white/30 border border-white/10 group-hover:bg-white/10 group-hover:text-white/70'}`}>
                    {copied ? 'Copied' : 'Copy'}
                </span>
            </div>
        </div>
    );
}

export function DirectTransferInfo() {
    return (
        <div className="w-full md:h-full md:min-h-[600px] flex flex-col gap-6 p-4 sm:p-6 md:p-14 rounded-[2rem] sm:rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
            
            <div className="text-center mb-4 md:mb-6">
                <p className="text-[var(--color-clay)] font-mono text-[10px] sm:text-xs tracking-widest uppercase font-bold mb-2">
                    Direct Contribution
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Bank & Mobile Money
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-2 md:mt-3 max-w-md mx-auto leading-relaxed">
                    For large contributions or if you prefer manual transfers. Please use your name or "Donation" as the reference.
                </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-8">
                
                {/* Local Bank Transfer */}
                <div className="group bg-black/20 border border-white/10 rounded-[2rem] p-6 hover:border-[var(--color-clay)]/50 transition-all hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(204,88,51,0.05)]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-clay)]/10 flex items-center justify-center text-[var(--color-clay)]">
                            <Building2 size={20} />
                        </div>
                        <h4 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                            Local Bank (GHS)
                        </h4>
                    </div>
                    <div className="flex flex-col">
                        <CopyableField label="Bank Name" value="Ecobank Ghana" />
                        <CopyableField label="Account Name" value="Christian Medical Missions" />
                        <CopyableField label="Account Number" value="1234567890123" />
                        <CopyableField label="Branch" value="Spintex Road" />
                    </div>
                </div>

                {/* International Bank Transfer */}
                <div className="group bg-black/20 border border-white/10 rounded-[2rem] p-6 hover:border-[var(--color-clay)]/50 transition-all hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(204,88,51,0.05)]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-clay)]/10 flex items-center justify-center text-[var(--color-clay)]">
                            <Globe2 size={20} />
                        </div>
                        <h4 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                            Foreign Currency (USD/EUR/GBP)
                        </h4>
                    </div>
                    <div className="flex flex-col">
                        <CopyableField label="Bank Name" value="Ecobank Ghana" />
                        <CopyableField label="Account Name" value="Christian Medical Missions" />
                        <CopyableField label="Account Number / IBAN" value="GH00ECOB00000000000000" />
                        <CopyableField label="SWIFT / BIC" value="ECOCGHAC" />
                    </div>
                </div>

                {/* Mobile Money Direct */}
                <div className="group bg-black/20 border border-white/10 rounded-[2rem] p-6 hover:border-[var(--color-clay)]/50 transition-all hover:bg-white/[0.05] hover:shadow-[0_0_20px_rgba(204,88,51,0.05)]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[var(--color-clay)]/10 flex items-center justify-center text-[var(--color-clay)]">
                            <Smartphone size={20} />
                        </div>
                        <h4 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
                            Mobile Money
                        </h4>
                    </div>
                    <div className="flex flex-col">
                        <CopyableField label="MTN MoMo" value="024 123 4567" />
                        <CopyableField label="Vodafone Cash" value="020 123 4567" />
                        <CopyableField label="Registered Name" value="CMRF NGO" />
                    </div>
                </div>

            </div>

            <div className="mt-4 p-4 rounded-2xl bg-[var(--color-clay)]/10 border border-[var(--color-clay)]/20 text-center">
                <p className="text-[var(--color-clay)] text-xs md:text-sm font-mono tracking-wide leading-relaxed">
                    Have you completed a manual transfer? <br />
                    Email your receipt to <strong className="text-white">donations@cmrfgh.com</strong> for a formal acknowledgment.
                </p>
            </div>
        </div>
    );
}
