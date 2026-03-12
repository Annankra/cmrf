"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Loader2, Heart } from "lucide-react";
import { usePaystackPayment } from "react-paystack";
import gsap from "gsap";

const PRESET_AMOUNTS = [
    { cents: 2500, label: "GHS 250", ghscents: 25000, impact: "provides a full medical screening for one community member." },
    { cents: 5000, label: "GHS 500", ghscents: 50000, impact: "funds essential medications and lab tests for acute cases." },
    { cents: 10000, label: "GHS 1,000", ghscents: 100000, impact: "supports a complete specialized surgical procedure." },
    { cents: 25000, label: "GHS 2,500", ghscents: 250000, impact: "sponsors an entire day of a medical outreach camp." },
    { cents: 50000, label: "GHS 5,000", ghscents: 500000, impact: "equips a rural health post with life-saving diagnostic tools." },
];

function MagneticSelection({
    amount,
    isSelected,
    onClick,
}: {
    amount: { label: string };
    isSelected: boolean;
    onClick: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(ref.current, {
            x: x * 0.4,
            y: y * 0.4,
            scale: 1.05,
            duration: 0.6,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <button
            ref={ref}
            type="button"
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative outline-none focus:outline-none group overflow-hidden py-4 md:py-6 rounded-[1.5rem] border transition-all duration-500 cursor-pointer ${isSelected
                ? "bg-[var(--color-clay)] border-[var(--color-clay)] shadow-[0_0_30px_rgba(204,88,51,0.3)] text-white"
                : "bg-white/[0.03] border-white/10 text-white/70 hover:text-white hover:border-[var(--color-clay)]/50 hover:bg-white/[0.08]"
                }`}
        >
            <span
                className={`absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`}
            />
            <span className="relative z-10 font-bold text-[15px] md:text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                {amount.label}
            </span>
        </button>
    );
}

export function PaystackForm() {
    const [selectedGhsCents, setSelectedGhsCents] = useState<number>(100000); // Default 1000 GHS
    const [customAmount, setCustomAmount] = useState("");
    const [donorName, setDonorName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Calculated amount in pesewas (GHS cents)
    const amountInPesewas = customAmount
        ? Math.round(parseFloat(customAmount) * 100)
        : selectedGhsCents;

    const config = {
        reference: new Date().getTime().toString(),
        email: donorEmail || "anonymous@cmrfgh.com",
        amount: amountInPesewas, 
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_placeholder_key_replace_me",
        currency: "GHS",
        metadata: {
            custom_fields: [
                {
                    display_name: "Donor Name",
                    variable_name: "donor_name",
                    value: donorName || "Anonymous Donor",
                },
                {
                    display_name: "Donation Purpose",
                    variable_name: "purpose",
                    value: "General Fund - CMRF",
                }
            ]
        }
    };

    const initializePayment = usePaystackPayment(config);

    const onSuccess = (reference: any) => {
        setLoading(false);
        // In a real app, you might verify this reference on your backend, 
        // or redirect to a success page.
        window.location.href = `/donate/success?ref=${reference.reference}`;
    };

    const onClose = () => {
        setLoading(false);
        setError("Transaction cancelled.");
    };

    const handleSubmit = () => {
        setError("");
        
        if (!amountInPesewas || amountInPesewas < 100) {
            setError("Minimum donation is GHS 1.00");
            return;
        }

        if (!donorEmail) {
            setError("Please provide an email address for your receipt.");
            return;
        }

        if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
            console.warn("Missing Paystack public key. Using placeholder.");
        }

        setLoading(true);
        // Start Paystack Checkout
        initializePayment({ onSuccess, onClose });
    };

    return (
        <div className="bg-white/[0.02] rounded-[3rem] p-6 md:p-14 border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
            
            <div className="mb-10 text-center">
                <p className="text-[var(--color-clay)] font-mono text-xs tracking-widest uppercase font-bold mb-2">
                    Ghana Local Gateway
                </p>
                <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Card & Mobile Money
                </h3>
            </div>

            <div className="mb-10">
                <h4 className="text-sm font-bold text-white/50 mb-4 uppercase tracking-widest font-mono">
                    Select Contribution (GHS)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                    {PRESET_AMOUNTS.map((amt) => (
                        <MagneticSelection
                            key={amt.ghscents}
                            amount={amt}
                            isSelected={selectedGhsCents === amt.ghscents && !customAmount}
                            onClick={() => {
                                setSelectedGhsCents(amt.ghscents);
                                setCustomAmount("");
                            }}
                        />
                    ))}
                </div>

                {/* Dynamic Impact Visualizer */}
                <div className="flex items-start gap-4 mt-8 min-h-[48px] overflow-hidden">
                    <div className="flex items-center gap-2 mt-1 shrink-0">
                        <div className={`w-1.5 h-1.5 rounded-full ${(!customAmount && selectedGhsCents) ? 'bg-[var(--color-clay)] animate-pulse' : 'bg-white/20'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${(!customAmount && selectedGhsCents) ? 'text-[var(--color-clay)]' : 'text-white/40'}`}>
                            Impact Level:
                        </span>
                    </div>
                    <div className="relative flex-1">
                        <p className={`text-sm md:text-base font-drama italic leading-tight transition-colors duration-300 ${(!customAmount && selectedGhsCents) ? 'text-[var(--color-clay)]' : 'text-white/40'}`}>
                            {(!customAmount && selectedGhsCents) 
                                ? (PRESET_AMOUNTS.find(a => a.ghscents === selectedGhsCents)?.impact || "directs critical resources where they are needed most.")
                                : "directs critical resources where they are needed most."
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Input */}
            <div className="mb-10 relative group">
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 font-mono">
                    Custom Amount (GHS)
                </label>
                <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-lg md:text-2xl font-bold text-[var(--color-clay)]">₵</span>
                    <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedGhsCents(0);
                        }}
                        placeholder="Amount..."
                        className="w-full bg-black/20 border border-white/10 focus:border-[var(--color-clay)] focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(204,88,51,0.15)] rounded-[2rem] py-5 md:py-6 pl-14 pr-6 md:px-12 text-xl md:text-3xl font-bold text-white transition-all outline-none placeholder:text-white/20"
                        style={{ fontFamily: "var(--font-heading)" }}
                    />
                </div>
            </div>

            {/* Data Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                    { id: "name", label: "Donor Name (Optional)", val: donorName, set: setDonorName, type: "text", ph: "Full Name" },
                    { id: "email", label: "Email Address (Required)", val: donorEmail, set: setDonorEmail, type: "email", ph: "your@email.com" },
                ].map((field) => (
                    <div key={field.id} className="group relative">
                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 font-mono group-focus-within:text-[var(--color-clay)] transition-colors">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            value={field.val}
                            onChange={(e) => field.set(e.target.value)}
                            placeholder={field.ph}
                            className="w-full bg-black/20 border border-white/10 focus:border-[var(--color-clay)] focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(204,88,51,0.1)] rounded-[1.5rem] py-4 px-6 text-white transition-all outline-none font-medium placeholder:text-white/20"
                        />
                    </div>
                ))}
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/20 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    {error}
                </div>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn btn-primary outline-none focus:outline-none w-full py-6 md:py-8 text-lg md:text-xl font-bold shadow-xl shadow-[var(--color-clay)]/20 disabled:opacity-50 hover:shadow-[0_0_40px_rgba(204,88,51,0.4)] transition-all"
            >
                <span className="btn-text flex items-center justify-center gap-4">
                    {loading ? (
                        <Loader2 size={24} className="animate-spin" />
                    ) : (
                        <>
                            Proceed to Paystack Secure Checkout
                            <ArrowRight size={24} />
                        </>
                    )}
                </span>
            </button>

            <div className="mt-8 flex items-center justify-center gap-4 md:gap-8 border-t border-white/5 pt-8 flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">Encrypted-SSL</span>
                </div>
                <div className="flex items-center gap-2">
                    <Heart size={12} className="text-[var(--color-clay)]" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">Powered by Paystack</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">MoMo Supported</span>
                </div>
            </div>
        </div>
    );
}
