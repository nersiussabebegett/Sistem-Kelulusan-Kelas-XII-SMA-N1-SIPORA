import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Download,
  Copy,
  Check,
  FileCode,
  Layers,
  Cpu,
  BookOpen,
  CheckCircle2,
  Package,
  FileSpreadsheet,
  QrCode,
  FileCheck,
  Server,
  Zap,
  Shield,
  Laptop,
  FolderArchive,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Database,
  FileJson
} from 'lucide-react';
import { downloadFullReactProjectZip, downloadSqlFile } from '../../utils/exportBundle';

interface CodeFile {
  id: string;
  filename: string;
  language: string;
  category: 'config' | 'core' | 'pdf' | 'excel' | 'laravel';
  description: string;
  code: string;
}

export const FullSourceCodeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'install' | 'source' | 'pdf-export' | 'excel-export' | 'laravel'>('install');
  const [selectedFileId, setSelectedFileId] = useState<string>('package-json');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (text: string, type: 'code' | 'cmd', cmdName?: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else if (cmdName) {
      setCopiedCmd(cmdName);
      setTimeout(() => setCopiedCmd(null), 2000);
    }
  };

  const codeFiles: CodeFile[] = [
    {
      id: 'package-json',
      filename: 'package.json',
      language: 'json',
      category: 'config',
      description: 'Konfigurasi dependensi utama React 18, Vite, Tailwind v4, jsPDF, SheetJS & Lucide React',
      code: `{
  "name": "sistem-kelulusan-skl",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.450.0",
    "jspdf": "^2.5.2",
    "html2canvas": "^1.4.1",
    "xlsx": "^0.18.5",
    "qrcode.react": "^4.0.1",
    "canvas-confetti": "^1.9.4",
    "motion": "^11.11.0",
    "recharts": "^2.13.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "@types/node": "^22.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0",
    "vite": "^5.4.0"
  }
}`
    },
    {
      id: 'vite-config',
      filename: 'vite.config.ts',
      language: 'typescript',
      category: 'config',
      description: 'Konfigurasi Vite bundler dan Integrasi Plugin Tailwind CSS v4',
      code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});`
    },
    {
      id: 'types-ts',
      filename: 'src/types.ts',
      language: 'typescript',
      category: 'core',
      description: 'Definisi Antarmuka Data TypeScript (Siswa, Sekolah, Nilai, Pengumuman, Log)',
      code: `export type GraduationStatus = 'LULUS' | 'TIDAK_LULUS' | 'PENDING';
export type Gender = 'L' | 'P';
export type Major = 'MIPA' | 'IPS' | 'BAHASA' | 'KEJURUAN';

export interface GradeItem {
  id?: string;
  subjectName: string;
  score: number;
}

