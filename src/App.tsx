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
    employees: [],
    departments: [],
  });

  useEffect(() => {
    Promise.all([
      axios.get<Employee[]>('http://localhost:8080/api/employees'),
      axios.get<Department[]>('http://localhost:8080/api/departments'),
    ])
      .then(([employeesResponse, departmentsResponse]) => {
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
  }, []);

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
        const savedDepartment = response.data;

        setSelectedDashboard((prevState) => {
          return {
            ...prevState,
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
        const savedEmployee = response.data;

        setSelectedDashboard((prevState) => {
          return {
            ...prevState,
            employees: [...prevState.employees, savedEmployee],
          };
        });
      })
      .catch((error) => {
        console.error('Error creating Employee:', error);
      });
    setIsEmployeeModalOpen(false);
  }

  function showSelectedDashboard(selectedDashboardId: number) {
    setSelectedDashboard((prevState) => ({
      ...prevState,
      dashboardId: selectedDashboardId,
    }));

    setEditModeId(0);
  }

  function handleDeleteDepartment(id: number) {
    axios
      .delete(`http://localhost:8080/api/departments/${id}`)
      .then(() => {
        setSelectedDashboard((prev) => ({
          ...prev,
          departments: prev.departments.filter((d) => d.id !== id),
        }));
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          alert(err.response.data);
        } else {
          console.error('Delete failed:', err);
          alert('An unexpected error occurred while deleting.');
        }
      });
  }

  function startEditing(currentId: number) {
    setEditModeId(currentId);
  }

  function handleDeleteEmployee(id: number) {
    axios
      .delete(`http://localhost:8080/api/employees/${id}`)
      .then(() => {
        setSelectedDashboard((prev) => ({
          ...prev,
          employees: prev.employees.filter((e) => e.id !== id),
        }));
      })
      .catch((err) => {
        console.error('Delete failed:', err);
        alert('An unexpected error occurred while deleting.');
      });
  }

  function goBackNoSelectedView() {
    setSelectedDashboard((prevState) => ({
      ...prevState,
      dashboardId: 0,
    }));
  }

  function addNewEmployee() {
    setIsEmployeeModalOpen(true);
  }
  function addNewDepartment() {
    setisDepartmentModalOpen(true);
  }

  let content = <NoSelected />;

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
