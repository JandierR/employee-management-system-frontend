import Button from './Button';
import Header from './Header';

interface NoSelectedProps {}

export default function NoSelected() {
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center min-h-[75vh] w-full px-4 text-center">
        <div className="flex flex-col gap-2 max-w-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 tracking-wide">
            No tab selected
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Select an option from the sidebar to view details, or get started
            below by creating a new entry.
          </p>
        </div>
      </div>
    </>
  );
}