export interface Student {
  id: string;
  nisn: string;
  nis: string;
  name: string;
  pob: string; // Tempat Lahir
  dob: string; // Tanggal Lahir (YYYY-MM-DD)
  gender: Gender;
  address?: string;
  phone?: string;
  parentName?: string;
  class: string;
  major: Major;
  photoUrl?: string;
  status: GraduationStatus;
  skNumber: string;
  averageScore: number;
  grades?: GradeItem[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SchoolInfo {
  id: string;
  name: string;
  npsn: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  postalCode: string;
  email: string;
  phone: string;
  website?: string;
  logoUrl?: string;
  principalName: string;
  principalNip: string;
  principalPhotoUrl?: string;
  academicYear: string;
  skNumberPrefix: string;
  graduationDate: string;
  isAnnouncementOpen: boolean;
  announcementTime: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'PENTING' | 'INFORMASI' | 'ACARA';
  author: string;
  date: string;
  isPublished: boolean;
}

export interface UserAccount {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'kepala_sekolah' | 'siswa';
  studentNisn?: string;
  lastLogin?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ipAddress?: string;
}`
    },
    {
      id: 'storage-ts',
      filename: 'src/services/storage.ts',
      language: 'typescript',
      category: 'core',
      description: 'Layanan LocalStorage Persistence Engine dengan Sinkronisasi Realtime',
      code: `import { Student, SchoolInfo, Announcement, UserAccount, AuditLog } from '../types';

const STORAGE_KEYS = {
  SCHOOL: 'sk_school_info_v1',
  STUDENTS: 'sk_students_data_v1',
  ANNOUNCEMENTS: 'sk_announcements_v1',
  ACCOUNTS: 'sk_user_accounts_v1',
  AUDIT: 'sk_audit_logs_v1',
  ACTIVE_USER: 'sk_active_user_v1'
};

export const getSchoolInfo = (): SchoolInfo => {
  const data = localStorage.getItem(STORAGE_KEYS.SCHOOL);
  if (data) return JSON.parse(data);
  return {
    id: 'sch-01',
    name: 'SMAN 1 SIPORA UTARA',
    npsn: '10303212',
    address: 'Jl. Raya Tuapejat Km. 7, Sipora Utara',
    subdistrict: 'Sipora Utara',
    district: 'Kepulauan Mentawai',
    province: 'Sumatera Barat',
    postalCode: '25392',
    email: 'info@sman1siporautara.sch.id',
    phone: '(0759) 322101',
    principalName: 'Drs. H. Ahmad Dahlan, M.Pd.',
    principalNip: '19680512 199403 1 004',
    academicYear: '2025/2026',
    skNumberPrefix: '421.3/SKL-SMAN1/2026/',
    graduationDate: '2026-05-05',
    isAnnouncementOpen: true,
    announcementTime: '2026-05-05T15:00'
  };
};

export const saveSchoolInfo = (info: SchoolInfo) => {
  localStorage.setItem(STORAGE_KEYS.SCHOOL, JSON.stringify(info));
  window.dispatchEvent(new Event('storage-updated'));
};

export const getStudents = (): Student[] => {
  const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
  if (data) return JSON.parse(data);
  return [];
};

export const saveStudents = (students: Student[]) => {
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  window.dispatchEvent(new Event('storage-updated'));
};`
    },
    {
      id: 'pdf-generator',
      filename: 'src/utils/pdfGenerator.ts',
      language: 'typescript',
      category: 'pdf',
      description: 'Modul Cetak Surat Keterangan Lulus (SKL) Resmi ke PDF (jsPDF + html2canvas)',
      code: `import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Student, SchoolInfo } from '../types';

/**
 * Mengubah elemen HTML Surat SKL menjadi Dokumen PDF A4 Resmi
 */
export const generateSklPdf = async (elementId: string, studentName: string): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Elemen template SKL tidak ditemukan');
  }

  // Render HTML ke Canvas resolusi tinggi (scale 2 untuk hasil jernih)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const imgWidth = 210; // Lebar A4 dalam mm
  const pageHeight = 297; // Tinggi A4 dalam mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));
  
  // Download PDF
  const cleanName = studentName.replace(/[^a-zA-Z0-0]/g, '_');
  pdf.save(\`SKL_RESMI_\${cleanName}.pdf\`);
};`
    },
    {
      id: 'excel-handler',
      filename: 'src/utils/excelHandler.ts',
      language: 'typescript',
      category: 'excel',
      description: 'Modul Import/Export Data Siswa & Nilai dari Excel (.xlsx) menggunakan SheetJS',
      code: `import * as XLSX from 'xlsx';
import { Student } from '../types';

/**
 * Ekspor Data Siswa & Rekap Nilai ke File Excel (.xlsx)
 */
export const exportStudentsToExcel = (students: Student[], filename = 'Data_Siswa_SKL.xlsx') => {
  const excelData = students.map((s, idx) => ({
    No: idx + 1,
    NISN: s.nisn,
    NIS: s.nis,
    'Nama Siswa': s.name,
    Kelas: s.class,
    Jurusan: s.major,
    'Tempat Lahir': s.pob,
    'Tanggal Lahir': s.dob,
    Status: s.status,
    'Rata-Rata Nilai': s.averageScore,
    'No. SKL': s.skNumber
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Siswa & Kelulusan');
  
  XLSX.writeFile(workbook, filename);
};

/**
 * Import File Excel Siswa dan Parser JSON
 */
export const importStudentsFromExcel = (file: File): Promise<Partial<Student>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        resolve(jsonData as Partial<Student>[]);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};`
    },
    {
      id: 'main-app',
      filename: 'src/App.tsx',
      language: 'typescript',
      category: 'core',
      description: 'Entry App & Router Utama (Navigasi Publik, Panel Admin & Theme Toggle)',
      code: `import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { CekKelulusanView } from './views/CekKelulusanView';
import { AdminDashboard } from './views/admin/AdminDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">
        {activeTab === 'beranda' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'cek-kelulusan' && <CekKelulusanView />}
      </main>
      <Footer />
    </div>
  );
}`
    }
  ];

  const currentFile = codeFiles.find((f) => f.id === selectedFileId) || codeFiles[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 border-2 border-indigo-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-indigo-400" />
              Source Code & Panduan Instalasi Modern
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white font-display tracking-tight leading-tight">
              Full Source Code & Dokumentasi Setup
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
              Arsitektur aplikasi Sistem Informasi Cek Kelulusan Siswa & Cetak SKL Resmi berbasis <strong className="text-emerald-400">React 18</strong>, <strong className="text-sky-400">Vite</strong>, <strong className="text-indigo-400">Tailwind CSS v4</strong>, <strong className="text-amber-400">jsPDF</strong>, dan <strong className="text-rose-400">SheetJS</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => downloadFullReactProjectZip()}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
            >
              <Download className="w-4 h-4" />
              Download Full Source Code (.zip)
            </button>

            <button
              onClick={() => downloadSqlFile()}
              className="px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-500/20 flex items-center gap-2 transition"
            >
              <Database className="w-4 h-4" />
              Download Database MySQL (.sql)
            </button>

            <button
              onClick={() => handleCopy('npm install && npm run dev', 'cmd', 'quick-start')}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-700 flex items-center gap-2 transition"
            >
              {copiedCmd === 'quick-start' ? <Check className="w-4 h-4 text-emerald-300" /> : <Terminal className="w-4 h-4" />}
              {copiedCmd === 'quick-start' ? 'Tersalin!' : 'Quick Command'}
            </button>
          </div>
        </div>
      </div>

      {/* Tech Stack Pills Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center space-y-1 hover:border-sky-500/50 transition">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-black text-lg">
            ⚛️
          </div>
          <span className="font-extrabold text-xs text-white uppercase tracking-tight">React 18</span>
          <span className="text-[10px] text-slate-400 font-medium">TypeScript + Hooks</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center space-y-1 hover:border-amber-500/50 transition">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-black text-lg">
            ⚡
          </div>
          <span className="font-extrabold text-xs text-white uppercase tracking-tight">Vite Bundler</span>
          <span className="text-[10px] text-slate-400 font-medium">Instant HMR</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center space-y-1 hover:border-indigo-500/50 transition">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-lg">
            🎨
          </div>
          <span className="font-extrabold text-xs text-white uppercase tracking-tight">Tailwind v4</span>
          <span className="text-[10px] text-slate-400 font-medium">Utility-First Engine</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center space-y-1 hover:border-emerald-500/50 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-lg">
            📄
          </div>
          <span className="font-extrabold text-xs text-white uppercase tracking-tight">jsPDF + Canvas</span>
          <span className="text-[10px] text-slate-400 font-medium">Export SKL ke PDF</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center space-y-1 hover:border-rose-500/50 transition">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-black text-lg">
            📊
          </div>
          <span className="font-extrabold text-xs text-white uppercase tracking-tight">SheetJS (xlsx)</span>
          <span className="text-[10px] text-slate-400 font-medium">Import/Export Excel</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center space-y-1 hover:border-purple-500/50 transition">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-black text-lg">
            📲
          </div>
          <span className="font-extrabold text-xs text-white uppercase tracking-tight">QRCode React</span>
          <span className="text-[10px] text-slate-400 font-medium">Validasi Keabsahan</span>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex border-b-2 border-slate-800 overflow-x-auto gap-2 pb-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('install')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition whitespace-nowrap ${
            activeTab === 'install'
              ? 'bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          1. Panduan Instalasi Lengkap (Step-by-Step)
        </button>

        <button
          onClick={() => setActiveTab('source')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition whitespace-nowrap ${
            activeTab === 'source'
              ? 'bg-indigo-500 text-white border-2 border-slate-900 shadow-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Code2 className="w-4 h-4" />
          2. Full Source Code React Frontend
        </button>

        <button
          onClick={() => setActiveTab('pdf-export')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition whitespace-nowrap ${
            activeTab === 'pdf-export'
              ? 'bg-amber-500 text-slate-950 border-2 border-slate-900 shadow-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          3. Modul Cetak PDF (jsPDF + html2canvas)
        </button>

        <button
          onClick={() => setActiveTab('excel-export')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition whitespace-nowrap ${
            activeTab === 'excel-export'
              ? 'bg-emerald-600 text-white border-2 border-slate-900 shadow-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          4. Modul Excel (SheetJS)
        </button>

        <button
          onClick={() => setActiveTab('laravel')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition whitespace-nowrap ${
            activeTab === 'laravel'
              ? 'bg-rose-600 text-white border-2 border-slate-900 shadow-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Server className="w-4 h-4" />
          5. Integration Laravel & MySQL
        </button>
      </div>

      {/* TAB 1: PANDUAN INSTALASI LENGKAP STEP-BY-STEP */}
      {activeTab === 'install' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Tahap Instalasi Aplikasi dari Nol ke Komputer Lokal
                </h2>
                <p className="text-slate-400 text-xs font-medium">
                  Ikuti urutan langkah di bawah ini untuk menjalankan aplikasi di lingkungan pengembangan Anda.
                </p>
              </div>
            </div>

            {/* Quick Download Package Card */}
            <div className="p-5 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-sky-950/60 rounded-2xl border-2 border-emerald-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                    <Sparkles className="w-3 h-3 text-emerald-400" /> Package Siap Pakai
                  </span>
                  <h3 className="font-extrabold text-base text-white">Unduh Kode Sumber & Database Sistem</h3>
                  <p className="text-xs text-slate-300">
                    Unduh file arsip <strong>.zip</strong> berisi full source code React 18 & file script <strong>.sql</strong> untuk database MySQL phpMyAdmin.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    onClick={() => downloadFullReactProjectZip()}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 shadow-md transition"
                  >
                    <FolderArchive className="w-4 h-4" /> Download .ZIP React 18
                  </button>
                  <button
                    onClick={() => downloadSqlFile()}
                    className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-2 shadow-md transition"
                  >
                    <Database className="w-4 h-4" /> Download .SQL Database
                  </button>
                </div>
              </div>
            </div>

            {/* Step 1 */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-extrabold text-sm text-white">Langkah 1: Persiapan Environment Perangkat</h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
                  Prerequisites
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Pastikan komputer Anda sudah terinstall:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 font-mono">
                <li>Node.js v18.0.0 atau lebih baru (Rekomendasi: LTS v20.x / v22.x)</li>
                <li>Git Bash / Terminal Command Prompt</li>
                <li>npm (bawaan Node.js) atau Bun / pnpm</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-indigo-400 text-slate-950 font-black text-xs flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-extrabold text-sm text-white">Langkah 2: Extrak / Clone Project ke Directory Anda</h3>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Buka terminal/Git Bash dan masuk ke folder project Anda:
              </p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 flex items-center justify-between">
                <code>cd ~/Documents/sistem-kelulusan-skl</code>
                <button
                  onClick={() => handleCopy('cd ~/Documents/sistem-kelulusan-skl', 'cmd', 'step2')}
                  className="text-slate-400 hover:text-white text-[10px]"
                >
                  {copiedCmd === 'step2' ? 'Tersalin!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-extrabold text-sm text-white">
                    Langkah 3: Install Seluruh Package Dependensi (React, Vite, Tailwind v4, jsPDF, SheetJS)
                  </h3>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Jalankan perintah penginstallan package:
              </p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 flex items-center justify-between">
                <code>npm install</code>
                <button
                  onClick={() => handleCopy('npm install', 'cmd', 'step3')}
                  className="text-slate-400 hover:text-white text-[10px]"
                >
                  {copiedCmd === 'step3' ? 'Tersalin!' : 'Copy'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Ini akan mengunduh dependensi lengkap termasuk <code className="text-sky-300">jspdf</code>, <code className="text-sky-300">html2canvas</code>, <code className="text-sky-300">xlsx</code>, <code className="text-sky-300">qrcode.react</code>, dan <code className="text-sky-300">lucide-react</code>.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-sky-400 text-slate-950 font-black text-xs flex items-center justify-center">
                    4
                  </span>
                  <h3 className="font-extrabold text-sm text-white">Langkah 4: Jalankan Development Server</h3>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Jalankan dev server dengan perintah berikut:
              </p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 flex items-center justify-between">
                <code>npm run dev</code>
                <button
                  onClick={() => handleCopy('npm run dev', 'cmd', 'step4')}
                  className="text-slate-400 hover:text-white text-[10px]"
                >
                  {copiedCmd === 'step4' ? 'Tersalin!' : 'Copy'}
                </button>
              </div>
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Buka browser di URL: <strong>http://localhost:3000</strong></span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-rose-400 text-slate-950 font-black text-xs flex items-center justify-center">
                    5
                  </span>
                  <h3 className="font-extrabold text-sm text-white">Langkah 5: Build Production untuk Hosting</h3>
                </div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Ketika siap di-deploy ke server live (Vercel, Netlify, cPanel):
              </p>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 flex items-center justify-between">
                <code>npm run build</code>
                <button
                  onClick={() => handleCopy('npm run build', 'cmd', 'step5')}
                  className="text-slate-400 hover:text-white text-[10px]"
                >
                  {copiedCmd === 'step5' ? 'Tersalin!' : 'Copy'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Hasil build akan tersimpan di folder <code className="text-emerald-300">/dist</code> berupa file HTML, JS, dan CSS terkompresi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FULL SOURCE CODE REACT FRONTEND */}
      {activeTab === 'source' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* File Selector List */}
          <div className="md:col-span-1 bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 space-y-2 h-fit">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3">
              Struktur File Source Code
            </span>
            <div className="space-y-1">
              {codeFiles.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFileId(f.id)}
                  className={`w-full text-left p-3 rounded-xl transition flex flex-col gap-1 ${
                    selectedFileId === f.id
                      ? 'bg-indigo-600 text-white font-bold border-2 border-indigo-400 shadow-md'
                      : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 shrink-0 text-indigo-300" />
                    <span className="font-mono text-xs font-bold truncate">{f.filename}</span>
                  </div>
                  <span className="text-[10px] opacity-80 truncate">{f.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="md:col-span-3 bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white font-mono flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-indigo-400" />
                  {currentFile.filename}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{currentFile.description}</p>
              </div>

              <button
                onClick={() => handleCopy(currentFile.code, 'code')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? 'Tersalin!' : 'Salin Kode'}
              </button>
            </div>

            <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto max-h-[550px] leading-relaxed">
              <code>{currentFile.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: MODUL CETAK PDF (jsPDF + html2canvas) */}
      {activeTab === 'pdf-export' && (
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Modul Cetak Surat Keterangan Lulus (SKL) Resmi ke PDF
                </h2>
                <p className="text-slate-400 text-xs font-medium">
                  Menggunakan kombinasi <strong>jsPDF</strong> dan <strong>html2canvas</strong> untuk merender template HTML KOP Sekolah + QR Code menjadi Dokumen PDF A4 Beresolusi Tinggi.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCopy(codeFiles.find(f => f.id === 'pdf-generator')?.code || '', 'code')}
              className="px-4 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-md hover:bg-amber-400 transition"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedCode ? 'Tersalin!' : 'Salin Source PDF Generator'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">Fitur 1</span>
              <h4 className="font-extrabold text-white">Rendering Canvas Presisi A4</h4>
              <p className="text-slate-400 leading-relaxed">
                Skala canvas di-set ke <code className="text-amber-300 font-mono">scale: 2</code> agar cetakan teks, stempel digital, dan QR Code tidak buram saat diprint di kertas A4.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">Fitur 2</span>
              <h4 className="font-extrabold text-white">Watermark Anti-Pemalsuan</h4>
              <p className="text-slate-400 leading-relaxed">
                Menyisipkan logo transparan di latar belakang dokumen serta QR Code dinamis yang terhubung ke URL verifikasi keabsahan.
              </p>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">Fitur 3</span>
              <h4 className="font-extrabold text-white">Tabel Rekapitulasi Nilai</h4>
              <p className="text-slate-400 leading-relaxed">
                Otomatis menampilkan daftar mata pelajaran MIPA/IPS beserta nilai rata-rata ujian sekolah dan status LULUS.
              </p>
            </div>
          </div>

          <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-amber-200/90 overflow-x-auto max-h-[400px]">
            <code>{codeFiles.find(f => f.id === 'pdf-generator')?.code}</code>
          </pre>
        </div>
      )}

      {/* TAB 4: MODUL EXCEL (SheetJS / xlsx) */}
      {activeTab === 'excel-export' && (
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">
                  Modul Import & Export Excel (.xlsx) dengan SheetJS
                </h2>
                <p className="text-slate-400 text-xs font-medium">
                  Memungkinkan staff/admin mengunduh rekapitulasi data siswa & nilai ke file Excel atau meng-upload file Excel massal dari Dapodik.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleCopy(codeFiles.find(f => f.id === 'excel-handler')?.code || '', 'code')}
              className="px-4 py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-md hover:bg-emerald-400 transition"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedCode ? 'Tersalin!' : 'Salin Source Excel Module'}
            </button>
          </div>

          <pre className="bg-slate-950 p-5 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto max-h-[400px]">
            <code>{codeFiles.find(f => f.id === 'excel-handler')?.code}</code>
          </pre>
        </div>
      )}

      {/* TAB 5: BACKEND LARAVEL & MYSQL INTEGRATION */}
      {activeTab === 'laravel' && (
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Integrasi Backend Fullstack Laravel & Database MySQL (XAMPP)
              </h2>
              <p className="text-slate-400 text-xs font-medium">
                Jika Anda bermaksud menyambungkan frontend React ini dengan database MySQL di server XAMPP / Hosting PHP Laravel.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-rose-400" />
              Perintah Cepat Setup Laravel & Database
            </h3>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-slate-200">
                <code>php artisan migrate:fresh --seed</code>
                <button
                  onClick={() => handleCopy('php artisan migrate:fresh --seed', 'cmd', 'lar1')}
                  className="text-slate-400 hover:text-white text-[10px]"
                >
                  {copiedCmd === 'lar1' ? 'Tersalin!' : 'Copy'}
                </button>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-slate-200">
                <code>php artisan serve</code>
                <button
                  onClick={() => handleCopy('php artisan serve', 'cmd', 'lar2')}
                  className="text-slate-400 hover:text-white text-[10px]"
                >
                  {copiedCmd === 'lar2' ? 'Tersalin!' : 'Copy'}
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Anda juga dapat mengakses menu <strong className="text-rose-400">Source Laravel & MySQL</strong> di sidebar Admin untuk mengunduh dump database SQL utuh (<code className="text-emerald-300">db_kelulusan_skl.sql</code>).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
