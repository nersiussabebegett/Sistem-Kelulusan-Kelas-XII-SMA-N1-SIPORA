import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  isValid: boolean | null;
}

export const Captcha: React.FC<CaptchaProps> = ({ onVerify, isValid }) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateCaptcha = useCallback(() => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserInput('');
    onVerify(false);
  }, [onVerify]);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setUserInput(value);
    if (value.length === 5) {
      if (value === captchaCode) {
        onVerify(true);
      } else {
        onVerify(false);
      }
    } else {
      onVerify(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
        Kode Keamanan (CAPTCHA)
      </label>
      
      <div className="flex items-center space-x-3">
        {/* Captcha Box Design */}
        <div className="relative flex h-11 w-36 items-center justify-center rounded-lg border border-slate-300 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 px-3 font-mono text-xl font-black tracking-widest text-emerald-300 shadow-inner select-none overflow-hidden">
          {/* Subtle noise lines */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.08)_50%,transparent_75%)] bg-[length:10px_10px]" />
          <span className="relative z-10 transform -rotate-1 skew-x-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {captchaCode}
          </span>
        </div>

        <button
          type="button"
          onClick={generateCaptcha}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          title="Acak Ulang CAPTCHA"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          maxLength={5}
          placeholder="Ketik 5 karakter di atas"
          className={`w-full rounded-lg border-2 px-3 py-2.5 text-sm uppercase transition focus:outline-none focus:ring-2 ${
            isValid === true
              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 focus:ring-emerald-500 font-bold'
              : isValid === false && userInput.length === 5
              ? 'border-rose-600 bg-rose-50 text-rose-900 focus:ring-rose-500 font-bold'
              : 'border-black bg-white text-slate-800 focus:ring-blue-500 font-bold'
          }`}
        />
        {isValid === true && (
          <CheckCircle2 className="absolute right-3 top-3.5 h-4 w-4 text-emerald-600" />
        )}
        {isValid === false && userInput.length === 5 && (
          <AlertCircle className="absolute right-3 top-3.5 h-4 w-4 text-rose-600" />
        )}
      </div>
      {isValid === false && userInput.length === 5 && (
        <p className="text-xs text-rose-600 dark:text-rose-400">Kode CAPTCHA tidak cocok. Silakan coba lagi.</p>
      )}
    </div>
  );
};
