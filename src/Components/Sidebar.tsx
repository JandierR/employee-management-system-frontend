interface Dashboard {
  dashboardId: number;
  dashboardName: string;
}

interface SidebarProps {
  showDashboard: (selectedDashboardId: number) => void;
  dashboards: Dashboard[];
}
export default function Sidebar({ showDashboard, dashboards }: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 bg-[#172033] text-white">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold">Main Menu</h1>
      </div>

      <nav className="px-4 py-6 mt-4">
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          {dashboards.map((dashboard) => {
            return (
              <li key={dashboard.dashboardId}>
                <a
                  onClick={() => showDashboard(dashboard.dashboardId)}
                  href="#employees"
                  className="block rounded-lg bg-[#2d3b55] hover:bg-[#3b4c6d]  text-sm font-medium px-4 py-3 text-white transition-colors duration-150">
                  {dashboard.dashboardName}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
