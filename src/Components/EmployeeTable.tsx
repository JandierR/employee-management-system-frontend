import type { Employee } from '../Types';
import { useRef } from 'react';

interface EmployeeTableProps {
  employeeList: Employee[];
  onDelete: (id: number) => void;
  editModeId: number | null;
  updateEmployee: (employee: Employee) => void;
  startEditing: (id: number) => void;
}

export default function EmployeeTable({
  employeeList,
  onDelete,
  editModeId,
  updateEmployee,
  startEditing,
}: EmployeeTableProps) {
  const updatedEmployeeName = useRef<HTMLInputElement>(null);
  const updatedEmployeeEmail = useRef<HTMLInputElement>(null);
  const updatedEmployeeDepartment = useRef<HTMLInputElement>(null);
  const updatedEmployeePosition = useRef<HTMLInputElement>(null);
  const updatedEmployeeStatus = useRef<HTMLSelectElement>(null);

  function handleEmployeeUpdate(currentId: number) {
    const enteredUpdatedEmployeeName = updatedEmployeeName.current?.value;
    const enteredUpdatedEmployeeEmail = updatedEmployeeEmail.current?.value;
    const enteredUpdatedEmployeeDepartment =
      updatedEmployeeDepartment.current?.value;
    const enteredUpdatedEmployeePosition =
      updatedEmployeePosition.current?.value;
    const enteredUpdatedEmployeeStatus = updatedEmployeeStatus.current?.value;

    updateEmployee({
      id: currentId,
      name: enteredUpdatedEmployeeName ?? '',
      email: enteredUpdatedEmployeeEmail ?? '',
      department: enteredUpdatedEmployeeDepartment ?? '',
      position: enteredUpdatedEmployeePosition ?? '',
      status: enteredUpdatedEmployeeStatus ?? '',
    });
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-200 border-collapse text-left">
        <thead className="bg-gray-50/75 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[30%]">
              Employee
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[20%]">
              Department
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[25%]">
              Position
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 w-[12%]">
              Status
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 w-[13%]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {employeeList.map((employee) => (
            <tr
              key={employee.id}
              className="transition hover:bg-gray-50/50 items-center">
              {/* Employee Name & Email Column */}
              <td className="px-6 py-3 vertical-align-middle">
                {editModeId === employee.id ? (
                  <div className="flex flex-col gap-1.5 max-w-xs">
                    <input
                      type="text"
                      ref={updatedEmployeeName}
                      defaultValue={employee.name}
                      placeholder="e.g. Sofia Ramirez"
                      className="w-full px-2.5 py-1.5 border bg-slate-100 border-slate-200 rounded-lg text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                    <input
                      type="email"
                      ref={updatedEmployeeEmail}
                      defaultValue={employee.email}
                      placeholder="e.g. sofia.ramirez@example.com"
                      className="w-full px-2.5 py-1.5 border bg-slate-100 border-slate-200 rounded-lg text-xs text-slate-600 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-gray-900">
                      {employee.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {employee.email}
                    </p>
                  </>
                )}
              </td>

              {/* Department Column */}
              <td className="px-6 py-3 vertical-align-middle">
                {editModeId === employee.id ? (
                  <input
                    type="text"
                    ref={updatedEmployeeDepartment}
                    defaultValue={employee.department}
                    placeholder="e.g. Engineering"
                    className="w-full max-w-45 px-2.5 py-1.5 border bg-slate-100 border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                ) : (
                  <p className="text-sm text-gray-600">{employee.department}</p>
                )}
              </td>

              {/* Position Column */}
              <td className="px-6 py-3 vertical-align-middle">
                {editModeId === employee.id ? (
                  <input
                    type="text"
                    ref={updatedEmployeePosition}
                    defaultValue={employee.position}
                    placeholder="e.g. Software Engineer"
                    className="w-full max-w-55 px-2.5 py-1.5 border bg-slate-100 border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                ) : (
                  <p className="text-sm text-gray-600">{employee.position}</p>
                )}
              </td>

              {/* Status Column */}
              <td className="px-6 py-3 vertical-align-middle">
                {editModeId === employee.id ? (
                  <select
                    ref={updatedEmployeeStatus}
                    defaultValue={employee.status.toLowerCase()}
                    className="w-full max-w-27.5 px-2 py-1.5 border bg-slate-100 border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex rounded-full  px-2.5 py-0.5 text-xs font-medium ${
                      employee.status?.toLowerCase() === 'active'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}>
                    {employee.status}
                  </span>
                )}
              </td>

              {/* Actions Column */}
              <td className="px-6 py-3 text-right whitespace-nowrap vertical-align-middle">
                {editModeId === employee.id ? (
                  <button
                    type="button"
                    onClick={() => handleEmployeeUpdate(employee.id)}
                    className="mr-3.5 text-sm font-semibold text-blue-600 transition hover:text-blue-800">
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => startEditing(employee.id)}
                    className="mr-3.5 text-sm font-medium text-blue-600 transition hover:text-blue-800">
                    Edit
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onDelete(employee.id)}
                  className="text-sm font-medium text-red-600 transition hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
