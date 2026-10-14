import type { Employees } from '../Types';

interface TableFooterProps {
  employeeList: Employees[];
}

export default function TableFooter({ employeeList }: TableFooterProps) {
  return (
    <p className="mt-4 text-sm text-gray-500">
      Showing {employeeList.length} employees
    </p>
  );
}
