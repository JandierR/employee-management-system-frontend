import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeManagement from './Components/EmployeeManagement';
import Sidebar from './Components/Sidebar';
import NoSelected from './Components/NoSelected';
import DepartmentManagement from './Components/DepartmentManagement';
import EmployeeModal from './Components/EmployeeModal';
import DepartmentModal from './Components/DepartmentModal';
import type { Department, Employee } from './Types';
// import ConnectionTest from './Test/ConnectionTest';

interface DashboardState {
  dashboardId: number;
  dashboards: { dashboardId: number; dashboardName: string }[];
  employees: Employee[];
  departments: Department[];
}
interface BackendDataState {
  employees: Employee[];
  departments: Department[];
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
    departments: [],
  });

  useEffect(() => {
    Promise.all([
      axios.get<Employee[]>('http://localhost:8080/api/employees'),
      axios.get<Department[]>('http://localhost:8080/api/departments'),
    ])
      .then(([employeesResponse, departmentsResponse]) => {
        // Save the JSON "message" string from Spring Boot into our state
        setSelectedDashboard((prevState) => {
          return {
            ...prevState,
            employees: employeesResponse.data,

            departments: departmentsResponse.data,
          };
        });
      })
      .catch((err) => {
        console.error('Connection failed:', err);
        setError('Could not connect to Spring Boot.');
      });
  }, []); // The empty array ensures this runs exactly once on load

  const [error, setError] = useState('');
  const [editModeId, setEditModeId] = useState<number | null>(null);

  function handleUpdateDepartment(department: Department) {
    const deparmentIndex: number = selectedDashboard.departments.findIndex(
      (myDepartment) => myDepartment.id === department.id,
    );

    setSelectedDashboard((prevState) => {
      selectedDashboard.departments[deparmentIndex] = { ...department };

      return {
        ...prevState,
        departments: [...prevState.departments],
      };
    });
    setEditModeId(null);
  }

  function handleSaveDepartment(department: Department) {
    axios
      .post<Department>('http://localhost:8080/api/departments', department)
      .then((response) => {
        // The backend returns the saved department object (with its new ID)
        const savedDepartment = response.data;

        // 4. Update your main dashboard state to instantly show the new row
        setSelectedDashboard((prevState) => {
          return {
            ...prevState,
            // Keep existing departments and append the new one
            departments: [...prevState.departments, savedDepartment],
          };
        });
      })
      .catch((error) => {
        console.error('Error creating department:', error);
      });
    setisDepartmentModalOpen(false);
  }

  function handleUpdateEmployee(employee: Employee) {
    const employeeIndex: number = selectedDashboard.employees.findIndex(
      (myEmployee) => myEmployee.id === employee.id,
    );

    setSelectedDashboard((prevState) => {
      selectedDashboard.employees[employeeIndex] = { ...employee };

      return {
        ...prevState,
        employees: [...prevState.employees],
      };
    });
    setEditModeId(null);
  }

  function handleSaveEmployee(employee: Employee) {
    axios
      .post<Employee>('http://localhost:8080/api/employees', employee)
      .then((response) => {
        // The backend returns the saved department object (with its new ID)
        const savedEmployee = response.data;

        // 4. Update your main dashboard state to instantly show the new row
        setSelectedDashboard((prevState) => {
          return {
            ...prevState,
            // Keep existing departments and append the new one
            employees: [...prevState.employees, savedEmployee],
          };
        });
      })
      .catch((error) => {
        console.error('Error creating department:', error);
      });
    setIsEmployeeModalOpen(false);
  }

  function showSelectedDashboard(selectedDashboardId: number) {
    setSelectedDashboard((prevState) => ({
      ...prevState,
      dashboardId: selectedDashboardId,
      //Quizas aqui hay que pasar ...prevState a los arrays, employees y departments.
      //Lo digo, porque ahorita pienso que el ...prevState del principio en esta funcion,
      // hace eso, pero quizas no
    }));

    setEditModeId(0);
  }

  function handleDeleteDepartment(id: number) {
    const updatedDepartments: Department[] =
      selectedDashboard.departments.filter(
        (department) => department.id !== id,
      );

    setSelectedDashboard((prevState) => ({
      ...prevState,
      departments: [...updatedDepartments],
    }));
  }

  function startEditing(currentId: number) {
    setEditModeId(currentId);
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
        updateEmployee={handleUpdateEmployee}
        editModeId={editModeId}
        startEditing={startEditing}
      />
    );
  else if (selectedDashboard.dashboardId === 2)
    content = (
      <DepartmentManagement
        onAddDepartment={addNewDepartment}
        departmentList={selectedDashboard.departments}
        onDelete={handleDeleteDepartment}
        editModeId={editModeId}
        updateDepartment={handleUpdateDepartment}
        startEditing={startEditing}
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
            departmentList={selectedDashboard.departments}
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
            existingDepartments={selectedDashboard.departments}
          />
        ) : null}
        {/* EmployeeManagment will be shown when Employees button in the Sidebar Main Meny is selected */}
        {/* <EmployeeManagement /> */}
        {/* <ConnectionTest /> */}
      </main>
    </main>
  );
}

export default App;
