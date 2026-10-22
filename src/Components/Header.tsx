interface HeaderProps {
  text?: string;
}

export default function Header({ text }: HeaderProps) {
  {
    /*This Header can also be reusable so we can use it for deparments or any other entity dinamically */
  }
  return (
    <header className="flex justify-between h-16 items-center border-b border-gray-200 bg-white px-8">
      <p className="text-sm text-gray-500">dashboard {text}</p>
    </header>
  );
}
