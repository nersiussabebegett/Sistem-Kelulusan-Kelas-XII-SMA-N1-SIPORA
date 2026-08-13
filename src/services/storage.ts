import { SchoolInfo, Student, Announcement, UserAccount, AuditLog } from '../types';
import { initialSchoolInfo, initialStudents, initialAnnouncements, initialAccounts, initialAuditLogs } from '../data/initialData';
import { notify } from './toastService';

const KEYS = {
  SCHOOL: 'sman1_school_info',
  STUDENTS: 'sman1_students',
  ANNOUNCEMENTS: 'sman1_announcements',
  ACCOUNTS: 'sman1_accounts',
  AUDIT_LOGS: 'sman1_audit_logs',
  THEME: 'sman1_theme',
  ACTIVE_USER: 'sman1_active_user',
};

// Initialize default storage if empty
export function initStorage() {
  if (!localStorage.getItem(KEYS.SCHOOL)) {
    localStorage.setItem(KEYS.SCHOOL, JSON.stringify(initialSchoolInfo));
  }
  if (!localStorage.getItem(KEYS.STUDENTS)) {
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(initialStudents));
  }
  if (!localStorage.getItem(KEYS.ANNOUNCEMENTS)) {
    localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(initialAnnouncements));
  }
  if (!localStorage.getItem(KEYS.ACCOUNTS)) {
    localStorage.setItem(KEYS.ACCOUNTS, JSON.stringify(initialAccounts));
  }
  if (!localStorage.getItem(KEYS.AUDIT_LOGS)) {
    localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(initialAuditLogs));
  }
}

// School Info
export function getSchoolInfo(): SchoolInfo {
  initStorage();
  const data = localStorage.getItem(KEYS.SCHOOL);
  if (data) {
    const parsed = JSON.parse(data);
    if (parsed.logoUrl && parsed.logoUrl.includes('unsplash.com')) {
      parsed.logoUrl = '';
      localStorage.setItem(KEYS.SCHOOL, JSON.stringify(parsed));
    }
    return parsed;
  }
  return initialSchoolInfo;
}

export function saveSchoolInfo(info: SchoolInfo): void {
  localStorage.setItem(KEYS.SCHOOL, JSON.stringify(info));
  addAuditLog('admin', 'UPDATE_SEKOLAH', 'Memperbarui data dan pengaturan profil sekolah');
  notify('edit', 'Pengaturan Sekolah Disimpan', 'Profil sekolah, Kepala Sekolah, & jadwal rilis berhasil diperbarui.');
  window.dispatchEvent(new Event('storage-updated'));
}

// Students
export function getStudents(): Student[] {
  initStorage();
  const data = localStorage.getItem(KEYS.STUDENTS);
  return data ? JSON.parse(data) : initialStudents;
}

export function saveStudents(students: Student[]): void {
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(students));
  window.dispatchEvent(new Event('storage-updated'));
}

export function addStudent(student: Omit<Student, 'id'>): Student {
  const students = getStudents();
  const newId = `std-${Date.now().toString().slice(-4)}`;
  const newStudent: Student = { ...student, id: newId };
  students.push(newStudent);
  saveStudents(students);
  addAuditLog('operator', 'TAMBAH_SISWA', `Menambahkan data siswa baru: ${newStudent.name} (${newStudent.nisn})`);
  notify('add', 'Data Siswa Baru Ditambahkan', `Siswa ${newStudent.name} (NISN: ${newStudent.nisn}) berhasil disimpan ke database.`);
  return newStudent;
}

export function updateStudent(student: Student): void {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === student.id);
  if (index !== -1) {
    students[index] = student;
    saveStudents(students);
    addAuditLog('operator', 'EDIT_SISWA', `Memperbarui data siswa: ${student.name} (${student.nisn})`);
    notify('edit', 'Data Siswa Diubah', `Informasi siswa ${student.name} (NISN: ${student.nisn}) telah diperbarui.`);
  }
}

export function deleteStudent(id: string): void {
  let students = getStudents();
  const target = students.find((s) => s.id === id);
  students = students.filter((s) => s.id !== id);
  saveStudents(students);
  if (target) {
    addAuditLog('operator', 'HAPUS_SISWA', `Menghapus siswa: ${target.name} (${target.nisn})`);
    notify('delete', 'Data Siswa Dihapus', `Siswa ${target.name} (NISN: ${target.nisn}) telah dihapus permanen dari sistem.`);
  } else {
    notify('delete', 'Data Siswa Dihapus', `Data siswa dengan ID ${id} telah dihapus dari sistem.`);
  }
}

export function bulkUpdateStatus(studentIds: string[], status: 'LULUS' | 'TIDAK_LULUS'): void {
  const students = getStudents();
  const school = getSchoolInfo();
  let count = 0;

  students.forEach((s, idx) => {
    if (studentIds.includes(s.id)) {
      s.status = status;
      if (status === 'LULUS' && (!s.skNumber || s.skNumber === '-')) {
        s.skNumber = `${school.skNumberPrefix}${school.academicYear.split('/')[0]}/${String(idx + 1).padStart(3, '0')}`;
      } else if (status === 'TIDAK_LULUS') {
        s.skNumber = '-';
      }
      count++;
    }
  });

  saveStudents(students);
  addAuditLog('operator', 'BULK_UPDATE_KELULUSAN', `Memperbarui status kelulusan untuk ${count} siswa menjadi ${status}`);
  notify('edit', 'Status Kelulusan Diperbarui', `Status kelulusan ${count} siswa berhasil diubah menjadi "${status}".`);
}

