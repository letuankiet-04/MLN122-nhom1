import React from 'react';
import { ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';

export const Footer: React.FC<{ onOpenPdf?: (page: number) => void }> = ({ onOpenPdf }) => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-base font-black tracking-tight text-slate-900 dark:text-slate-100">
            ECONVERSE
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md leading-relaxed">
            Nền tảng học tập tương tác môn Kinh tế chính trị Mác – Lênin (MLN122). Bám sát 100% nội dung chương trình theo giáo trình chuẩn của Bộ Giáo dục và Đào tạo cùng 10 tài liệu tham khảo chính thức.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <button
            onClick={() => onOpenPdf?.(1)}
            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
          >
            <span>Tài liệu gốc MLN122 (12 trang)</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <span className="hidden sm:inline">·</span>
          <span>Bảo lưu bản quyền học thuật © 2026</span>
        </div>
      </div>
    </footer>
  );
};
