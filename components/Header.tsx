import Link from "next/link";

export default function Header() {
  return (
    <header className="2xl:mt-48 md:mt-24 mt-10 bg-white text-black text-center">
      <Link href="/" className="font-medium text-xl absolute -ml-44 px-2 focus:outline-black"
          target="_blank"
          rel="noreferrer"
      >
        Routines AI
      </Link>
      <span className="scale-90 uppercase text-xs font-medium px-3 py-1.5 text-lime-500 bg-lime-100 rounded-full -ml-16 absolute">
        Workouts in seconds
      </span>
      <span>&nbsp;</span>
      <Link href="https://github.com/cortez/RoutinesAI" className="scale-90 uppercase text-xs font-medium px-3 py-1.5 text-white bg-black transition rounded-full ml-24 absolute focus:outline-black"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </Link>
    </header>
  );
}