import type { Employee } from '../Types';

interface EmployeeTableProps {
  employeeList: Employee[];
  onDelete: (id: number) => void;
}

export default function EmployeeTable({
  employeeList,
  onDelete,
}: EmployeeTableProps) {
  console.log(employeeList);
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      {/*I can take this table and make it a reusable component for upcoming entities like departments*/}
      <table className="w-full min-w-200 border-collapse text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Employee
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Department
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Position
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {/*Here I need to check how to code fix this part when we have dinamic data */}
          {employeeList.map((employee) => (
            <tr key={employee.id} className="transition hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-gray-900">
                  {employee.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">{employee.email}</p>
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {employee.department}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {employee.position}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                    employee.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                  {employee.status}
                </span>
              </td>

              <td className="px-6 py-4 text-right whitespace-nowrap">
                <button
                  type="button"
                  className="mr-3 text-sm font-medium text-blue-600 transition hover:text-blue-800">
                  Edit
                </button>

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
