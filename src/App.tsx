import { useState } from 'react';
import EmployeeManagement from './Components/EmployeeManagement';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import NoSelected from './Components/NoSelected';

function App() {
  const [selectedDashboard, setSelectedDashboard] = useState({
    dashboardId: 0,
    dashboards: [
      { dashboardId: 1, dashboardName: 'Employees' },
      { dashboardId: 2, dashboardName: 'Departments' },
    ],
  });

  function showSelectedDashboard(selectedDashboardId: number) {
    setSelectedDashboard((prevState) => ({
      ...prevState,
      dashboardId: selectedDashboardId,
    }));
  }

  //Here I'll show the selectedDashboard either Employees or departments, when id has a number value 1 or 2 (almost done)
  let content = <NoSelected />;
  //Almost done because now I need to see how to check what id I'm showing, not just <EmployeeManagement />
  if (selectedDashboard.dashboardId !== 0) content = <EmployeeManagement />;

  if (selectedDashboard)
    return (
      <main className="flex min-h-screen  bg-gray-50">
        <Sidebar
          showDashboard={showSelectedDashboard}
          dashboards={selectedDashboard.dashboards}
        />
        <main className="min-w-0 flex-1">
          <Header />
          {content}
          {/* EmployeeManagment will be shown when Employees button in the Sidebar Main Meny is selected */}
          {/* <EmployeeManagement /> */}
        </main>
      </main>
    );
}

export default App;
