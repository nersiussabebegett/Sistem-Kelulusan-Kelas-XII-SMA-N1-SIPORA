import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Student, SchoolInfo } from '../types';
import { TutWuriLogo } from './TutWuriLogo';
import { MentawaiLogo } from './MentawaiLogo';

interface SKLDocumentProps {
  student: Student;
  schoolInfo: SchoolInfo;
  documentId?: string;
}

export const SKLDocument: React.FC<SKLDocumentProps> = ({
  student,
  schoolInfo,
  documentId = 'skl-print-area',
}) => {
  const verificationUrl = `${window.location.origin}/#/verifikasi?sk=${encodeURIComponent(
    student.skNumber
  )}&nisn=${student.nisn}`;

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const formattedDob = `${student.pob}, ${formatDate(student.dob)}`;
  const formattedGraduationDate = formatDate(schoolInfo.graduationDate);

  return (
    <div
      id={documentId}
      className="mx-auto w-[210mm] min-h-[297mm] bg-white p-10 text-slate-900 shadow-xl border border-slate-200 font-serif leading-relaxed text-sm relative"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] z-0">
        <MentawaiLogo className="w-[110mm] h-[110mm]" />
      </div>

      {/* KOP SURAT */}
      <div className="border-b-4 border-double border-slate-900 pb-3 text-center mb-6 relative z-10">
        <div className="flex items-center justify-between px-2">
          <div className="w-24 flex-shrink-0 flex justify-center items-center">
            {/* Tut Wuri Handayani Official Logo (Kiri) */}
            {schoolInfo.logoUrl && (schoolInfo.logoUrl.startsWith('data:image') || schoolInfo.logoUrl.startsWith('http')) ? (
              <img src={schoolInfo.logoUrl} alt="Logo Sekolah" className="h-20 w-20 object-contain drop-shadow-sm" />
            ) : (
              <TutWuriLogo className="h-20 w-20 drop-shadow-sm" />
            )}
          </div>

          <div className="flex-1 text-center font-sans px-2">
            <h4 className="text-xs font-bold tracking-wider uppercase text-slate-700">
              PEMERINTAH PROVINSI SUMATERA BARAT
            </h4>
            <h3 className="text-sm font-bold tracking-wider uppercase text-slate-800">
              DINAS PENDIDIKAN
            </h3>
            <h1 className="text-xl font-black tracking-wide text-blue-950 uppercase">
              {schoolInfo.name}
            </h1>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {schoolInfo.address}, {schoolInfo.subdistrict}, {schoolInfo.district}
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              NPSN: {schoolInfo.npsn} | Email: {schoolInfo.email} | Telp: {schoolInfo.phone}
            </p>
          </div>

          <div className="w-24 flex-shrink-0 flex justify-center items-center">
            {/* Lambang Kabupaten Kepulauan Mentawai Logo (Kanan) */}
            <MentawaiLogo className="h-20 w-16 drop-shadow-sm" />
          </div>
        </div>
      </div>

      {/* SURAT TITLE */}
      <div className="text-center mb-6 font-sans">
        <h2 className="text-lg font-bold uppercase underline tracking-wider text-slate-900">
          SURAT KETERANGAN LULUS
        </h2>
        <p className="text-xs text-slate-700 mt-1 font-mono">
          Nomor: {student.skNumber}
        </p>
      </div>

      {/* OPENING STATEMENT */}
      <div className="mb-4 text-justify font-sans text-xs">
        Yang bertanda tangan di bawah ini, Kepala {schoolInfo.name}, Kabupaten Kepulauan Mentawai,
        Provinsi Sumatera Barat, menerangkan bahwa:
      </div>

      {/* STUDENT DATA TABLE */}
      <div className="mb-5 font-sans text-xs bg-slate-50/50 p-4 rounded border border-slate-200">
        <table className="w-full">
          <tbody>
            <tr className="py-1">
              <td className="w-44 font-semibold text-slate-700 py-1">Nama Lengkap</td>
              <td className="w-4 py-1">:</td>
              <td className="font-bold text-slate-900 py-1 uppercase">{student.name}</td>
            </tr>
            <tr className="py-1">
              <td className="font-semibold text-slate-700 py-1">Tempat, Tanggal Lahir</td>
              <td className="py-1">:</td>
              <td className="text-slate-800 py-1">{formattedDob}</td>
            </tr>
            <tr className="py-1">
              <td className="font-semibold text-slate-700 py-1">NIS / NISN</td>
              <td className="py-1">:</td>
              <td className="font-mono text-slate-800 py-1">{student.nis} / {student.nisn}</td>
            </tr>
            <tr className="py-1">
              <td className="font-semibold text-slate-700 py-1">Program Keahlian / Jurusan</td>
              <td className="py-1">:</td>
              <td className="text-slate-800 py-1 font-semibold">{student.major} ({student.class})</td>
            </tr>
            <tr className="py-1">
              <td className="font-semibold text-slate-700 py-1">Nama Orang Tua / Wali</td>
              <td className="py-1">:</td>
              <td className="text-slate-800 py-1">{student.parentName}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* STATUS STATEMENT */}
      <div className="mb-6 text-center py-3 px-4 bg-emerald-50 border border-emerald-300 rounded font-sans">
        <p className="text-xs text-emerald-900 uppercase tracking-wider font-semibold">
          Berdasarkan kriteria kelulusan satuan pendidikan, siswa di atas dinyatakan:
        </p>
        <p className="text-2xl font-black tracking-widest text-emerald-700 my-1">
          L U L U S
        </p>
        <p className="text-xs text-emerald-800 font-medium">
          Dari Satuan Pendidikan {schoolInfo.name} Tahun Ajaran {schoolInfo.academicYear}
        </p>
      </div>

      {/* GRADES TABLE */}
      <div className="mb-6 font-sans">
        <h3 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
          Daftar Nilai Hasil Ujian Sekolah & Assesmen Rapor:
        </h3>
        <table className="w-full text-xs border-collapse border border-slate-300">
          <thead>
            <tr className="bg-slate-100 text-slate-800 text-center font-bold">
              <th className="border border-slate-300 py-1.5 px-2 w-10">No</th>
              <th className="border border-slate-300 py-1.5 px-3 text-left">Mata Pelajaran</th>
              <th className="border border-slate-300 py-1.5 px-3 w-28">Nilai Ujian</th>
            </tr>
          </thead>
          <tbody>
            {(Object.entries(student.grades) as [string, number][]).map(([subject, score], idx) => (
              <tr key={subject} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                <td className="border border-slate-300 py-1 px-2 text-center text-slate-600">{idx + 1}</td>
                <td className="border border-slate-300 py-1 px-3 text-slate-800">{subject}</td>
                <td className="border border-slate-300 py-1 px-3 text-center font-mono font-semibold text-slate-900">
                  {Number(score).toFixed(1)}
                </td>
              </tr>
            ))}
            <tr className="bg-emerald-50/80 font-bold text-slate-900">
              <td colSpan={2} className="border border-slate-300 py-1.5 px-3 text-right uppercase">
                Rata-Rata Nilai
              </td>
              <td className="border border-slate-300 py-1.5 px-3 text-center font-mono text-sm text-emerald-800">
                {student.averageScore.toFixed(1)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CLOSING REMARK */}
      <div className="mb-8 font-sans text-xs text-justify text-slate-700">
        Surat Keterangan Lulus ini berlaku sementara sampai dengan diterbitkannya Ijazah Asli
        Tahun Ajaran {schoolInfo.academicYear} bagi yang bersangkutan. Surat Keterangan Lulus ini dapat
        digunakan untuk keperluan pendaftaran Perguruan Tinggi, Kedinasan, maupun melamar pekerjaan.
      </div>

      {/* SIGNATURE & SEAL BLOCK */}
      <div className="flex items-end justify-between font-sans text-xs mt-6">
        {/* QR Code Verification */}
        <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded text-center">
          <QRCodeSVG value={verificationUrl} size={90} level="M" />
          <span className="text-[9px] font-mono font-bold text-slate-600 mt-2">
            PIN VERIFIKASI DIGITAL
          </span>
          <span className="text-[8px] text-slate-500">Scan untuk keabsahan document</span>
        </div>

        {/* Student Photo Box */}
        <div className="w-24 h-32 border-2 border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center text-center p-1 rounded">
          {student.photoUrl ? (
            <img
              src={student.photoUrl}
              alt={student.name}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <>
              <span className="text-[10px] font-bold text-slate-400">PASFOTO</span>
              <span className="text-[9px] text-slate-400">3 x 4 cm</span>
              <span className="text-[8px] text-slate-400 mt-1">Cap Tiga Jari</span>
            </>
          )}
        </div>

        {/* Principal Signature */}
        <div className="text-center w-64">
          <p className="text-slate-700">Tuapejat, {formattedGraduationDate}</p>
          <p className="font-semibold text-slate-800 mt-0.5">Kepala Sekolah,</p>

          {/* Digital Stamp Simulation */}
          <div className="relative my-3 h-16 flex items-center justify-center">
            <div className="absolute border-2 border-emerald-700/40 rounded-full w-20 h-20 flex items-center justify-center -rotate-12 pointer-events-none">
              <span className="text-[8px] font-bold text-emerald-800/60 uppercase text-center leading-tight">
                SMAN 1 SIPORA<br />MENTAWAI
              </span>
            </div>
            <div className="font-serif italic font-bold text-emerald-900 text-lg tracking-widest opacity-80 rotate-[-4deg]">
              [ Terverifikasi Digital ]
            </div>
          </div>

          <p className="font-bold underline uppercase text-slate-900 text-sm">
            {schoolInfo.principalName}
          </p>
          <p className="text-[11px] font-mono text-slate-600">
            NIP. {schoolInfo.principalNip}
          </p>
        </div>
      </div>

      {/* FOOTER VERIFICATION NOTE */}
      <div className="mt-8 pt-2 border-t border-slate-300 text-[9px] text-slate-500 flex justify-between font-mono">
        <span>Dokumen ini diterbitkan resmi oleh SMAN 1 Sipora</span>
        <span>ID Dokumen: {student.nisn}-SKL-2026</span>
      </div>
    </div>
  );
};
