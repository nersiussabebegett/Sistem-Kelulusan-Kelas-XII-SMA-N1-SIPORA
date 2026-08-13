import React, { useState } from 'react';
import { Announcement } from '../types';
import { Bell, Calendar, User, Search, Pin, FileText } from 'lucide-react';

interface PengumumanViewProps {
  announcements: Announcement[];
}

export const PengumumanView: React.FC<PengumumanViewProps> = ({ announcements }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Jadwal', 'SKL', 'Ijazah', 'Daftar Ulang', 'Umum'];

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesCategory = selectedCategory === 'Semua' || ann.category === selectedCategory;
    const matchesSearch =
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 max-w-5xl py-8 space-y-8 font-sans">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider inline-block">
          Informasi & Surat Edaran Resmi
        </span>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-display">
          Pengumuman Kelulusan SMAN 1 Sipora
        </h1>
        <p className="text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400">
          Simak seluruh instruksi, jadwal pengambilan SKL, dan informasi penting alumni.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari pengumuman..."
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 pl-9 pr-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <Bell className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tidak ada pengumuman ditemukan.</p>
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border ${
                ann.isImportant
                  ? 'border-emerald-500/60 dark:border-emerald-500/50 shadow-sm'
                  : 'border-slate-200/80 dark:border-slate-800 shadow-sm'
              } transition`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  {ann.isImportant && (
                    <span className="flex items-center gap-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-2.5 py-0.5 text-[10px] font-semibold border border-amber-200/60 dark:border-amber-800/60">
                      <Pin className="h-3 w-3" /> PENTING
                    </span>
                  )}
                  <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 text-[10px] font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
                    {ann.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-emerald-500" /> {ann.date}
                  </span>
                  <span className="flex items-center gap-1 hidden sm:flex">
                    <User className="h-3.5 w-3.5 text-emerald-500" /> {ann.author}
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 font-display">
                {ann.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
                {ann.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
