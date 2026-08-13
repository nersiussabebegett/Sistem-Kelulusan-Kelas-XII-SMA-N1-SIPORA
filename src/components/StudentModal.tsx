import React, { useState, useEffect } from 'react';
import { X, User, BookOpen, Save, Award } from 'lucide-react';
import { Student, Major, StatusKelulusan } from '../types';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentData: any) => void;
  studentToEdit?: Student | null;
  skPrefix: string;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  studentToEdit,
  skPrefix,
}) => {
  const [formData, setFormData] = useState({
    nisn: '',
    nis: '',
    name: '',
    pob: 'Tuapejat',
    dob: '2007-01-01',
    gender: 'L' as 'L' | 'P',
    address: 'Sidoamakmur, Sipora Utara',
    phone: '081267890000',
    parentName: '',
    class: 'XII MIPA 1',
    major: 'MIPA' as Major,
    status: 'LULUS' as StatusKelulusan,
    skNumber: '',
    notes: '',
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
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        nisn: studentToEdit.nisn,
        nis: studentToEdit.nis,
        name: studentToEdit.name,
        pob: studentToEdit.pob,
        dob: studentToEdit.dob,
        gender: studentToEdit.gender,
        address: studentToEdit.address,
        phone: studentToEdit.phone,
        parentName: studentToEdit.parentName,
        class: studentToEdit.class,
        major: studentToEdit.major,
        status: studentToEdit.status,
        skNumber: studentToEdit.skNumber,
        notes: studentToEdit.notes || '',
        grades: { ...studentToEdit.grades },
      });
    } else {
      setFormData({
        nisn: '',
        nis: '',
        name: '',
        pob: 'Tuapejat',
        dob: '2007-01-01',
        gender: 'L',
        address: 'Sidoamakmur, Sipora Utara',
        phone: '081267890000',
        parentName: '',
        class: 'XII MIPA 1',
        major: 'MIPA',
        status: 'LULUS',
        skNumber: `${skPrefix}2026/${Math.floor(100 + Math.random() * 900)}`,
        notes: '',
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
      });
    }
  }, [studentToEdit, skPrefix, isOpen]);

  if (!isOpen) return null;

  const handleGradeChange = (subject: string, val: number) => {
    setFormData((prev) => ({
      ...prev,
      grades: {
        ...prev.grades,
        [subject]: Math.min(100, Math.max(0, val)),
      },
    }));
  };

  const calculateAverage = () => {
    const values = Object.values(formData.grades) as number[];
    const sum = values.reduce((acc: number, curr: number) => acc + Number(curr), 0);
    return Number((sum / (values.length || 1)).toFixed(1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nisn || !formData.name || !formData.nis) {
      alert('NISN, NIS, dan Nama Lengkap wajib diisi!');
      return;
    }

    const averageScore = calculateAverage();
    onSave({
      ...formData,
      averageScore,
      id: studentToEdit ? studentToEdit.id : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm font-sans">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border-4 border-slate-950 dark:border-slate-700 shadow-bold-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-950 dark:border-slate-700 px-6 py-4 bg-slate-950 text-white rounded-t-[20px]">
          <h3 className="text-lg font-black uppercase tracking-wider font-display flex items-center gap-2 text-emerald-400">
            <User className="h-5 w-5 text-emerald-400 stroke-[3]" />
            {studentToEdit ? 'Edit Data Siswa' : 'Tambah Data Siswa Baru'}
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 transition border-2 border-slate-800"
          >
            <X className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          {/* Identitas Utama */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 border-b pb-1">
              Data Identitas Siswa
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  NISN (10 Digit) *
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  value={formData.nisn}
                  onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                  placeholder="0061234567"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  NIS *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nis}
                  onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                  placeholder="23101"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Lengkap Siswa *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                  placeholder="Nama Lengkap"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tempat Lahir
                </label>
                <input
                  type="text"
                  value={formData.pob}
                  onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'L' | 'P' })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                >
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kelas
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => {
                    const cls = e.target.value;
                    const major = cls.includes('MIPA') ? 'MIPA' : 'IPS';
                    setFormData({ ...formData, class: cls, major });
                  }}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                >
                  <option value="XII MIPA 1">XII MIPA 1</option>
                  <option value="XII MIPA 2">XII MIPA 2</option>
                  <option value="XII IPS 1">XII IPS 1</option>
                  <option value="XII IPS 2">XII IPS 2</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Jurusan
                </label>
                <input
                  type="text"
                  disabled
                  value={formData.major}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Orang Tua / Wali
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Status Kelulusan */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 border-b pb-1 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Status Kelulusan & Surat
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Status Kelulusan
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as StatusKelulusan })
                  }
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                >
                  <option value="LULUS">LULUS</option>
                  <option value="TIDAK_LULUS">BELUM LULUS / TIDAK LULUS</option>
                  <option value="PENDING">PROSES VERIFIKASI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nomor SK Kelulusan
                </label>
                <input
                  type="text"
                  value={formData.skNumber}
                  onChange={(e) => setFormData({ ...formData, skNumber: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-mono text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Nilai Mata Pelajaran */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-1">
              <h4 className="text-sm font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Daftar Nilai Ujian Sekolah
              </h4>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Rata-rata: <strong className="text-sm">{calculateAverage()}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(formData.grades).map(([subject, score]) => (
                <div key={subject} className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate pr-2">
                    {subject}
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={score}
                    onChange={(e) => handleGradeChange(subject, parseFloat(e.target.value) || 0)}
                    className="w-16 rounded border border-slate-300 dark:border-slate-600 px-2 py-1 text-center font-mono text-xs font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t-2 border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-slate-300 dark:border-slate-700"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-6 py-2.5 text-xs font-black uppercase tracking-wider border-2 border-slate-950 shadow-bold transition"
            >
              <Save className="h-4 w-4 stroke-[3]" />
              Simpan Data Siswa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
