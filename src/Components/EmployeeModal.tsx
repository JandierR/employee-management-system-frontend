import { useRef, type SubmitEventHandler } from 'react';
import ModalWrapper from './ModalWrapper';
import type { Employee, Department } from '../Types';

interface EmployeeModalProps {
  departmentList: Department[];
  isOpen: boolean;
  onClose: (close: boolean) => void;
  onAdd: (employee: Employee) => void;
  error: string;
  setError: (error: string) => void;
  existingEmployees: Employee[];
}
//isOpen is not useful right now, I think
export default function EmployeeModal({
  isOpen,
  onClose,
  onAdd,
  error,
  setError,
  departmentList,
  existingEmployees,
}: EmployeeModalProps) {
  const employeeFirstName = useRef<HTMLInputElement>(null);
  const employeeLastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const department = useRef<HTMLSelectElement>(null);
  const position = useRef<HTMLInputElement>(null);
  const status = useRef<HTMLSelectElement>(null);

  const handleSave: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const enteredEmployeeFirstName = employeeFirstName.current?.value;
    const enteredEmployeeLastName = employeeLastName.current?.value;
    const enteredEmail = email.current?.value;
    const enteredDepartment = department.current?.value;
    const enteredPosition = position.current?.value;
    const enteredStatus = status.current?.value;

    if (
      enteredEmployeeFirstName?.length === 0 ||
      enteredEmployeeLastName?.length === 0 ||
      enteredEmail?.length === 0 ||
      enteredDepartment === undefined ||
      enteredPosition?.length === 0 ||
      enteredStatus?.length === 0
    ) {
      setError('Empty fields. Please enter a value.');
      return;
    }

    const myDepartment = departmentList.find(
      (department) => department.name === enteredDepartment,
    );

    onAdd({
      firstName: enteredEmployeeFirstName ?? '',
      lastName: enteredEmployeeLastName ?? '',
      email: enteredEmail ?? '',
      departmentId: myDepartment?.id ?? undefined,
      position: enteredPosition ?? '',
      status: enteredStatus ?? '',
    });
    onClose(false);
  };

  return (
    <ModalWrapper title="Add new Employee" onClose={() => onClose(false)}>
      {/* Form Body */}
      <form onSubmit={handleSave} className="p-6 space-y-4">
        {/* Employee Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              First Name
            </label>
            <input
              type="text"
              ref={employeeFirstName}
              placeholder="e.g. Jandier"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              ref={employeeLastName}
              placeholder="e.g. Rojas"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            ref={email}
            placeholder="e.g. jandier.ro@example.com"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Grid Layout for Department and Position */}
        <div className="grid grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Department
            </label>
            <select
              ref={department}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600">
              {departmentList.map((department) => (
                <option key={department.id}>{department.name}</option>
              ))}
            </select>
          </div>

          {/* Position */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Position
            </label>
            <input
              type="text"
              ref={position}
              placeholder="e.g. Software Engineer"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Status Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Status
          </label>
          <select
            ref={status}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        {error && <p className="text-red-500 mt-1">{error}</p>}

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
            Add Employee
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