// Announcements
export function getAnnouncements(): Announcement[] {
  initStorage();
  const data = localStorage.getItem(KEYS.ANNOUNCEMENTS);
  return data ? JSON.parse(data) : initialAnnouncements;
}

export function saveAnnouncements(announcements: Announcement[]): void {
  localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  window.dispatchEvent(new Event('storage-updated'));
}

export function addAnnouncement(ann: Omit<Announcement, 'id'>): Announcement {
  const list = getAnnouncements();
  const newAnn: Announcement = { ...ann, id: `ann-${Date.now().toString().slice(-4)}` };
  list.unshift(newAnn);
  saveAnnouncements(list);
  addAuditLog('operator', 'TAMBAH_PENGUMUMAN', `Menambahkan pengumuman baru: ${newAnn.title}`);
  notify('add', 'Pengumuman Baru Diterbitkan', `Pengumuman "${newAnn.title}" berhasil ditambahkan ke portal.`);
  return newAnn;
}

export function updateAnnouncement(ann: Announcement): void {
  const list = getAnnouncements();
  const index = list.findIndex((a) => a.id === ann.id);
  if (index !== -1) {
    list[index] = ann;
    saveAnnouncements(list);
    addAuditLog('operator', 'EDIT_PENGUMUMAN', `Memperbarui pengumuman: ${ann.title}`);
    notify('edit', 'Pengumuman Diubah', `Pengumuman "${ann.title}" berhasil diperbarui.`);
  }
}

export function deleteAnnouncement(id: string): void {
  let list = getAnnouncements();
  const target = list.find((a) => a.id === id);
  list = list.filter((a) => a.id !== id);
  saveAnnouncements(list);
  if (target) {
    addAuditLog('operator', 'HAPUS_PENGUMUMAN', `Menghapus pengumuman: ${target.title}`);
    notify('delete', 'Pengumuman Dihapus', `Pengumuman "${target.title}" telah dihapus secara permanen.`);
  } else {
    notify('delete', 'Pengumuman Dihapus', `Pengumuman telah dihapus dari sistem.`);
  }
}

// Accounts & Users
export function getAccounts(): UserAccount[] {
  initStorage();
  const data = localStorage.getItem(KEYS.ACCOUNTS);
  return data ? JSON.parse(data) : initialAccounts;
}

export function saveAccounts(accounts: UserAccount[]): void {
  localStorage.setItem(KEYS.ACCOUNTS, JSON.stringify(accounts));
  notify('edit', 'Manajemen User Diperbarui', 'Daftar akun pengguna dan hak akses staff berhasil disimpan.');
  window.dispatchEvent(new Event('storage-updated'));
}

// Audit Logs
export function getAuditLogs(): AuditLog[] {
  initStorage();
  const data = localStorage.getItem(KEYS.AUDIT_LOGS);
  return data ? JSON.parse(data) : initialAuditLogs;
}

export function addAuditLog(user: string, action: string, details: string): void {
  const logs = getAuditLogs();
  const now = new Date();
  const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const newLog: AuditLog = {
    id: `log-${Date.now()}`,
    timestamp: formatted,
    user,
    role: 'admin',
    action,
    details,
  };
  logs.unshift(newLog);
  localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 100))); // keep last 100
  window.dispatchEvent(new Event('storage-updated'));
}

// Active User session
export function getActiveUser(): UserAccount | null {
  const data = localStorage.getItem(KEYS.ACTIVE_USER);
  return data ? JSON.parse(data) : null;
}

export function setActiveUser(user: UserAccount | null): void {
  if (user) {
    localStorage.setItem(KEYS.ACTIVE_USER, JSON.stringify(user));
    notify('info', 'Login Berhasil', `Selamat datang kembali, ${user.name} (${user.role.toUpperCase()}).`);
  } else {
    localStorage.removeItem(KEYS.ACTIVE_USER);
    notify('info', 'Logout Sistem', 'Sesi pengguna telah diakhiri secara aman.');
  }
  window.dispatchEvent(new Event('storage-updated'));
}

// Reset data to factory defaults
export function resetDataToDefault(): void {
  localStorage.setItem(KEYS.SCHOOL, JSON.stringify(initialSchoolInfo));
  localStorage.setItem(KEYS.STUDENTS, JSON.stringify(initialStudents));
  localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(initialAnnouncements));
  localStorage.setItem(KEYS.ACCOUNTS, JSON.stringify(initialAccounts));
  localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(initialAuditLogs));
  notify('warning', 'Sistem Direset ke Default', 'Seluruh data siswa, pengumuman, dan akun telah dikembalikan ke kondisi awal.');
  window.dispatchEvent(new Event('storage-updated'));
}
