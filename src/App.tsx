import EmployeeManagement from './Components/EmployeeManagement';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Header />

        <EmployeeManagement />
      </main>
    </div>
  );
}

export default App;
