import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Printer,
  Edit2,
  CheckSquare,
  Square,
  FileText
} from 'lucide-react';
import { Student, SchoolInfo } from '../../types';

interface KelulusanViewProps {
  students: Student[];
  schoolInfo: SchoolInfo;
  onBulkUpdateStatus: (studentIds: string[], status: 'LULUS' | 'TIDAK_LULUS') => void;
  onUpdateStudent: (student: Student) => void;
}

export const KelulusanView: React.FC<KelulusanViewProps> = ({
  students,
  schoolInfo,
  onBulkUpdateStatus,
  onUpdateStudent,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('XII MIPA 1');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const classStudents = students.filter((s) => s.class === selectedClass);
  const classesList = Array.from(new Set(students.map((s) => s.class)));

  const handleSelectAll = () => {
    if (selectedIds.length === classStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(classStudents.map((s) => s.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyBulk = (status: 'LULUS' | 'TIDAK_LULUS') => {
    if (selectedIds.length === 0) {
      alert('Pilih minimal satu siswa untuk memperbarui status.');
      return;
    }

    if (confirm(`Set status ${status} untuk ${selectedIds.length} siswa terpilih?`)) {
      onBulkUpdateStatus(selectedIds, status);
      setSelectedIds([]);
    }
  };

  const handlePrintRekap = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Rekapitulasi Kelulusan ${selectedClass} - SMAN 1 Sipora</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body className="bg-white p-8 font-sans text-slate-900 text-xs">
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <h2 className="text-sm font-bold uppercase">PEMERINTAH PROVINSI SUMATERA BARAT - DINAS PENDIDIKAN</h2>
            <h1 className="text-lg font-black uppercase">${schoolInfo.name}</h1>
            <p className="text-[10px]">Alamat: ${schoolInfo.address}, ${schoolInfo.district}</p>
          </div>

          <h3 className="text-center font-bold text-sm uppercase mb-4 underline">
            REKAPITULASI PENETAPAN KELULUSAN SISWA KELAS ${selectedClass}
          </h3>
          <p className="mb-2 text-[11px]">Tahun Ajaran: ${schoolInfo.academicYear} | Tanggal Penetapan: ${schoolInfo.graduationDate}</p>

          <table className="w-full border-collapse border border-slate-400 mb-8 text-[11px]">
            <thead>
              <tr className="bg-slate-100 text-center font-bold">
                <th className="border border-slate-400 p-2">No</th>
                <th className="border border-slate-400 p-2">NISN / NIS</th>
                <th className="border border-slate-400 p-2 text-left">Nama Siswa</th>
                <th className="border border-slate-400 p-2">Status Kelulusan</th>
                <th className="border border-slate-400 p-2">No. SK Kelulusan</th>
                <th className="border border-slate-400 p-2">Rata-Rata Nilai</th>
              </tr>
            </thead>
            <tbody>
              ${classStudents
                .map(
                  (s, idx) => `
                <tr>
                  <td className="border border-slate-400 p-2 text-center">${idx + 1}</td>
                  <td className="border border-slate-400 p-2 text-center font-mono">${s.nisn}</td>
                  <td className="border border-slate-400 p-2 font-bold uppercase">${s.name}</td>
                  <td className="border border-slate-400 p-2 text-center font-bold">${s.status}</td>
                  <td className="border border-slate-400 p-2 font-mono text-center">${s.skNumber}</td>
                  <td className="border border-slate-400 p-2 text-center font-mono font-bold">${s.averageScore.toFixed(1)}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div className="flex justify-end pt-8">
            <div className="text-center w-64">
              <p>Tuapejat, ${schoolInfo.graduationDate}</p>
              <p className="font-semibold mt-1">Kepala Sekolah,</p>
              <div className="h-16"></div>
              <p className="font-bold underline uppercase">${schoolInfo.principalName}</p>
              <p className="font-mono">NIP. ${schoolInfo.principalNip}</p>
            </div>
          </div>

          <script>
            setTimeout(() => { window.print(); window.close(); }, 800);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans text-slate-800 dark:text-slate-100">
      {/* Header Info */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Modul Penetapan Status Kelulusan Massal
            </h2>
            <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-0.5">
              Pilih kelas dan tentukan status kelulusan secara kolektif dengan penerbitan Nomor SK otomatis.
            </p>
          </div>

          <button
            onClick={handlePrintRekap}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition"
          >
            <Printer className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Cetak Rekapitulasi ({selectedClass})
          </button>
        </div>

        {/* Class Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          {classesList.map((cls) => (
            <button
              key={cls}
              onClick={() => {
                setSelectedClass(cls);
                setSelectedIds([]);
              }}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                selectedClass === cls
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              {cls} ({students.filter((s) => s.class === cls).length} Siswa)
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Action Panel */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 font-semibold border border-slate-200 dark:border-slate-700 transition"
          >
            {selectedIds.length === classStudents.length && classStudents.length > 0 ? (
              <CheckSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Square className="h-4 w-4 text-slate-400" />
            )}
            Pilih Semua ({selectedIds.length} terpilih)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleApplyBulk('LULUS')}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-4 py-2 text-xs font-semibold shadow-sm transition"
          >
            <CheckCircle2 className="h-4 w-4" /> Set Terpilih "LULUS"
          </button>

          <button
            onClick={() => handleApplyBulk('TIDAK_LULUS')}
            className="flex items-center gap-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 px-4 py-2 text-xs font-semibold transition"
          >
            <XCircle className="h-4 w-4" /> Set Terpilih "BELUM LULUS"
          </button>
        </div>
      </div>

      {/* Table List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs font-sans border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="py-3.5 px-4 w-10 text-center">Pilih</th>
              <th className="py-3.5 px-4">No</th>
              <th className="py-3.5 px-4">NISN / NIS</th>
              <th className="py-3.5 px-4">Nama Lengkap Siswa</th>
              <th className="py-3.5 px-4">Status Kelulusan Saat Ini</th>
              <th className="py-3.5 px-4">Nomor SK Kelulusan</th>
              <th className="py-3.5 px-4 text-center">Ubah Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-100">
            {classStudents.map((s, idx) => (
              <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(s.id)}
                    onChange={() => handleToggleSelect(s.id)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                </td>
                <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                <td className="py-3 px-4 font-mono font-medium text-slate-900 dark:text-white">
                  {s.nisn}
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white font-display">
                  {s.name}
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
                <td className="py-3 px-4 font-mono font-medium text-slate-700 dark:text-slate-300">
                  {s.skNumber}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => {
                      const newStatus = s.status === 'LULUS' ? 'TIDAK_LULUS' : 'LULUS';
                      onUpdateStudent({
                        ...s,
                        status: newStatus,
                        skNumber:
                          newStatus === 'LULUS'
                            ? `${schoolInfo.skNumberPrefix}2026/${String(idx + 1).padStart(3, '0')}`
                            : '-',
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
                  >
                    Ubah ke {s.status === 'LULUS' ? 'Belum Lulus' : 'Lulus'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
