import { useState } from 'react';
import EmployeeManagement from './Components/EmployeeManagement';
import Sidebar from './Components/Sidebar';
import NoSelected from './Components/NoSelected';
import DepartmentManagement from './Components/DepartmentManagement';
import EmployeeModal from './Components/EmployeeModal';
import DepartmentModal from './Components/DepartmentModal';
import type { Department, Employees } from './Types';

interface DashboardState {
  dashboardId: number;
  dashboards: { dashboardId: number; dashboardName: string }[];
  employees: Employees[];
  deparments: Department[];
}

function App() {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isDepartmentModalOpen, setisDepartmentModalOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<DashboardState>(
    {
      dashboardId: 0,
      dashboards: [
        { dashboardId: 1, dashboardName: 'Employees' },
        { dashboardId: 2, dashboardName: 'Departments' },
      ],
      employees: [],
      deparments: [],
    },
    // console.log(),
  );
  //Quiero ver como hacer para imprimir departments para ver que cuando agrego un department, en realidad se guarde en ese array
  //Aun asi, tambien se puede verificar visualmente en el dashboard o tabla de empleados

  console.log(selectedDashboard.deparments);

  function showSelectedDashboard(selectedDashboardId: number) {
    setSelectedDashboard((prevState) => ({
      ...prevState,
      dashboardId: selectedDashboardId,
      //Quizas aqui hay que pasar ...prevState a los arrays, employees y departments.
      //Lo digo, porque ahorita pienso que el ...prevState del principio en esta funcion,
      // hace eso, pero quizas no
    }));
  }

  function handleSaveDepartments(department: Department) {
    setSelectedDashboard((prevState) => {
      const newDepartment: Department = { ...department };
      return {
        ...prevState,
        deparments: [...prevState.deparments, newDepartment],
      };
    });
    setisDepartmentModalOpen(false);
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
    content = <EmployeeManagement onAddEmployee={addNewEmployee} />;
  else if (selectedDashboard.dashboardId === 2)
    content = (
      <DepartmentManagement
        onAddDepartment={addNewDepartment}
        departmentList={selectedDashboard.deparments}
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
            onClose={() => setIsEmployeeModalOpen(false)}
          />
        ) : null}

        {isDepartmentModalOpen ? (
          <DepartmentModal
            isOpen={isDepartmentModalOpen}
            onClose={() => setisDepartmentModalOpen(false)}
            onAdd={handleSaveDepartments}
          />
        ) : null}
        {/* EmployeeManagment will be shown when Employees button in the Sidebar Main Meny is selected */}
        {/* <EmployeeManagement /> */}
      </main>
    </main>
  );
}

export default App;
