import Link from "next/link";

export default function Header() {
  return (
    <header className="sm:mt-4 sm:ml-4 mt-8 ml-3 px-3 py-1.5 bg-white text-black text-left">
      <Link href="/" className="sm:font-semibold font-bold sm:text-lg text-3xl absolute focus:outline-black"
          target="_blank"
          rel="noreferrer"
      >
        Routines AI
      </Link>
      <span className="scale-75 sm:ml-20 ml-36 sm:mt-0 mt-1 uppercase text-sm font-bold px-2 py-1 text-sky-400 bg-sky-100 rounded-xl mt-1 absolute">
        Workouts in seconds
      </span>
      <Link href="https://github.com/cortez/RoutinesAI" className="lg:block hidden font-semibold text-md absolute top-4 right-4 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 hover:scale-95 active:scale-90 transition rounded-xl focus:outline-black"
          target="_blank"
          rel="noreferrer"
      >
        GitHub
      </Link>
    </header>
  );
}