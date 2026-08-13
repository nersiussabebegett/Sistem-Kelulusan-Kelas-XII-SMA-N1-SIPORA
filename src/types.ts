export type Role = 'admin' | 'operator' | 'kepala_sekolah' | 'siswa';

export type StatusKelulusan = 'LULUS' | 'TIDAK_LULUS' | 'PENDING';

export type Major = 'MIPA' | 'IPS';

export interface Student {
  id: string;
  nisn: string;
  nis: string;
  name: string;
  pob: string; // Tempat Lahir
  dob: string; // Tanggal Lahir (YYYY-MM-DD)
  gender: 'L' | 'P';
  address: string;
  phone: string;
  parentName: string;
  class: string; // e.g. "XII MIPA 1"
  major: Major;
  photoUrl?: string;
  status: StatusKelulusan;
  skNumber: string;
  averageScore: number;
  notes?: string;
  grades: {
    'Pendidikan Agama': number;
    'PPKn': number;
    'Bahasa Indonesia': number;
    'Matematika': number;
    'Sejarah Indonesia': number;
    'Bahasa Inggris': number;
    'Seni Budaya': number;
    'PJOK': number;
    'Prakarya & Kewirausahaan': number;
    'Peminatan MIPA/IPS': number;
  };
}

export interface SchoolInfo {
  name: string;
  npsn: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  email: string;
  phone: string;
  website: string;
  logoUrl: string;
  schoolPhotoUrl?: string;
  principalName: string;
  principalNip: string;
  principalPhotoUrl: string;
  academicYear: string;
  skNumberPrefix: string;
  graduationDate: string;
  isAnnouncementOpen: boolean;
  announcementTime: string; // ISO String
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Jadwal' | 'SKL' | 'Ijazah' | 'Daftar Ulang' | 'Umum';
  date: string;
  author: string;
  content: string;
  isImportant?: boolean;
}

export interface UserAccount {
  id: string;
  username: string;
  name: string;
  role: Role;
  email: string;
  studentNisn?: string;
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: Role;
  action: string;
  details: string;
}

export interface SystemSettings {
  schoolInfo: SchoolInfo;
  availableAcademicYears: string[];
}
