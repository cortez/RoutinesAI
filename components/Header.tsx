import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-4 sm:ml-4 ml-3 px-3 py-1.5 bg-white text-black text-left">
      <Link href="/" className="sm:font-medium text-lg absolute focus:outline-black"
        target="_blank"
        rel="noreferrer"
      >
        <img src="../favicon.ico" className="w-7 inline -mt-1 mr-2" />
        Routines AI
      </Link>
      <Link href="https://github.com/cortez/RoutinesAI" className="font-medium text-md absolute top-4 right-4 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 active:scale-95 transition rounded-lg focus:outline-black"
          target="_blank"
          rel="noreferrer"
      >
        GitHub
      </Link>
    </header>
  );
}