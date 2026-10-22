import EmployeeTable from './EmployeeTable';
import type { Employee } from '../Types';
import ReusableManagementTop from './ReusableDashboardTop';
import TableFooter from './TableFooter';
import Header from './Header';

interface EmployeeManagementProps {
  onAddEmployee: () => void;
  employeeList: Employee[];
  onDelete: (id: number) => void;
  editModeId: number | null;
  updateEmployee: (employee: Employee) => void;
  startEditing: (id: number) => void;
}

export default function EmployeeManagement({
  onAddEmployee,
  employeeList,
  onDelete,
  editModeId,
  updateEmployee,
  startEditing,
}: EmployeeManagementProps) {
  return (
    <>
      <Header text="/ employees" />
      <section id="employees" className="p-8">
        {/* Page title and Add button */}
        <ReusableManagementTop
          title="Employees"
          description="Manage your employees in one place."
          buttonText="+ Add Employee"
          onAddEmployee={onAddEmployee}
        />

        {/* Employee table */}
        <EmployeeTable
          employeeList={employeeList}
          onDelete={onDelete}
          updateEmployee={updateEmployee}
          startEditing={startEditing}
          editModeId={editModeId}
        />
        {/* Table footer */}
        <TableFooter list={employeeList} dashboardType="employee" />
      </section>
    </>
  );
}
