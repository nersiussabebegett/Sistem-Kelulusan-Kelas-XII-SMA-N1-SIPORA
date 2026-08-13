import React, { useState } from 'react';
import { Bell, Plus, Trash2, Edit3, Pin, Search, Filter, Calendar, User, Tag, CheckCircle, AlertCircle, X, Check } from 'lucide-react';
import { Announcement } from '../../types';

interface PengumumanAdminViewProps {
  announcements: Announcement[];
  onAddAnnouncement: (ann: Omit<Announcement, 'id'>) => void;
  onUpdateAnnouncement: (ann: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
}

export const PengumumanAdminView: React.FC<PengumumanAdminViewProps> = ({
  announcements,
  onAddAnnouncement,
  onUpdateAnnouncement,
  onDeleteAnnouncement,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Jadwal' | 'SKL' | 'Ijazah' | 'Daftar Ulang' | 'Umum'>('Jadwal');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [author, setAuthor] = useState('Panitia Kelulusan');
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Delete Modal State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openAddForm = () => {
    setEditingAnn(null);
    setTitle('');
    setCategory('Jadwal');
    setDate(new Date().toISOString().slice(0, 10));
    setAuthor('Panitia Kelulusan');
    setContent('');
    setIsImportant(false);
    setIsFormOpen(true);
  };

  const openEditForm = (ann: Announcement) => {
    setEditingAnn(ann);
    setTitle(ann.title);
    setCategory(ann.category);
    setDate(ann.date);
    setAuthor(ann.author || 'Panitia Kelulusan');
    setContent(ann.content);
    setIsImportant(ann.isImportant || false);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Judul dan isi pengumuman wajib diisi!');
      return;
    }

    if (editingAnn) {
      onUpdateAnnouncement({
        ...editingAnn,
        title: title.trim(),
        category,
        date,
        author: author.trim() || 'Panitia Kelulusan',
        content: content.trim(),
        isImportant,
      });
    } else {
      onAddAnnouncement({
        title: title.trim(),
        category,
        date,
        author: author.trim() || 'Panitia Kelulusan',
        content: content.trim(),
        isImportant,
      });
    }

    setIsFormOpen(false);
    setEditingAnn(null);
  };

  const handleTogglePin = (ann: Announcement) => {
    onUpdateAnnouncement({
      ...ann,
      isImportant: !ann.isImportant,
    });
  };

  const confirmDelete = () => {
    if (deletingId) {
      onDeleteAnnouncement(deletingId);
      setDeletingId(null);
    }
  };

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ann.author && ann.author.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'Semua' || ann.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPinned = announcements.filter((a) => a.isImportant).length;

  return (
    <div className="space-y-6 animate-fade-in font-sans text-slate-800 dark:text-slate-100">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Manajemen & Pengelolaan Pengumuman
          </h2>
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-0.5">
            Tambah, Ubah, Hapus & Sematkan pengumuman resmi jadwal kelulusan, penyerahan SKL, ijazah, dan informasi alumni.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-4 py-2.5 text-xs font-semibold transition shadow-sm flex-shrink-0"
        >
          <Plus className="h-4 w-4" /> Buat Pengumuman Baru
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase text-slate-400">Total Pengumuman</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">{announcements.length}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-lg">
            <Pin className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase text-slate-400">Penting (Pinned)</span>
            <span className="text-lg font-bold text-amber-600 dark:text-amber-400 font-mono">{totalPinned}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-lg">
            <Tag className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase text-slate-400">Kategori Aktif</span>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400 font-mono">5 Kategori</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase text-slate-400">Status Akses</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Publik & Admin</span>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 space-y-5 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                {editingAnn ? <Edit3 className="h-5 w-5 text-amber-500" /> : <Plus className="h-5 w-5 text-emerald-600" />}
                {editingAnn ? 'Ubah (Edit) Pengumuman' : 'Buat Pengumuman Baru'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Judul Pengumuman <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                  placeholder="Contoh: Jadwal Penyerahan SKL & Bebas Pustaka..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                  >
                    <option value="Jadwal">Jadwal Kelulusan</option>
                    <option value="SKL">Pengambilan SKL</option>
                    <option value="Ijazah">Pengambilan Ijazah</option>
                    <option value="Daftar Ulang">Informasi Daftar Ulang</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Rilis
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Penulis / Penerbit
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                    placeholder="Panitia Kelulusan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Isi Konten Pengumuman <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 p-3.5 text-xs font-normal text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                  placeholder="Tuliskan isi detail pengumuman, persyaratan, jam operasional, atau instruksi penting lainnya..."
                />
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-amber-900 dark:text-amber-300">
                  <input
                    type="checkbox"
                    checked={isImportant}
                    onChange={(e) => setIsImportant(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                  />
                  Sematkan sebagai Pengumuman Penting (Pinned at Top)
                </label>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-normal">
                  Akan selalu berada di barisan paling atas
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-6 py-2.5 text-xs font-semibold shadow-sm flex items-center gap-2 transition"
                >
                  <Check className="h-4 w-4" />
                  {editingAnn ? 'Simpan Perubahan' : 'Terbitkan Pengumuman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center justify-center mx-auto">
              <AlertCircle className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                Konfirmasi Hapus Pengumuman
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-normal">
                Apakah Anda yakin ingin menghapus pengumuman ini secara permanen?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition"
              >
                <Trash2 className="h-4 w-4" /> Ya, Hapus Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengumuman berdasarkan judul..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
          {['Semua', 'Jadwal', 'SKL', 'Ijazah', 'Daftar Ulang', 'Umum'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-3">
            <Bell className="h-10 w-10 text-slate-400 mx-auto opacity-50" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Tidak ada pengumuman yang sesuai dengan kriteria pencarian.
            </p>
            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-sm transition"
            >
              <Plus className="h-4 w-4" /> Tambah Pengumuman Pertama
            </button>
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border ${
                ann.isImportant
                  ? 'border-emerald-500/60 dark:border-emerald-500/50 shadow-sm'
                  : 'border-slate-200/80 dark:border-slate-800 shadow-sm'
              } flex flex-col md:flex-row md:items-start justify-between gap-4 transition hover:border-slate-300 dark:hover:border-slate-700`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleTogglePin(ann)}
                    className={`flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[10px] font-semibold transition ${
                      ann.isImportant
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                    title={ann.isImportant ? 'Sematkan aktif (Klik untuk melepas)' : 'Klik untuk menyematkan di paling atas'}
                  >
                    <Pin className="h-3 w-3" />
                    {ann.isImportant ? 'PINNED (PENTING)' : 'SEMATKAN'}
                  </button>

                  <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 text-[10px] font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
                    {ann.category}
                  </span>

                  <span className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                    <Calendar className="h-3 w-3" /> {ann.date}
                  </span>

                  {ann.author && (
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <User className="h-3 w-3" /> {ann.author}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">{ann.title}</h3>
                <p className="text-xs font-normal text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {ann.content}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-start flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 w-full md:w-auto justify-end">
                <button
                  onClick={() => openEditForm(ann)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition text-xs font-semibold"
                  title="Ubah Pengumuman"
                >
                  <Edit3 className="h-3.5 w-3.5" /> Ubah
                </button>

                <button
                  onClick={() => setDeletingId(ann.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition text-xs font-semibold"
                  title="Hapus Pengumuman"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
