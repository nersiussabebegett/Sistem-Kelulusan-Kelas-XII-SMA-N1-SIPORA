import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  FileSpreadsheet,
  Download,
  Upload,
  CheckCircle2,
  XCircle,
  FileText
} from 'lucide-react';
import { Student, SchoolInfo } from '../../types';
import { StudentModal } from '../../components/StudentModal';
import { SklPrintModal } from '../../components/SklPrintModal';

interface DataSiswaViewProps {
  students: Student[];
  schoolInfo: SchoolInfo;
  onAddStudent: (data: any) => void;
  onUpdateStudent: (data: Student) => void;
  onDeleteStudent: (id: string) => void;
  onBulkImport: (studentsData: any[]) => void;
}

export const DataSiswaView: React.FC<DataSiswaViewProps> = ({
  students,
  schoolInfo,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onBulkImport,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('Semua');
  const [filterMajor, setFilterMajor] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);

  // SKL Preview
  const [selectedStudentForSkl, setSelectedStudentForSkl] = useState<Student | null>(null);

  // Import Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const classesList = ['Semua', 'XII MIPA 1', 'XII MIPA 2', 'XII IPS 1', 'XII IPS 2'];

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nisn.includes(searchTerm) ||
      s.nis.includes(searchTerm);
    const matchesClass = filterClass === 'Semua' || s.class === filterClass;
    const matchesMajor = filterMajor === 'Semua' || s.major === filterMajor;
    const matchesStatus = filterStatus === 'Semua' || s.status === filterStatus;
    return matchesSearch && matchesClass && matchesMajor && matchesStatus;
  });

  const handleExportExcel = () => {
    const exportData = filteredStudents.map((s, index) => ({
      No: index + 1,
      NISN: s.nisn,
      NIS: s.nis,
      'Nama Lengkap': s.name,
      'Tempat Lahir': s.pob,
      'Tanggal Lahir': s.dob,
      'Jenis Kelamin': s.gender,
      Kelas: s.class,
      Jurusan: s.major,
      'Orang Tua': s.parentName,
      'Status Kelulusan': s.status,
      'No. SK Kelulusan': s.skNumber,
      'Rata-Rata Nilai': s.averageScore,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Siswa');
    XLSX.writeFile(workbook, `Data_Siswa_SMAN1_Sipora_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      {
        NISN: '0069998881',
        NIS: '23201',
        NamaLengkap: 'Siswa Contoh Excel',
        TempatLahir: 'Tuapejat',
        TanggalLahir: '2007-05-12',
        JenisKelamin: 'L',
        Kelas: 'XII MIPA 1',
        Jurusan: 'MIPA',
        NamaOrangTua: 'Orang Tua Contoh',
        StatusKelulusan: 'LULUS',
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template Siswa');
    XLSX.writeFile(workbook, 'Template_Import_Siswa_SMAN1_Sipora.xlsx');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];
        const data: any[] = XLSX.utils.sheet_to_json(ws);

        if (data.length === 0) {
          alert('File Excel kosong!');
          return;
        }

        const newStudents = data.map((row, idx) => ({
          nisn: String(row.NISN || `006${Math.floor(1000000 + Math.random() * 9000000)}`),
          nis: String(row.NIS || `23${Math.floor(100 + Math.random() * 900)}`),
          name: String(row.NamaLengkap || row.Nama || 'Siswa Tanpa Nama'),
          pob: String(row.TempatLahir || 'Tuapejat'),
          dob: String(row.TanggalLahir || '2007-01-01'),
          gender: row.JenisKelamin === 'P' ? 'P' : 'L',
          address: 'Sidoamakmur, Sipora Utara',
          phone: '081267890000',
          parentName: String(row.NamaOrangTua || 'Orang Tua'),
          class: String(row.Kelas || 'XII MIPA 1'),
          major: String(row.Kelas || '').includes('IPS') ? 'IPS' : 'MIPA',
          status: row.StatusKelulusan === 'TIDAK_LULUS' ? 'TIDAK_LULUS' : 'LULUS',
          skNumber: `${schoolInfo.skNumberPrefix}2026/${String(idx + 100).padStart(3, '0')}`,
          averageScore: 86.0,
          grades: {
            'Pendidikan Agama': 85,
            'PPKn': 85,
            'Bahasa Indonesia': 88,
            'Matematika': 85,
            'Sejarah Indonesia': 85,
            'Bahasa Inggris': 86,
            'Seni Budaya': 87,
            'PJOK': 88,
            'Prakarya & Kewirausahaan': 86,
            'Peminatan MIPA/IPS': 87,
          },
        }));

        onBulkImport(newStudents);
        setIsImportModalOpen(false);
        alert(`Berhasil mengimpor ${newStudents.length} data siswa dari Excel!`);
      } catch (err) {
        console.error(err);
        alert('Gagal membaca file Excel. Pastikan format sesuai template.');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans text-slate-800 dark:text-slate-100">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Modul Kelola Data Siswa Kelas XII
          </h2>
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-0.5">
            Total siswa terdaftar: <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{students.length}</strong> orang
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setStudentToEdit(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold px-4 py-2.5 text-xs transition-all shadow-sm shadow-emerald-500/20"
          >
            <Plus className="h-4 w-4" /> Tambah Siswa
          </button>

          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium px-3.5 py-2.5 text-xs border border-slate-200 dark:border-slate-700 transition"
          >
            <Upload className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Import Excel
          </button>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-3.5 py-2.5 text-xs border border-slate-700 transition"
          >
            <Download className="h-4 w-4 text-emerald-400" /> Export Excel
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari Nama / NISN / NIS..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 pl-9 pr-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
          />
        </div>

        <select
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
        >
          {classesList.map((c) => (
            <option key={c} value={c}>
              Kelas: {c}
            </option>
          ))}
        </select>

        <select
          value={filterMajor}
          onChange={(e) => setFilterMajor(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
        >
          <option value="Semua">Jurusan: Semua</option>
          <option value="MIPA">Jurusan: MIPA</option>
          <option value="IPS">Jurusan: IPS</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
        >
          <option value="Semua">Status: Semua</option>
          <option value="LULUS">Status: LULUS</option>
          <option value="TIDAK_LULUS">Status: BELUM LULUS</option>
        </select>
      </div>

      {/* Student Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs font-sans border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="py-3.5 px-4">No</th>
              <th className="py-3.5 px-4">NISN / NIS</th>
              <th className="py-3.5 px-4">Nama Lengkap</th>
              <th className="py-3.5 px-4">TTL / L/P</th>
              <th className="py-3.5 px-4">Kelas / Jurusan</th>
              <th className="py-3.5 px-4">Status Kelulusan</th>
              <th className="py-3.5 px-4">Rata-Rata</th>
              <th className="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-100">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-slate-400 font-normal">
                  Tidak ada data siswa sesuai kriteria pencarian.
                </td>
              </tr>
            ) : (
              filteredStudents.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800 dark:text-slate-200">
                    <div>{s.nisn}</div>
                    <div className="text-[10px] text-slate-400">NIS: {s.nis}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white font-display">
                    {s.name}
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-normal">
                    {s.pob}, {s.dob} ({s.gender})
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    {s.class}
                  </td>
                  <td className="py-3 px-4">
                    {s.status === 'LULUS' ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-2.5 py-0.5 text-[10px] font-semibold">
                        <CheckCircle2 className="h-3 w-3" /> LULUS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60 px-2.5 py-0.5 text-[10px] font-semibold">
                        <XCircle className="h-3 w-3" /> BELUM LULUS
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                    {s.averageScore.toFixed(1)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {s.status === 'LULUS' && (
                        <button
                          onClick={() => setSelectedStudentForSkl(s)}
                          className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition"
                          title="Cetak SKL"
                        >
                          <FileText className="h-3.5 w-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setStudentToEdit(s);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
                        title="Edit Data"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Yakin ingin menghapus siswa ${s.name}?`)) {
                            onDeleteStudent(s.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition"
                        title="Hapus Data"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStudentToEdit(null);
        }}
        onSave={(data) => {
          if (studentToEdit) {
            onUpdateStudent(data);
          } else {
            onAddStudent(data);
          }
        }}
        studentToEdit={studentToEdit}
        skPrefix={schoolInfo.skNumberPrefix}
      />

      {/* SKL Print Preview Modal */}
      {selectedStudentForSkl && (
        <SklPrintModal
          student={selectedStudentForSkl}
          schoolInfo={schoolInfo}
          isOpen={!!selectedStudentForSkl}
          onClose={() => setSelectedStudentForSkl(null)}
        />
      )}

      {/* Import Excel Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Import Data Siswa dari Excel
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gunakan format kolom: NISN, NIS, NamaLengkap, TempatLahir, TanggalLahir, JenisKelamin, Kelas.
            </p>

            <button
              onClick={handleDownloadTemplate}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 p-3 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 transition"
            >
              <FileSpreadsheet className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Unduh File Template Excel
            </button>

            <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center bg-slate-50 dark:bg-slate-800/40">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
                id="excel-file-upload"
              />
              <label
                htmlFor="excel-file-upload"
                className="cursor-pointer flex flex-col items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
              >
                <Upload className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                Klik di sini untuk upload file Excel (.xlsx)
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
