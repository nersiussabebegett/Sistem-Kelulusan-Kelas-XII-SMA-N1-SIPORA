import React, { useState } from 'react';
import { X, Download, Printer, CheckCircle2, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { SKLDocument } from './SKLDocument';
import { Student, SchoolInfo } from '../types';
import { notify } from '../services/toastService';

interface SklPrintModalProps {
  student: Student;
  schoolInfo: SchoolInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const SklPrintModal: React.FC<SklPrintModalProps> = ({
  student,
  schoolInfo,
  isOpen,
  onClose,
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const documentElement = document.getElementById('skl-print-modal-document');
      if (!documentElement) return;

      const dataUrl = await toPng(documentElement, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#ffffff',
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SKL_${student.nisn}_${student.name.replace(/\s+/g, '_')}.pdf`);

      setDownloadSuccess(true);
      notify('add', 'PDF SKL Berhasil Diunduh', `SKL digital atas nama ${student.name} (${student.nisn}) tersimpan dalam format PDF.`);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      notify('delete', 'Gagal Mengunduh PDF', 'Terjadi kesalahan saat membuat file PDF SKL.');
      alert('Gagal mengunduh PDF SKL. Silakan coba cetak langsung.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    notify('info', 'Mencetak Dokumen SKL', `Menyiapkan halaman cetak SKL atas nama ${student.name}.`);
    const printElement = document.getElementById('skl-print-modal-document');
    if (!printElement) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Izinkan pop-up browser untuk mencetak dokumen.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cetak SKL - ${student.name}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @media print {
              body { margin: 0; padding: 0; background: white; }
              #skl-print-area { shadow: none; border: none; width: 100%; margin: 0; padding: 15mm; }
            }
          </style>
        </head>
        <body className="bg-white flex justify-center p-4">
          ${printElement.outerHTML}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 800);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-900/90 rounded-t-2xl">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Dokumen Surat Keterangan Lulus (SKL)
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                Resmi
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              {student.name} ({student.nisn}) - {student.class}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500 transition disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Proses PDF...
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                  Tersimpan!
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Unduh PDF
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-500 transition"
            >
              <Printer className="h-4 w-4" />
              Cetak Dokumen
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable Document Preview */}
        <div className="overflow-y-auto p-6 bg-slate-950 flex justify-center">
          <div className="transform scale-[0.88] origin-top md:scale-100">
            <SKLDocument
              student={student}
              schoolInfo={schoolInfo}
              documentId="skl-print-modal-document"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
