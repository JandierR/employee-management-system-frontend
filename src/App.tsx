import { useState } from 'react';
import EmployeeManagement from './Components/EmployeeManagement';
import Sidebar from './Components/Sidebar';
import NoSelected from './Components/NoSelected';
import DepartmentManagement from './Components/DepartmentManagement';
import EmployeeModal from './Components/EmployeeModal';
import DepartmentModal from './Components/DepartmentModal';
import type { Department, Employee } from './Types';

interface DashboardState {
  dashboardId: number;
  dashboards: { dashboardId: number; dashboardName: string }[];
  employees: Employee[];
  deparments: Department[];
}

function App() {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isDepartmentModalOpen, setisDepartmentModalOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardState>({
    dashboardId: 0,
    dashboards: [
      { dashboardId: 1, dashboardName: 'Employees' },
      { dashboardId: 2, dashboardName: 'Departments' },
    ],

    //Here employees and departments are stored when adding a new entry
    employees: [],
    deparments: [],
  });

  const [error, setError] = useState('');

  function showSelectedDashboard(selectedDashboardId: number) {
    setSelectedDashboard((prevState) => ({
      ...prevState,
      dashboardId: selectedDashboardId,
      //Quizas aqui hay que pasar ...prevState a los arrays, employees y departments.
      //Lo digo, porque ahorita pienso que el ...prevState del principio en esta funcion,
      // hace eso, pero quizas no
    }));
  }

  function handleDeleteDepartment(id: number) {
    const updatedDepartments: Department[] =
      selectedDashboard.deparments.filter((department) => department.id !== id);

    setSelectedDashboard((prevState) => ({
      ...prevState,
      deparments: [...updatedDepartments],
    }));
  }

  function handleDeleteEmployee(id: number) {
    const updatedEmployees: Employee[] = selectedDashboard.employees.filter(
      (employee) => employee.id !== id,
    );

    setSelectedDashboard((prevState) => ({
      ...prevState,
      employees: [...updatedEmployees],
    }));
  }

  function handleSaveDepartment(department: Department) {
    setSelectedDashboard((prevState) => {
      const newDepartment: Department = { ...department };
      return {
        ...prevState,
        deparments: [...prevState.deparments, newDepartment],
      };
    });
    setisDepartmentModalOpen(false);
  }

  function handleSaveEmployee(employee: Employee) {
    setSelectedDashboard((prevState) => {
      const newEmployee: Employee = { ...employee };
      return {
        ...prevState,
        employees: [...prevState.employees, newEmployee],
      };
    });

    setIsEmployeeModalOpen(false);
  }

  function goBackNoSelectedView() {
    setSelectedDashboard((prevState) => ({
      ...prevState,
      dashboardId: 0,
    }));
  }

  function addNewEmployee() {
    //Se cambia el state para abrir un modal que me permita tener un mini formulario con los inputs para crear el employee
    setIsEmployeeModalOpen(true);
  }
  function addNewDepartment() {
    //Se cambia el state para abrir un modal que me permita tener un mini formulario con los inputs para crear el employee
    setisDepartmentModalOpen(true);
  }

  //Here I'll show the selectedDashboard either Employees or departments, when id has a number value 1 or 2 (almost done)
  let content = <NoSelected />;
  //Almost done because now I need to see how to check what id I'm showing, not just <EmployeeManagement />
  if (selectedDashboard.dashboardId === 1)
    content = (
      <EmployeeManagement
        onAddEmployee={addNewEmployee}
        employeeList={selectedDashboard.employees}
        onDelete={handleDeleteEmployee}
      />
    );
  else if (selectedDashboard.dashboardId === 2)
    content = (
      <DepartmentManagement
        onAddDepartment={addNewDepartment}
        departmentList={selectedDashboard.deparments}
        onDelete={handleDeleteDepartment}
      />
    );

  return (
    <main className="flex min-h-screen  bg-gray-50">
      <Sidebar
        goBack={goBackNoSelectedView}
        showDashboard={showSelectedDashboard}
        dashboards={selectedDashboard.dashboards}
      />
      <main className="min-w-0 flex-1">
        {content}
        {isEmployeeModalOpen ? (
          <EmployeeModal
            isOpen={isEmployeeModalOpen}
            onClose={() => {
              (setIsEmployeeModalOpen(false), setError(''));
            }}
            onAdd={handleSaveEmployee}
            error={error}
            setError={setError}
            existingEmployees={selectedDashboard.employees}
          />
        ) : null}

        {isDepartmentModalOpen ? (
          <DepartmentModal
            isOpen={isDepartmentModalOpen}
            onClose={() => {
              (setisDepartmentModalOpen(false), setError(''));
            }}
            onAdd={handleSaveDepartment}
            setError={setError}
            myError={error}
            existingDepartments={selectedDashboard.deparments}
          />
        ) : null}
        {/* EmployeeManagment will be shown when Employees button in the Sidebar Main Meny is selected */}
        {/* <EmployeeManagement /> */}
      </main>
    </main>
  );
}

export default App;
