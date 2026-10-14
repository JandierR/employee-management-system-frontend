export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 bg-[#172033] text-white">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold">EmployeeHub</h1>
      </div>

      <nav className="px-4 py-6">
        <p className="mb-4 px-2 text-xs font-semibold tracking-wider text-gray-400">
          MAIN MENU
        </p>

        <a
          href="#employees"
          className="block rounded-lg bg-[#2d3b55] px-4 py-3 text-sm font-medium text-white">
          Employees
        </a>
      </nav>
    </aside>
  );
}
