"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to error reporting service if configured
        console.error("App Route Error Boundary caught error:", error);
    }, [error]);

    return (
        <div className="min-h-[75vh] w-full flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="max-w-md w-full bg-[var(--color-charcoal)]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
                    <AlertTriangle size={32} />
                </div>

                <div className="space-y-2">
                    <h2
                        className="text-2xl font-bold text-[var(--color-cream)] tracking-tight"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Something went wrong
                    </h2>
                    <p className="text-sm text-[var(--color-cream)]/70 leading-relaxed">
                        We encountered an unexpected issue while loading this page. Please try refreshing or return home.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                        onClick={() => reset()}
                        className="btn btn-primary w-full sm:w-auto"
                    >
                        <RefreshCw size={16} />
                        <span>Try Again</span>
                    </button>

                    <Link
                        href="/"
                        className="btn btn-ghost w-full sm:w-auto"
                    >
                        <Home size={16} />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
