import React, { useState } from 'react';
import { FileText, Printer, Download, Search, ShieldCheck } from 'lucide-react';
import { Student, SchoolInfo } from '../../types';
import { SklPrintModal } from '../../components/SklPrintModal';

interface SklManagementViewProps {
  students: Student[];
  schoolInfo: SchoolInfo;
}

export const SklManagementView: React.FC<SklManagementViewProps> = ({
  students,
  schoolInfo,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const passedStudents = students.filter(
    (s) =>
      s.status === 'LULUS' &&
      (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nisn.includes(searchTerm) ||
        s.class.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-slate-950 dark:border-slate-700 shadow-bold">
        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-tight font-display flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-500 stroke-[2.5]" />
            Modul Manajemen Surat Keterangan Lulus (SKL)
          </h2>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Penerbitan SKL resmi terverifikasi QR Code untuk seluruh siswa yang dinyatakan LULUS.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600 dark:text-slate-400 stroke-[2.5]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari siswa LULUS..."
            className="w-full rounded-xl border-2 border-slate-950 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-xs font-bold text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {passedStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-950 dark:border-slate-700 shadow-bold space-y-4 hover:border-emerald-500 transition"
          >
            <div className="flex items-start justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {student.class} ({student.major})
                </span>
                <h3 className="font-black text-slate-950 dark:text-white text-sm uppercase font-display">
                  {student.name}
                </h3>
                <p className="text-xs font-mono font-bold text-slate-500">NISN: {student.nisn}</p>
              </div>

              <span className="flex items-center gap-1 rounded-lg bg-emerald-400 text-slate-950 px-2 py-0.5 text-[10px] font-black border border-slate-950 shadow-sm uppercase">
                <ShieldCheck className="h-3 w-3 stroke-[3]" /> QR Valid
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <p>No. SK: <strong className="text-slate-950 dark:text-white font-black">{student.skNumber}</strong></p>
              <p>Rata-Rata: <strong className="text-emerald-600 dark:text-emerald-400 font-black">{student.averageScore.toFixed(1)}</strong></p>
            </div>

            <button
              onClick={() => setSelectedStudent(student)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-slate-950 shadow-bold transition"
            >
              <Printer className="h-4 w-4 stroke-[2.5]" /> Cetak & Pratinjau SKL
            </button>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <SklPrintModal
          student={selectedStudent}
          schoolInfo={schoolInfo}
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};
