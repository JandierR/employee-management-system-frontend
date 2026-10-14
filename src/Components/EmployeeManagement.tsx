import EmployeeTable from './EmployeeTable';
import type { Employees } from '../Types';
import EmployeeManagementTop from './EmployeeManagementTop';
import TableFooter from './TableFooter';

export default function EmployeeManagement() {
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
    /*Here I need to check how to fix this section with id employees, because it shouldn't be just employees, but also departments */
    <section id="employees" className="p-8">
      {/* Page title and Add button */}
      <EmployeeManagementTop />

      {/* Employee table */}
      <EmployeeTable employeeList={employeeList} />
      {/* Table footer */}
      <TableFooter employeeList={employeeList} />
    </section>
  );
}
