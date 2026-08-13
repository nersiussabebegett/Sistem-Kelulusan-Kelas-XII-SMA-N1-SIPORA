import React from 'react';
import { Activity } from 'lucide-react';
import { AuditLog } from '../../types';

interface AuditLogViewProps {
  auditLogs: AuditLog[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ auditLogs }) => {
  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-purple-100 dark:border-purple-800/40 shadow-eclipse">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-600" />
          Audit Log Aktivitas Sistem
        </h2>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          Catatan riwayat aktivitas perubahan data siswa, status kelulusan, dan autentikasi pengguna.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-purple-100 dark:border-purple-800/40 shadow-eclipse overflow-x-auto">
        <table className="w-full text-left text-xs font-sans border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-slate-950 via-purple-950 to-indigo-950 text-white uppercase tracking-wider font-bold font-display border-b border-purple-800/50">
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-4">Pengguna</th>
              <th className="py-3.5 px-4">Tindakan / Action</th>
              <th className="py-3.5 px-4">Rincian Perubahan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-100 dark:divide-purple-900/30">
            {auditLogs.map((log, index) => (
              <tr key={`${log.id}-${index}`} className="hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition">
                <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{log.timestamp}</td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{log.user}</td>
                <td className="py-3 px-4">
                  <span className="rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 font-mono text-[10px] font-bold border border-purple-200 dark:border-purple-800/40">
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
