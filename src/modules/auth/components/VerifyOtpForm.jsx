import React, { useRef } from 'react';

export const VerifyOtpForm = ({ phone, otpCode, setOtpCode, onSubmit, onBack, loading }) => {
    const inputRefs = useRef([]);

    // Auto-focus & format split input 6 digit
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = otpCode.split('');
        newOtp[index] = value.substring(value.length - 1);
        const combinedOtp = newOtp.join('');
        setOtpCode(combinedOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 animate-fadeIn">
            <div>
                <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-semibold text-slate-300">
                        Kode Verifikasi OTP
                    </label>
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-xs text-[#5B7EB5] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                    >
                        Ubah No HP ({phone})
                    </button>
                </div>

                {/* Input 6 Kotak */}
                <div className="flex justify-between gap-2 my-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={otpCode[index] || ''}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-13 text-center text-xl font-bold bg-slate-800/60 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#5B7EB5] focus:ring-2 focus:ring-[#5B7EB5]/30 transition-all"
                        />
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={loading || otpCode.length < 6}
                className="w-full py-3.5 rounded-xl bg-[#5B7EB5] hover:bg-[#4A6FA5] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#5B7EB5]/25 cursor-pointer"
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                ) : (
                    <span>Verifikasi & Masuk</span>
                )}
            </button>
        </form>
    );
};