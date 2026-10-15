import EmployeeTable from './EmployeeTable';
import type { Employees } from '../Types';
import ReusableManagementTop from './ReusableDashboardTop';
import TableFooter from './TableFooter';

interface EmployeeManagementProps {
  onAddEmployee: () => void;
}

export default function EmployeeManagement({
  onAddEmployee,
}: EmployeeManagementProps) {
  const employeeList: Employees[] = [
    {
      id: 1,
      name: 'Sofia Ramirez',
      email: 'sofia.ramirez@example.com',
      department: 'Engineering',
      position: 'Software Engineer',
      status: 'Active',
    },
  ];

  return (
    <section id="employees" className="p-8">
      {/* Page title and Add button */}
      <ReusableManagementTop
        title="Employees"
        description="Manage your employees in one place."
        buttonText="+ Add Employee"
        onAddEmployee={onAddEmployee}
      />

      {/* Employee table */}
      <EmployeeTable employeeList={employeeList} />
      {/* Table footer */}
      <TableFooter list={employeeList} dashboardType="employee" />
    </section>
  );
}
