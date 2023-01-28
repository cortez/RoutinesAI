import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-black text-white font-medium text-md mb-11 flex">
      <Link href="/" className="top-3 left-4 space-x-3 absolute hover:text-lime-400 transition"
          target="_blank"
          rel="noreferrer"
      >
      <img src="../favicon.ico" className="h-6 -ml-1 mb-1 mr-1 inline" />
        AI Workouts
      </Link>
      <Link href="https://github.com/cortez/workouts" className="top-3 right-4 space-x-3 absolute hover:text-lime-400"
          target="_blank"
          rel="noreferrer"
      >
        GitHub
      </Link>
    </header>
  );
}