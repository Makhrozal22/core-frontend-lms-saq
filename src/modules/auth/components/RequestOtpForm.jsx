import React from 'react';

export const RequestOtpForm = ({ phone, setPhone, onSubmit, loading }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-5 animate-fadeIn">
            <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Nomor HP / WhatsApp
                </label>
                <div className="relative flex items-center group">
                    <div className="absolute left-3.5 text-slate-400 group-focus-within:text-[#5B7EB5] transition-colors pointer-events-none">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                    </div>
                    <input
                        type="tel"
                        placeholder="Contoh: 081234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#5B7EB5] focus:ring-2 focus:ring-[#5B7EB5]/20 transition-all text-sm font-medium"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading || !phone}
                className="w-full py-3.5 rounded-xl bg-[#5B7EB5] hover:bg-[#4A6FA5] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#5B7EB5]/25 cursor-pointer"
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                ) : (
                    <span>Kirim Kode OTP</span>
                )}
            </button>
        </form>
    );
};