interface ReusableDashboardTopProps {
  description: string;
  title: string;
  buttonText: string;
}
export default function ReusableManagementTop({
  description,
  title,
  buttonText,
}: ReusableDashboardTopProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div>
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
        {buttonText}
      </button>
    </div>
  );
}
