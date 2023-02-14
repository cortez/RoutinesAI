import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-4 sm:ml-4 ml-3 px-3 py-1.5 bg-white text-black text-left">
      <Link href="/" className="sm:font-medium font-bold sm:text-lg text-3xl absolute focus:outline-black"
          target="_blank"
          rel="noreferrer"
      >
        Routines AI
      </Link>
      <div className="sm:hidden block">
        <span className="scale-75 right-0 mt-0.5 uppercase text-md font-bold px-2.5 py-1 text-sky-400 bg-sky-100 rounded-lg absolute">
          Workouts in seconds
        </span>
      </div>
      <Link href="https://github.com/cortez/RoutinesAI" className="sm:block hidden font-medium text-md absolute top-4 right-4 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 hover:scale-95 active:scale-90 transition rounded-lg focus:outline-black"
          target="_blank"
          rel="noreferrer"
      >
        GitHub
      </Link>
    </header>
  );
}