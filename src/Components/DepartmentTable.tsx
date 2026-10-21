import { useRef } from 'react';
import type { Department } from '../Types';

interface DepartmentTableProps {
  departmentList: Department[];
  onDelete: (id: number) => void;
  editModeId: number | null;
  updateDepartment: (deparment: Department) => void;
  startEditing: (id: number) => void;
}

export default function DepartmentTable({
  departmentList,
  onDelete,
  editModeId,
  updateDepartment,
  startEditing,
}: DepartmentTableProps) {
  const updatedDepartmentName = useRef<HTMLInputElement>(null);
  const updatedDepartmentDescription = useRef<HTMLTextAreaElement>(null);

  function handleDepartmentUpdate(currentId: number) {
    const enteredUpdatedDeparmentName = updatedDepartmentName.current?.value;
    const enteredUpdatedDepartmentDescription =
      updatedDepartmentDescription.current?.value;

    updateDepartment({
      id: currentId,
      name: enteredUpdatedDeparmentName ?? '',
      description: enteredUpdatedDepartmentDescription ?? '',
    });
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      {/*I can take this department table and add more fields like ubication...*/}
      <table className="w-full min-w-200 border-collapse text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Department
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Description
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {/*Here I need to check how to code fix this part when we have dinamic data */}
          {departmentList.map((department) => (
            <tr key={department.id} className="transition hover:bg-gray-50">
              <td className="px-6 py-4">
                {editModeId === department.id ? (
                  <input
                    type="text"
                    ref={updatedDepartmentName}
                    defaultValue={department.name}
                    className="w-full px-3 py-2 border bg-slate-100 border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-900">
                    {department.name}
                  </p>
                )}
              </td>
              <td className="px-6 py-4">
                {editModeId === department.id ? (
                  <textarea
                    rows={4}
                    defaultValue={department.description}
                    ref={updatedDepartmentDescription}
                    className="w-full px-3 py-2 border bg-slate-100 border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-900">
                    {department.description}
                  </p>
                )}
              </td>

              <td className="px-6 py-4 text-right whitespace-nowrap">
                {editModeId === department.id ? (
                  <button
                    type="button"
                    onClick={() => handleDepartmentUpdate(department.id)}
                    className="mr-3 text-sm font-medium text-blue-600 transition hover:text-blue-800">
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    key={department.id}
                    onClick={() => startEditing(department.id)}
                    className="mr-3 text-sm font-medium text-blue-600 transition hover:text-blue-800">
                    Edit
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onDelete(department.id)}
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
