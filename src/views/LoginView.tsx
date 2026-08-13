import React, { useState } from 'react';
import { Lock, User, KeyRound } from 'lucide-react';
import { UserAccount, Student } from '../types';
import { Captcha } from '../components/Captcha';

interface LoginViewProps {
  accounts: UserAccount[];
  students: Student[];
  onLoginSuccess: (user: UserAccount) => void;
  setActiveTab: (tab: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  accounts,
  students,
  onLoginSuccess,
  setActiveTab,
}) => {
  const [loginType, setLoginType] = useState<'staff' | 'siswa'>('staff');

  // Staff Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Siswa Form
  const [nisn, setNisn] = useState('');
  const [dob, setDob] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState<boolean | null>(null);

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const account = accounts.find((a) => a.username.toLowerCase() === username.trim().toLowerCase());
    if (account) {
      onLoginSuccess(account);
      setActiveTab('admin-dashboard');
    } else {
      alert('Username atau password tidak ditemukan. Silakan gunakan tombol Akses Cepat Demo di bawah.');
    }
  };

  const handleSiswaLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaValid) {
      alert('Silakan verifikasi kode CAPTCHA dengan benar.');
      return;
    }

    const student = students.find((s) => s.nisn.trim() === nisn.trim() && s.dob.trim() === dob.trim());
    if (student) {
      const studentUser: UserAccount = {
        id: `usr-${student.nisn}`,
        username: student.nisn,
        name: student.name,
        role: 'siswa',
        email: `${student.nisn}@siswa.sman1sipora.sch.id`,
        studentNisn: student.nisn,
      };
      onLoginSuccess(studentUser);
      setActiveTab('cek-kelulusan');
    } else {
      alert('Kombinasi NISN dan Tanggal Lahir tidak ditemukan.');
    }
  };

  const handleDemoQuickLogin = (role: 'admin' | 'operator' | 'kepala_sekolah' | 'siswa') => {
    if (role === 'siswa') {
      const sampleStudent = students[0];
      const studentUser: UserAccount = {
        id: `usr-${sampleStudent.nisn}`,
        username: sampleStudent.nisn,
        name: `${sampleStudent.name} (Siswa)`,
        role: 'siswa',
        email: `${sampleStudent.nisn}@siswa.sman1sipora.sch.id`,
        studentNisn: sampleStudent.nisn,
      };
      onLoginSuccess(studentUser);
      setActiveTab('cek-kelulusan');
    } else {
      const acc = accounts.find((a) => a.role === role) || accounts[0];
      onLoginSuccess(acc);
      setActiveTab('admin-dashboard');
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md py-12 font-sans">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
            Portal Login Sistem
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            SMA Negeri 1 Sipora • Kabupaten Kepulauan Mentawai
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/60 p-1 border border-slate-200/60 dark:border-slate-700/60">
          <button
            onClick={() => setLoginType('staff')}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              loginType === 'staff'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Staff / Manajemen
          </button>
          <button
            onClick={() => setLoginType('siswa')}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
              loginType === 'siswa'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Siswa (NISN)
          </button>
        </div>

        {/* Staff Form */}
        {loginType === 'staff' ? (
          <form onSubmit={handleStaffLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Username Staff
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin / operator / kepsek"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 pl-9 pr-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/80 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 pl-9 pr-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/80 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-normal">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                Ingat Saya
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-4 py-2.5 text-xs font-semibold shadow-sm shadow-emerald-500/20 transition-all active:scale-98"
            >
              Masuk Panel SMAN 1 Sipora
            </button>
          </form>
        ) : (
          /* Siswa Form */
          <form onSubmit={handleSiswaLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                NISN (10 Digit)
              </label>
              <input
                type="text"
                required
                maxLength={10}
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                placeholder="0061234567"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3.5 py-2 text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/80 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3.5 py-2 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/80 focus:outline-none transition-all"
              />
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
              <Captcha onVerify={setIsCaptchaValid} isValid={isCaptchaValid} />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-4 py-2.5 text-xs font-semibold shadow-sm shadow-emerald-500/20 transition-all active:scale-98"
            >
              Masuk Portal Kelulusan
            </button>
          </form>
        )}

        {/* DEMO QUICK ACCESS SELECTOR */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 text-center">
            Akses Cepat Demo:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleDemoQuickLogin('admin')}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
            >
              🔑 Login Admin Utama
            </button>
            <button
              type="button"
              onClick={() => handleDemoQuickLogin('operator')}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
            >
              📋 Login Operator
            </button>
            <button
              type="button"
              onClick={() => handleDemoQuickLogin('kepala_sekolah')}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
            >
              🎓 Login Kepsek
            </button>
            <button
              type="button"
              onClick={() => handleDemoQuickLogin('siswa')}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
            >
              👨‍🎓 Login Siswa Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
