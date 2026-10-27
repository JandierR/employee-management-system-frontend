import { useRef, type SubmitEventHandler } from 'react';
import ModalWrapper from './ModalWrapper';
import type { Department } from '../Types';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: (close: boolean) => void;
  onAdd: (department: Department) => void;
  myError: string;
  setError: (error: string) => void;
  existingDepartments: Department[];
}
export default function DepartmentModal({
  isOpen,
  onClose,
  onAdd,
  setError,
  myError,
  existingDepartments,
}: DepartmentModalProps) {
  const deparmentName = useRef<HTMLInputElement>(null);
  const deparmentDescription = useRef<HTMLTextAreaElement>(null);

  const handleSave: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const enteredDeparmentName = deparmentName.current?.value;
    const enteredDepartmentDescription = deparmentDescription.current?.value;
    if (
      enteredDeparmentName?.length === 0 ||
      enteredDepartmentDescription?.length === 0
    ) {
      setError('Empty fields detected. Please enter a value.');
      return;
    }
    onAdd({
      name: enteredDeparmentName ?? '',
      description: enteredDepartmentDescription ?? '',
    });
    onClose(false);
  };

  return (
    <ModalWrapper
      title="Add new Department"
      onClose={() => {
        onClose(false);
      }}>
      {/* Form Body */}
      <form onSubmit={handleSave} className="p-6 space-y-4">
        {/* Department Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Department Name
          </label>
          <input
            type="text"
            ref={deparmentName}
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
            ref={deparmentDescription}
            rows={4}
            placeholder="Provide a short overview of this department's responsibilities..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
          />
        </div>

        {myError && <p className="text-red-500 mt-1">{myError}</p>}

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
            // onClick={handleSave}
            className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Add Department
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
