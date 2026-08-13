import React, { useState, useEffect, useRef } from 'react';
import {
  Trash2,
  PlusCircle,
  Edit3,
  AlertTriangle,
  Info,
  X,
  Bell,
  CheckCircle2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ToastMessage, playToastSound } from '../services/toastService';

interface ToastItemProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
  soundEnabled: boolean;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose, soundEnabled }) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const duration = toast.duration || 4500;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (soundEnabled) {
      playToastSound(toast.type);
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now();
    const initialProgress = progress;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev - 100 / (duration / 50);
        if (next <= 0) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          handleDismiss();
          return 0;
        }
        return next;
      });
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, duration]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 200);
  };

  // Type Configuration (Colors, Badges, Icons)
  const config = {
    delete: {
      borderColor: 'border-rose-500',
      shadowColor: 'shadow-[6px_6px_0px_0px_rgba(244,63,94,1)]',
      badgeBg: 'bg-rose-500 text-slate-950',
      badgeText: 'HAPUS / TERHAPUS',
      progressBarBg: 'bg-rose-500',
      icon: <Trash2 className="h-5 w-5 text-rose-400 stroke-[2.5]" />,
    },
    add: {
      borderColor: 'border-emerald-400',
      shadowColor: 'shadow-[6px_6px_0px_0px_rgba(52,211,153,1)]',
      badgeBg: 'bg-emerald-400 text-slate-950',
      badgeText: 'TAMBAH / DITAMBAHKAN',
      progressBarBg: 'bg-emerald-400',
      icon: <PlusCircle className="h-5 w-5 text-emerald-400 stroke-[2.5]" />,
    },
    edit: {
      borderColor: 'border-amber-400',
      shadowColor: 'shadow-[6px_6px_0px_0px_rgba(251,191,36,1)]',
      badgeBg: 'bg-amber-400 text-slate-950',
      badgeText: 'UBAH / DIPERBARUI',
      progressBarBg: 'bg-amber-400',
      icon: <Edit3 className="h-5 w-5 text-amber-400 stroke-[2.5]" />,
    },
    warning: {
      borderColor: 'border-orange-500',
      shadowColor: 'shadow-[6px_6px_0px_0px_rgba(249,115,22,1)]',
      badgeBg: 'bg-orange-500 text-slate-950',
      badgeText: 'RESET / PERINGATAN',
      progressBarBg: 'bg-orange-500',
      icon: <AlertTriangle className="h-5 w-5 text-orange-400 stroke-[2.5]" />,
    },
    info: {
      borderColor: 'border-sky-400',
      shadowColor: 'shadow-[6px_6px_0px_0px_rgba(56,189,248,1)]',
      badgeBg: 'bg-sky-400 text-slate-950',
      badgeText: 'INFORMASI SISTEM',
      progressBarBg: 'bg-sky-400',
      icon: <Info className="h-5 w-5 text-sky-400 stroke-[2.5]" />,
    },
  }[toast.type];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`pointer-events-auto relative overflow-hidden bg-slate-950 dark:bg-slate-950 rounded-2xl border-2 ${config.borderColor} ${config.shadowColor} p-4 text-white transition-all duration-300 transform ${
        isExiting ? 'translate-x-full opacity-0 scale-95' : 'translate-x-0 opacity-100 scale-100'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon Box */}
        <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex-shrink-0 mt-0.5">
          {config.icon}
        </div>

        {/* Content Box */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-md font-black text-[9px] uppercase tracking-wider ${config.badgeBg}`}>
              {config.badgeText}
            </span>
            <span className="text-[10px] text-slate-400 font-mono font-bold">{toast.timestamp}</span>
          </div>

          <h4 className="font-black text-xs uppercase tracking-tight text-white font-display line-clamp-1">
            {toast.title}
          </h4>

          <p className="text-xs text-slate-300 font-medium leading-relaxed mt-0.5 whitespace-pre-line">
            {toast.message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition flex-shrink-0"
          title="Tutup Notifikasi"
        >
          <X className="h-4 w-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Hover Pause Indicator */}
      {isPaused && (
        <span className="absolute top-2 right-8 text-[9px] font-bold text-amber-300 uppercase tracking-widest bg-slate-900 px-1.5 py-0.5 rounded border border-amber-400/50">
          PAUSED
        </span>
      )}

      {/* Progress Bar Timer */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 overflow-hidden">
        <div
          className={`h-full ${config.progressBarBg} transition-all duration-75 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const handleToastEvent = (e: CustomEvent<ToastMessage>) => {
      setToasts((prev) => [e.detail, ...prev].slice(0, 5)); // Keep max 5 toasts
    };

    window.addEventListener('app-toast-event' as any, handleToastEvent);
    return () => {
      window.removeEventListener('app-toast-event' as any, handleToastEvent);
    };
  }, []);

  const handleClose = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearAll = () => {
    setToasts([]);
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] pointer-events-none flex flex-col gap-3 max-w-sm w-full sm:w-96 px-4 sm:px-0">
      {/* Sound & Clear Controls Bar if multiple toasts */}
      {toasts.length > 1 && (
        <div className="pointer-events-auto self-end flex items-center gap-2 bg-slate-900/90 backdrop-blur border-2 border-slate-700 p-1.5 px-3 rounded-xl shadow-bold text-[10px] font-bold uppercase text-slate-300">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1 hover:text-white"
            title={soundEnabled ? 'Matikan Suara Notif' : 'Aktifkan Suara Notif'}
          >
            {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-emerald-400" /> : <VolumeX className="h-3.5 w-3.5 text-slate-500" />}
          </button>
          <span className="text-slate-600">|</span>
          <span>{toasts.length} Notifikasi</span>
          <span className="text-slate-600">|</span>
          <button
            onClick={handleClearAll}
            className="text-rose-400 hover:text-rose-300 font-black uppercase underline"
          >
            Bersihkan
          </button>
        </div>
      )}

      {/* Render active toasts */}
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={handleClose}
          soundEnabled={soundEnabled}
        />
      ))}
    </div>
  );
};
