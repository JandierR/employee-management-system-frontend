import EmployeeTable from './EmployeeTable';
import type { Departments } from '../Types';
import ReusableManagementTop from './ReusableDashboardTop';
import TableFooter from './TableFooter';
import DepartmentTable from './DepartmentTable';

export default function DepartmentManagement() {
  const departmentList: Departments[] = [
    {
      id: 1,
      name: 'Engineering',
      description: 'blablabanababa',
    },
  ];

  return (
    <section id="departments" className="p-8">
      {/* Page title and Add button */}
      <ReusableManagementTop
        title="Departments"
        description="Manage your department in one place."
        buttonText="+ Add Department"
      />

      {/* Employee table */}
      <DepartmentTable departmentList={departmentList} />
      {/* Table footer */}
      <TableFooter list={departmentList} dashboardType="employee" />
    </section>
  );
}
