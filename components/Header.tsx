import Link from "next/link";

export default function Header() {
  return (
    <header className="2xl:mt-48 md:mt-24 mt-10 bg-white text-black text-center">
      <Link href="/" className="font-bold text-3xl absolute -ml-44 focus:outline-black"
          target="_blank"
          rel="noreferrer"
      >
        Routines AI
      </Link>
      <span className="scale-90 uppercase text-sm font-bold px-2 py-1 text-sky-400 bg-sky-100 rounded-xl -ml-3 mt-1 absolute">
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