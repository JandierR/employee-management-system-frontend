import ModalWrapper from './ModalWrapper';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: (close: boolean) => void;
}
export default function DepartmentModal({
  isOpen,
  onClose,
}: DepartmentModalProps) {
  return (
    <ModalWrapper title="Add new Department" onClose={() => onClose(false)}>
      {/* Form Body */}
      <form className="p-6 space-y-4">
        {/* Department Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Department Name
          </label>
          <input
            type="text"
            placeholder="e.g. Engineering"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Department Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Provide a short overview of this department's responsibilities..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
          <button
            onClick={() => onClose(false)}
            type="button"
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Add Department
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
