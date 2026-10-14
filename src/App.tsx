import { useState } from 'react';
import EmployeeManagement from './Components/EmployeeManagement';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import NoSelected from './Components/NoSelected';

function App() {
  const [selectedTab, setSelectedTab] = useState({});
  return (
    <main className="flex min-h-screen  bg-gray-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />
        <NoSelected />
        {/* EmployeeManagment will be shown when Employees button in the Sidebar Main Meny is selected */}
        {/* <EmployeeManagement /> */}
      </main>
    </main>
  );
}

export default App;
