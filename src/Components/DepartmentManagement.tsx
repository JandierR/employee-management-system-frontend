import type { Department } from '../Types';
import ReusableManagementTop from './ReusableDashboardTop';
import TableFooter from './TableFooter';
import DepartmentTable from './DepartmentTable';
import Header from './Header';

interface DeparmenteManagementProps {
  onAddDepartment: () => void;
  departmentList: Department[];
  onDelete: (id: number) => void;
  editModeId: number | null;
  updateDepartment: (department: Department) => void;
  startEditing: (id: number) => void;
}

export default function DepartmentManagement({
  onAddDepartment,
  departmentList,
  onDelete,
  editModeId,
  updateDepartment,
  startEditing,
}: DeparmenteManagementProps) {
  // const departmentList: Departments[] = [
  //   {
  //     id: 1,
  //     name: 'Engineering',
  //     description: 'Department for all Engineering employees',
  //   },
  // ];

  return (
    <>
      <Header text="/ deparments" />
      <section id="departments" className="p-8">
        {/* Page title and Add button */}
        <ReusableManagementTop
          onAddDepartment={onAddDepartment}
          title="Departments"
          description="Manage your department in one place."
          buttonText="+ Add Department"
        />

        {/* Employee table */}
        <DepartmentTable
          departmentList={departmentList}
          onDelete={onDelete}
          editModeId={editModeId}
          updateDepartment={updateDepartment}
          startEditing={startEditing}
        />
        {/* Table footer */}
        <TableFooter list={departmentList} dashboardType="department" />
      </section>
    </>
  );
}
