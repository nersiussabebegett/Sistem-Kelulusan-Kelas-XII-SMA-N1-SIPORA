import React, { useState } from 'react';
import { SchoolInfo } from '../types';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2 } from 'lucide-react';
import { notify } from '../services/toastService';

interface KontakViewProps {
  schoolInfo: SchoolInfo;
}

export const KontakView: React.FC<KontakViewProps> = ({ schoolInfo }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    notify('add', 'Pesan Terkirim', `Terima kasih ${formData.name || 'Pengunjung'}, pesan Anda berhasil dikirim ke Panitia Kelulusan SMAN 1 Sipora.`);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl py-8 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-4 py-1 text-xs font-bold uppercase tracking-wider inline-block">
          Layanan & Pusat Informasi
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
          Hubungi Sekretariat SMAN 1 Sipora
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          Tim Tata Usaha dan Bimbingan Konseling siap melayani pertanyaan seputar kelulusan dan legalisir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info Card */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 border border-purple-800/50 space-y-4 shadow-eclipse-lg">
            <h3 className="text-lg font-bold uppercase border-b border-purple-800/60 pb-2 font-display">
              Informasi Alamat
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-purple-200">Alamat Sekolah:</strong>
                  <span className="text-purple-200/80">{schoolInfo.address}, {schoolInfo.subdistrict}, {schoolInfo.district}, {schoolInfo.province} {schoolInfo.postalCode}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-purple-200">Telepon & WhatsApp:</strong>
                  <span className="text-purple-200/80">{schoolInfo.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-purple-200">Email Resmi:</strong>
                  <span className="text-purple-200/80">{schoolInfo.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-purple-200">Website:</strong>
                  <span className="text-purple-200/80">{schoolInfo.website}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-purple-100 dark:border-purple-800/40 shadow-eclipse text-xs space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white font-display uppercase">Jam Layanan Loket SKL:</h4>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Senin - Kamis: 08.00 - 15.00 WIB</p>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Jumat: 08.00 - 11.30 WIB</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-100 dark:border-purple-800/40 shadow-eclipse-lg space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Kirim Pesan atau Pertanyaan
            </h3>

            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/50 rounded-2xl p-4 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="font-medium">Pesan Anda telah berhasil dikirim ke Tata Usaha SMAN 1 Sipora. Kami akan segera merespons email Anda.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/30 dark:bg-purple-950/20 px-3 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/30 dark:bg-purple-950/20 px-3 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="email@domain.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subjek Pertanyaan
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/30 dark:bg-purple-950/20 px-3 py-2.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g. Legalisir SKL / Rapor"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Isi Pesan
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/30 dark:bg-purple-950/20 p-3 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tuliskan pertanyaan Anda..."
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-6 py-3 text-xs font-bold text-white uppercase tracking-wider shadow-md shadow-purple-600/30 transition active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  Kirim Pesan Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
