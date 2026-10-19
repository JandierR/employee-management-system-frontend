import EmployeeTable from './EmployeeTable';
import type { Employee } from '../Types';
import ReusableManagementTop from './ReusableDashboardTop';
import TableFooter from './TableFooter';
import Header from './Header';

interface EmployeeManagementProps {
  onAddEmployee: () => void;
  employeeList: Employee[];
}

export default function EmployeeManagement({
  onAddEmployee,
  employeeList,
}: EmployeeManagementProps) {
  return (
    <>
      <Header text="/ employee" />
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
    </>
  );
}
