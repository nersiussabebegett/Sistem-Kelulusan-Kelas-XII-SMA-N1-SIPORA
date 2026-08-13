import React, { useState } from 'react';
import { UserCheck, Shield, Plus, Key, Trash2 } from 'lucide-react';
import { UserAccount, Role } from '../../types';

interface UserManagementViewProps {
  accounts: UserAccount[];
  onSaveAccounts: (accounts: UserAccount[]) => void;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  accounts,
  onSaveAccounts,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('operator');
  const [email, setEmail] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !name) {
      alert('Username dan nama wajib diisi!');
      return;
    }

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      username,
      name,
      role,
      email: email || `${username}@sman1sipora.sch.id`,
      lastLogin: '-',
    };

    onSaveAccounts([...accounts, newUser]);
    setUsername('');
    setName('');
    setEmail('');
    setIsFormOpen(false);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Yakin ingin menghapus akun pengguna ini?')) {
      onSaveAccounts(accounts.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans text-slate-800 dark:text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Modul Manajemen Pengguna Sistem
          </h2>
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-0.5">
            Kelola hak akses pengguna (Administrator, Operator Sekolah, Kepala Sekolah, dan Siswa).
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-semibold px-4 py-2.5 text-xs transition shadow-sm"
        >
          <Plus className="h-4 w-4" /> Tambah Akun Pengguna
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleAddUser} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Tambah Pengguna Baru</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                placeholder="e.g. op_kurikulum"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Pengguna</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                placeholder="Nama Pengguna"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Role / Peran</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
              >
                <option value="admin">Admin</option>
                <option value="operator">Operator Sekolah</option>
                <option value="kepala_sekolah">Kepala Sekolah</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 px-3 py-2 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/80 transition-all"
                placeholder="user@sman1sipora.sch.id"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="rounded-xl px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 px-5 py-2 text-xs font-semibold shadow-sm transition"
            >
              Simpan Pengguna
            </button>
          </div>
        </form>
      )}

      {/* Accounts Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs font-sans border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200/80 dark:border-slate-800">
              <th className="py-3.5 px-4">No</th>
              <th className="py-3.5 px-4">Username</th>
              <th className="py-3.5 px-4">Nama Lengkap</th>
              <th className="py-3.5 px-4">Role / Peran</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Login Terakhir</th>
              <th className="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-100">
            {accounts.map((user, idx) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                <td className="py-3 px-4 font-mono font-medium text-slate-900 dark:text-white">
                  {user.username}
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white font-display">
                  {user.name}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-[10px] font-semibold ${
                      user.role === 'admin'
                        ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60'
                        : user.role === 'kepala_sekolah'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60'
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60'
                    }`}
                  >
                    <Shield className="h-3 w-3" />
                    {user.role === 'admin'
                      ? 'Administrator'
                      : user.role === 'kepala_sekolah'
                      ? 'Kepala Sekolah'
                      : 'Operator Sekolah'}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">{user.email}</td>
                <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{user.lastLogin}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition"
                    title="Hapus Pengguna"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
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
