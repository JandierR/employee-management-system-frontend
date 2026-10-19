import type { Department, Employees } from '../Types';

interface TableFooterProps {
  list: Employees[] | Department[];
  dashboardType: string;
}

export default function TableFooter({ list, dashboardType }: TableFooterProps) {
  if (dashboardType === 'employee') {
    return (
      <p className="mt-4 text-sm text-gray-500">
        Showing {list.length} employees
      </p>
    );
  }

  return (
    <p className="mt-4 text-sm text-gray-500">
      Showing {list.length} departments
    </p>
  );
}
