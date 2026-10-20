import React, { useState } from 'react';
import { StudyNote } from '../../types';
import { Plus, Trash2, Search, Download, ExternalLink, Bookmark, Edit3, Tag } from 'lucide-react';

interface NotesManagerProps {
  notes: StudyNote[];
  onSaveNotes: (notes: StudyNote[]) => void;
  bookmarks: string[];
  onToggleBookmark: (bookmarkId: string) => void;
  onOpenPdf?: (page: number) => void;
}

export const NotesManager: React.FC<NotesManagerProps> = ({
  notes,
  onSaveNotes,
  bookmarks,
  onToggleBookmark,
  onOpenPdf
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newModuleId, setNewModuleId] = useState<string>('module-01');
  const [newPage, setNewPage] = useState<number>(1);

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newNote: StudyNote = {
      id: `note-${Date.now()}`,
      moduleId: newModuleId,
      pdfPage: Number(newPage),
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: ['Tự học', 'MLN122'],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    onSaveNotes([newNote, ...notes]);
    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  const handleDeleteNote = (noteId: string) => {
    onSaveNotes(notes.filter((n) => n.id !== noteId));
  };

  const handleExportNotes = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'ECONVERSE_Study_Notes.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Sổ tay Ghi chú & Đánh dấu học tập (Study Notes)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Lưu lại những luận điểm quan trọng, liên kết trực tiếp với trang tài liệu PDF gốc.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm ghi chú</span>
          </button>

          {notes.length > 0 && (
            <button
              onClick={handleExportNotes}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium transition-colors"
              title="Xuất ghi chú ra tệp JSON"
            >
              <Download className="w-4 h-4" />
              <span>Xuất ghi chú</span>
            </button>
          )}
        </div>
      </div>

      {/* Creation Modal / Inline Drawer */}
      {isCreating && (
        <form onSubmit={handleCreateNote} className="my-4 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">
            Tạo ghi chú mới:
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] text-slate-500 block mb-1">Tiêu đề ghi chú:</label>
              <input
                type="text"
                placeholder="Ví dụ: Phân biệt giá trị xã hội và giá cả thị trường..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[11px] text-slate-500 block mb-1">Thuộc quy luật:</label>
                <select
                  value={newModuleId}
                  onChange={(e) => setNewModuleId(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden"
                >
                  <option value="module-01">Khái quát</option>
                  <option value="module-02">Quy luật giá trị</option>
                  <option value="module-03">Quy luật cung – cầu</option>
                  <option value="module-04">Quy luật cạnh tranh</option>
                  <option value="module-05">Quy luật lưu thông tiền tệ</option>
                  <option value="module-06">Mối quan hệ 4 quy luật</option>
                  <option value="module-07">Kết luận & Nhà nước</option>
                </select>
              </div>

              <div className="w-24">
                <label className="text-[11px] text-slate-500 block mb-1">Trang PDF:</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={newPage}
                  onChange={(e) => setNewPage(Number(e.target.value))}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-500 block mb-1">Nội dung ghi chú & Luận điểm:</label>
            <textarea
              rows={4}
              placeholder="Ghi lại các ý tưởng, công thức hoặc dẫn chứng cần ghi nhớ..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full p-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500 leading-relaxed"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              Lưu ghi chú
            </button>
          </div>
        </form>
      )}

      {/* Search Bar */}
      <div className="relative my-4">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Tìm kiếm nhanh trong các ghi chú của bạn..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-xs">
          {notes.length === 0
            ? 'Bạn chưa có ghi chú nào. Nhấn "Thêm ghi chú" để lưu lại kiến thức quan trọng!'
            : 'Không tìm thấy ghi chú nào khớp với từ khóa tìm kiếm.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h5 className="font-bold text-slate-900 dark:text-slate-100 text-xs line-clamp-1">
                    {note.title}
                  </h5>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    title="Xóa ghi chú"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {note.content}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 mt-3 border-t border-slate-200/50 dark:border-slate-800">
                <span>{new Date(note.createdAt).toLocaleDateString('vi-VN')}</span>
                {note.pdfPage && (
                  <button
                    onClick={() => onOpenPdf?.(note.pdfPage!)}
                    className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400"
                  >
                    Trang {note.pdfPage} PDF <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
