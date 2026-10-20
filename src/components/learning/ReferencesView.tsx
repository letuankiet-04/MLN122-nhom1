import React, { useState } from 'react';
import { ACADEMIC_REFERENCES } from '../../data/referencesData';
import { AcademicReference } from '../../types';
import { BookOpen, Copy, Check, ExternalLink, FileText } from 'lucide-react';

export const ReferencesView: React.FC<{ onOpenPdf?: (page: number) => void }> = ({ onOpenPdf }) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyCitation = (ref: AcademicReference) => {
    let citation = `${ref.authors} (${ref.year}). ${ref.title}.`;
    if (ref.publication) citation += ` ${ref.publication}.`;
    if (ref.volumeIssue) citation += ` ${ref.volumeIssue}.`;
    if (ref.url) citation += ` ${ref.url}`;

    navigator.clipboard.writeText(citation).then(() => {
      setCopiedId(ref.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
      <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Tài liệu tham khảo · Trang 11-12 PDF
          </span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Danh mục 10 nguồn tài liệu tham khảo chính thức (REFERENCE)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Đầy đủ 10 nguồn học thuật được trích dẫn trong file PDF môn Kinh tế chính trị Mác – Lênin (MLN122). Hỗ trợ mở liên kết gốc và sao chép định dạng APA.
        </p>
      </div>

      <div className="space-y-4">
        {ACADEMIC_REFERENCES.map((ref) => {
          const isCopied = copiedId === ref.id;

          return (
            <div
              key={ref.id}
              className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start justify-between gap-4 group"
            >
              <div className="flex-1 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold font-mono text-blue-600 dark:text-blue-400 text-sm">
                    [{ref.id}]
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {ref.authors} ({ref.year}).
                  </span>
                </div>

                <div className="text-slate-800 dark:text-slate-200 font-medium italic">
                  {ref.title}.
                </div>

                {ref.publication && (
                  <div className="text-slate-600 dark:text-slate-400">
                    {ref.publication} {ref.volumeIssue ? `· ${ref.volumeIssue}` : ''}
                  </div>
                )}

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                  <strong>Nội dung trích dẫn:</strong> {ref.summary}
                </p>

                {/* PDF cited pages badges */}
                <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400">
                  <span>Trang trích dẫn trong PDF:</span>
                  {ref.pdfPagesCited.map((p) => (
                    <button
                      key={p}
                      onClick={() => onOpenPdf?.(p)}
                      className="text-blue-600 dark:text-blue-400 font-mono hover:underline"
                    >
                      Tr.{p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                <button
                  onClick={() => handleCopyCitation(ref)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
                    isCopied
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                  title="Sao chép trích dẫn chuẩn APA"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Đã chép' : 'Chép trích dẫn'}</span>
                </button>

                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px] font-medium hover:bg-blue-100 transition-colors"
                  >
                    <span>Mở nguồn gốc</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
