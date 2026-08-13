import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FileText, Printer, Download, Filter, Award } from 'lucide-react';
import { Student, SchoolInfo } from '../../types';

interface LaporanViewProps {
  students: Student[];
  schoolInfo: SchoolInfo;
}

export const LaporanView: React.FC<LaporanViewProps> = ({ students, schoolInfo }) => {
  const [reportType, setReportType] = useState<'seluruh' | 'jurusan' | 'kelas'>('seluruh');
  const [selectedMajor, setSelectedMajor] = useState<string>('MIPA');
  const [selectedClass, setSelectedClass] = useState<string>('XII MIPA 1');

  const classesList = Array.from(new Set(students.map((s) => s.class)));

  const getFilteredStudents = () => {
    if (reportType === 'jurusan') {
      return students.filter((s) => s.major === selectedMajor);
    }
    if (reportType === 'kelas') {
      return students.filter((s) => s.class === selectedClass);
    }
    return students;
  };

  const currentList = getFilteredStudents();
  const total = currentList.length;
  const totalLulus = currentList.filter((s) => s.status === 'LULUS').length;
  const totalTidakLulus = currentList.filter((s) => s.status === 'TIDAK_LULUS').length;
  const percentage = total > 0 ? Math.round((totalLulus / total) * 100) : 0;

  const handleExportExcel = () => {
    const data = currentList.map((s, idx) => ({
      No: idx + 1,
      NISN: s.nisn,
      NIS: s.nis,
      'Nama Siswa': s.name,
      Kelas: s.class,
      Jurusan: s.major,
      'Status Kelulusan': s.status,
      'No. SK': s.skNumber,
      'Rata-Rata Nilai': s.averageScore,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Laporan Kelulusan');
    XLSX.writeFile(wb, `Laporan_Kelulusan_SMAN1_Sipora_${reportType}.xlsx`);
  };

  const handlePrintReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Laporan Kelulusan SMAN 1 Sipora</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body className="bg-white p-8 font-sans text-slate-900 text-xs">
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <h2 className="text-xs font-bold uppercase">PEMERINTAH PROVINSI SUMATERA BARAT - DINAS PENDIDIKAN</h2>
            <h1 className="text-base font-black uppercase">${schoolInfo.name}</h1>
            <p className="text-[10px]">${schoolInfo.address}, ${schoolInfo.district}</p>
          </div>

          <h2 className="text-center font-bold text-sm uppercase underline mb-2">
            LAPORAN RESMI KELULUSAN SISWA KELAS XII
          </h2>
          <p className="text-center text-xs font-semibold mb-6">
            Kategori Laporan: ${reportType.toUpperCase()} ${
      reportType === 'jurusan' ? selectedMajor : reportType === 'kelas' ? selectedClass : 'SEKOLAH'
    } | Tahun Ajaran ${schoolInfo.academicYear}
          </p>

          <div className="grid grid-cols-4 gap-2 mb-6 text-center font-bold text-[11px] bg-slate-100 p-3 rounded border border-slate-300">
            <div>Total Siswa: ${total}</div>
            <div>Siswa Lulus: ${totalLulus}</div>
            <div>Belum Lulus: ${totalTidakLulus}</div>
            <div>Persentase: ${percentage}%</div>
          </div>

          <table className="w-full border-collapse border border-slate-400 text-[10px] mb-8">
            <thead>
              <tr className="bg-slate-200 text-center font-bold">
                <th className="border border-slate-400 p-1.5">No</th>
                <th className="border border-slate-400 p-1.5">NISN / NIS</th>
                <th className="border border-slate-400 p-1.5 text-left">Nama Lengkap</th>
                <th className="border border-slate-400 p-1.5">Kelas</th>
                <th className="border border-slate-400 p-1.5">Status</th>
                <th className="border border-slate-400 p-1.5">No. SK Kelulusan</th>
                <th className="border border-slate-400 p-1.5">Nilai Rata-Rata</th>
              </tr>
            </thead>
            <tbody>
              ${currentList
                .map(
                  (s, idx) => `
                <tr>
                  <td className="border border-slate-400 p-1 text-center">${idx + 1}</td>
                  <td className="border border-slate-400 p-1 text-center font-mono">${s.nisn}</td>
                  <td className="border border-slate-400 p-1 font-bold uppercase">${s.name}</td>
                  <td className="border border-slate-400 p-1 text-center">${s.class}</td>
                  <td className="border border-slate-400 p-1 text-center font-bold">${s.status}</td>
                  <td className="border border-slate-400 p-1 text-center font-mono">${s.skNumber}</td>
                  <td className="border border-slate-400 p-1 text-center font-mono font-bold">${s.averageScore.toFixed(1)}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <div className="flex justify-end pt-6">
            <div className="text-center w-60 text-xs">
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Modul Laporan Rekapitulasi Kelulusan
          </h2>
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-0.5">
            Cetak dan ekspor laporan rekapitulasi kelulusan per kelas, jurusan, atau seluruh sekolah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition"
          >
            <Printer className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Cetak PDF Laporan
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-4 py-2.5 text-xs font-semibold shadow-sm transition"
          >
            <Download className="h-4 w-4" /> Export Excel
          </button>
        </div>
      </div>

      {/* Filter Control */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Filter className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Tipe Laporan:
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setReportType('seluruh')}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
              reportType === 'seluruh'
                ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
            }`}
          >
            Seluruh Sekolah
          </button>
          <button
            onClick={() => setReportType('jurusan')}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
              reportType === 'jurusan'
                ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
            }`}
          >
            Per Jurusan
          </button>
          <button
            onClick={() => setReportType('kelas')}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
              reportType === 'kelas'
                ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
            }`}
          >
            Per Kelas
          </button>
        </div>

        {reportType === 'jurusan' && (
          <select
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
          >
            <option value="MIPA">MIPA</option>
            <option value="IPS">IPS</option>
          </select>
        )}

        {reportType === 'kelas' && (
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
          >
            {classesList.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Summary Box */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Total Siswa</span>
          <p className="text-3xl font-bold text-slate-900 dark:text-white font-display mt-1">{total}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Lulus</span>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-display mt-1">{totalLulus}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold uppercase tracking-wider">Belum Lulus</span>
          <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 font-display mt-1">{totalTidakLulus}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider">Persentase Kelulusan</span>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 font-display mt-1">{percentage}%</p>
        </div>
      </div>
    </div>
  );
};
