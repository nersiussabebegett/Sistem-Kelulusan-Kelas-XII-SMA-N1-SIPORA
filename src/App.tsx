import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Award,
  FileText,
  ShieldCheck,
  Bell,
  BarChart2,
  UserCheck,
  Settings,
  Activity,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Moon,
  Sun,
  GraduationCap,
  Code2,
  Sparkles,
  ExternalLink,
  Search
} from 'lucide-react';

import {
  getSchoolInfo,
  saveSchoolInfo,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  bulkUpdateStatus,
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAccounts,
  saveAccounts,
  getAuditLogs,
  getActiveUser,
  setActiveUser,
  resetDataToDefault,
  saveStudents
} from './services/storage';

import { Student, SchoolInfo, Announcement, UserAccount, AuditLog } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { notify } from './services/toastService';

// Public Views
import { HomeView } from './views/HomeView';
import { ProfileView } from './views/ProfileView';
import { PengumumanView } from './views/PengumumanView';
import { CekKelulusanView } from './views/CekKelulusanView';
import { VerifikasiView } from './views/VerifikasiView';
import { KontakView } from './views/KontakView';
import { LoginView } from './views/LoginView';

// Admin Views
import { AdminDashboard } from './views/admin/AdminDashboard';
import { DataSiswaView } from './views/admin/DataSiswaView';
import { KelulusanView } from './views/admin/KelulusanView';
import { SklManagementView } from './views/admin/SklManagementView';
import { PengumumanAdminView } from './views/admin/PengumumanAdminView';
import { LaporanView } from './views/admin/LaporanView';
import { UserManagementView } from './views/admin/UserManagementView';
import { SettingsView } from './views/admin/SettingsView';
import { AuditLogView } from './views/admin/AuditLogView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [activeAdminTab, setActiveAdminTab] = useState<string>('dashboard');

  const [schoolInfo, setSchoolInfoState] = useState<SchoolInfo>(getSchoolInfo());
  const [students, setStudentsState] = useState<Student[]>(getStudents());
  const [announcements, setAnnouncementsState] = useState<Announcement[]>(getAnnouncements());
  const [accounts, setAccountsState] = useState<UserAccount[]>(getAccounts());
  const [auditLogs, setAuditLogsState] = useState<AuditLog[]>(getAuditLogs());
  const [currentUser, setCurrentUserState] = useState<UserAccount | null>(getActiveUser());

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState<boolean>(false);

  // Direct Search Params from Home
  const [directSearchNisn, setDirectSearchNisn] = useState('');
  const [directSearchDob, setDirectSearchDob] = useState('');

  const reloadData = () => {
    setSchoolInfoState(getSchoolInfo());
    setStudentsState(getStudents());
    setAnnouncementsState(getAnnouncements());
    setAccountsState(getAccounts());
    setAuditLogsState(getAuditLogs());
    setCurrentUserState(getActiveUser());
  };

  useEffect(() => {
    window.addEventListener('storage-updated', reloadData);
    return () => window.removeEventListener('storage-updated', reloadData);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLoginSuccess = (user: UserAccount) => {
    setActiveUser(user);
    setCurrentUserState(user);
  };

  const handleLogout = () => {
    setActiveUser(null);
    setCurrentUserState(null);
    setActiveTab('beranda');
  };

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'data-siswa', label: 'Data Siswa', icon: Users },
    { id: 'kelulusan', label: 'Kelulusan', icon: Award },
    { id: 'skl', label: 'SKL', icon: FileText },
    { id: 'verifikasi-admin', label: 'Verifikasi SKL', icon: ShieldCheck },
    { id: 'pengumuman-admin', label: 'Pengumuman', icon: Bell },
    { id: 'laporan', label: 'Laporan', icon: BarChart2 },
    { id: 'user-management', label: 'User Management', icon: UserCheck },
    { id: 'settings', label: 'Pengaturan Sekolah', icon: Settings },
    { id: 'audit-log', label: 'Audit Log', icon: Activity },
  ];

  const isAdminViewActive = activeTab === 'admin-dashboard';

  return (
    <div className={`min-h-screen font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors flex flex-col justify-between`}>
      {/* PUBLIC NAVBAR (Rendered when in public mode) */}
      {!isAdminViewActive && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          schoolInfo={schoolInfo}
          activeUser={currentUser}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      )}

      {/* ADMIN PANEL LAYOUT */}
      {isAdminViewActive ? (
        <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
          {/* Admin Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800/80 transform ${
              isAdminSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:relative md:translate-x-0 transition-transform flex flex-col justify-between`}
          >
            <div>
              {/* Sidebar Header */}
              <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold shadow-sm shadow-emerald-500/20">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xs text-white uppercase tracking-tight font-display">
                      {schoolInfo.name}
                    </h2>
                    <p className="text-[10px] text-emerald-400 font-medium">
                      Panel Management
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAdminSidebarOpen(false)}
                  className="md:hidden text-slate-400 hover:text-white p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Sidebar Navigation Tree */}
              <nav className="p-3 space-y-1">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeAdminTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveAdminTab(item.id);
                        setIsAdminSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Footer */}
            <div className="p-3 border-t border-slate-800/80 space-y-1.5">
              <button
                onClick={() => setActiveTab('beranda')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 p-2 text-xs font-medium text-slate-300 border border-slate-700/60 transition-all"
              >
                Lihat Halaman Publik
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 p-2 text-xs font-medium text-rose-300 border border-rose-800/50 transition-all"
              >
                <LogOut className="h-3.5 w-3.5 text-rose-400" /> Keluar (Logout)
              </button>
            </div>
          </aside>

          {/* Main Area */}
          <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
            {/* Topbar */}
            <header className="sticky top-0 z-30 bg-slate-900/80 border-b border-slate-800/80 px-6 py-3 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAdminSidebarOpen(!isAdminSidebarOpen)}
                  className="md:hidden p-1.5 text-slate-300 hover:bg-slate-800 rounded-lg border border-slate-700/60"
                >
                  <Menu className="h-5 w-5 text-emerald-400" />
                </button>
                <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                  Tahun Ajaran <strong className="text-white font-semibold">{schoolInfo.academicYear}</strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Toggle Dark Mode"
                >
                  {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-emerald-400" />}
                </button>

                <div className="flex items-center gap-2 text-xs">
                  <div className="text-right hidden sm:block">
                    <span className="block font-semibold text-white">{currentUser?.name || 'Staff SMAN 1 Sipora'}</span>
                    <span className="block text-[10px] text-emerald-400 capitalize">
                      Role: {currentUser?.role || 'admin'}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {currentUser?.name.charAt(0) || 'A'}
                  </div>
                </div>
              </div>
            </header>

            {/* Admin View Router Content */}
            <main className="p-6 overflow-y-auto">
              {activeAdminTab === 'dashboard' && (
                <AdminDashboard
                  students={students}
                  schoolInfo={schoolInfo}
                  auditLogs={auditLogs}
                  setActiveAdminTab={setActiveAdminTab}
                />
              )}

              {activeAdminTab === 'data-siswa' && (
                <DataSiswaView
                  students={students}
                  schoolInfo={schoolInfo}
                  onAddStudent={(std) => {
                    addStudent(std);
                    setStudentsState(getStudents());
                  }}
                  onUpdateStudent={(std) => {
                    updateStudent(std);
                    setStudentsState(getStudents());
                  }}
                  onDeleteStudent={(id) => {
                    deleteStudent(id);
                    setStudentsState(getStudents());
                  }}
                  onBulkImport={(newStds) => {
                    const merged = [...getStudents(), ...newStds];
                    saveStudents(merged);
                    setStudentsState(getStudents());
                    notify('add', 'Impor Massal Siswa Berhasil', `${newStds.length} data siswa baru berhasil diimpor dari Excel/CSV.`);
                  }}
                />
              )}

              {activeAdminTab === 'kelulusan' && (
                <KelulusanView
                  students={students}
                  schoolInfo={schoolInfo}
                  onBulkUpdateStatus={(ids, status) => {
                    bulkUpdateStatus(ids, status);
                    setStudentsState(getStudents());
                  }}
                  onUpdateStudent={(std) => {
                    updateStudent(std);
                    setStudentsState(getStudents());
                  }}
                />
              )}

              {activeAdminTab === 'skl' && (
                <SklManagementView students={students} schoolInfo={schoolInfo} />
              )}

              {activeAdminTab === 'verifikasi-admin' && (
                <VerifikasiView students={students} schoolInfo={schoolInfo} />
              )}

              {activeAdminTab === 'pengumuman-admin' && (
                <PengumumanAdminView
                  announcements={announcements}
                  onAddAnnouncement={(ann) => {
                    addAnnouncement(ann);
                    setAnnouncementsState(getAnnouncements());
                  }}
                  onUpdateAnnouncement={(ann) => {
                    updateAnnouncement(ann);
                    setAnnouncementsState(getAnnouncements());
                  }}
                  onDeleteAnnouncement={(id) => {
                    deleteAnnouncement(id);
                    setAnnouncementsState(getAnnouncements());
                  }}
                />
              )}

              {activeAdminTab === 'laporan' && (
                <LaporanView students={students} schoolInfo={schoolInfo} />
              )}

              {activeAdminTab === 'user-management' && (
                <UserManagementView
                  accounts={accounts}
                  onSaveAccounts={(accs) => {
                    saveAccounts(accs);
                    setAccountsState(getAccounts());
                  }}
                />
              )}

              {activeAdminTab === 'settings' && (
                <SettingsView
                  schoolInfo={schoolInfo}
                  onSaveSchoolInfo={(info) => {
                    saveSchoolInfo(info);
                    setSchoolInfoState(getSchoolInfo());
                  }}
                  onResetData={() => {
                    resetDataToDefault();
                    reloadData();
                  }}
                />
              )}

              {activeAdminTab === 'audit-log' && <AuditLogView auditLogs={auditLogs} />}
            </main>
          </div>
        </div>
      ) : (
        /* PUBLIC SITE ROUTER */
        <main className="flex-1">
          {activeTab === 'beranda' && (
            <HomeView
              schoolInfo={schoolInfo}
              students={students}
              announcements={announcements}
              setActiveTab={setActiveTab}
              onSearchDirect={(nisn, dob) => {
                setDirectSearchNisn(nisn);
                setDirectSearchDob(dob);
              }}
            />
          )}

          {activeTab === 'profil' && <ProfileView schoolInfo={schoolInfo} />}

          {activeTab === 'pengumuman' && <PengumumanView announcements={announcements} />}

          {activeTab === 'cek-kelulusan' && (
            <CekKelulusanView
              students={students}
              schoolInfo={schoolInfo}
              initialNisn={directSearchNisn}
              initialDob={directSearchDob}
            />
          )}

          {activeTab === 'verifikasi' && <VerifikasiView students={students} schoolInfo={schoolInfo} />}

          {activeTab === 'kontak' && <KontakView schoolInfo={schoolInfo} />}

          {activeTab === 'login' && (
            <LoginView
              accounts={accounts}
              students={students}
              onLoginSuccess={handleLoginSuccess}
              setActiveTab={setActiveTab}
            />
          )}
        </main>
      )}

      {/* PUBLIC FOOTER */}
      {!isAdminViewActive && <Footer schoolInfo={schoolInfo} setActiveTab={setActiveTab} />}

      {/* GLOBAL TOAST NOTIFICATIONS (BOTTOM-RIGHT) */}
      <ToastContainer />
    </div>
  );
}
