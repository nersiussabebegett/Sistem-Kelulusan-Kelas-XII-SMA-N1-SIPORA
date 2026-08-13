import React, { useState } from 'react';
import {
  GraduationCap,
  Home,
  Building2,
  Bell,
  Search,
  ShieldCheck,
  PhoneCall,
  Menu,
  X,
  Lock,
  Moon,
  Sun,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { SchoolInfo, UserAccount } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  schoolInfo: SchoolInfo;
  activeUser: UserAccount | null;
  onLogout: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  schoolInfo,
  activeUser,
  onLogout,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'profil', label: 'Profil Sekolah', icon: Building2 },
    { id: 'pengumuman', label: 'Pengumuman', icon: Bell },
    { id: 'cek-kelulusan', label: 'Cek Kelulusan', icon: Search, highlight: true },
    { id: 'verifikasi', label: 'Verifikasi SKL', icon: ShieldCheck },
    { id: 'kontak', label: 'Kontak', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 font-sans transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 py-3 max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & School Title */}
          <div
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none font-display">
                  {schoolInfo.name}
                </h1>
                <span className="hidden sm:inline-block rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-2 py-0.5 text-[10px] font-semibold">
                  TA {schoolInfo.academicYear}
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-normal mt-0.5">
                Sistem Pengumuman Kelulusan
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              if (item.id === 'cek-kelulusan') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="ml-2 flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-4 py-2 text-xs font-semibold shadow-sm shadow-emerald-500/20 transition-all active:scale-95"
                  >
                    <Search className="h-3.5 w-3.5" />
                    Cek Kelulusan
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-emerald-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>

            {activeUser ? (
              <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 p-1 pl-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  {activeUser.name}
                </span>
                <button
                  onClick={() => setActiveTab('admin-dashboard')}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 px-3 py-1.5 text-white dark:text-slate-950 font-semibold transition text-xs"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3.5 py-2 text-xs font-semibold border border-slate-200/80 dark:border-slate-700/80 transition-all"
              >
                <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Portal Staff
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-xl p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5 text-rose-500" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1.5 pb-2 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              if (item.id === 'cek-kelulusan') {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 px-4 py-2.5 text-xs font-semibold shadow-sm my-1"
                  >
                    <Search className="h-4 w-4" />
                    Cek Kelulusan Siswa
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-500" />}
                <span>{isDarkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
              </button>

              {activeUser ? (
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  Dashboard Staff →
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('login')}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                >
                  Login Staff →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
