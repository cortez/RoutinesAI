import Link from "next/link";

export default function Header() {
  return (
    <header className="2xl:mt-48 md:mt-20 mt-10 bg-white text-black text-center">
      <Link href="/" className="font-semibold text-xl absolute -ml-36 focus:outline-black"
          target="_blank"
          rel="noreferrer"
      >
        Routines AI
      </Link>
      <span className="scale-90 uppercase text-sm font-bold px-2 py-1 text-sky-400 bg-sky-100 rounded-xl -ml-10 absolute">
        Workouts in seconds
      </span>
    </header>
  );
}