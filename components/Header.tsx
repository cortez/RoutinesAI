import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white text-black text-md mb-11 flex">
      <Link href="/" className="sm:top-6 sm:left-9 top-4 left-6 w-32 space-x-3 absolute hover:scale-95 transition"
          target="_blank"
          rel="noreferrer"
      >
        <Image priority src="/logo.svg" className="-ml-2 -mt-2 mr-1 inline" alt="logo icon" width={22} height={22} />
        Routines AI
      </Link>
      <Link href="https://github.com/cortez/RoutinesAI" className="sm:top-6 sm:right-9 top-4 right-6 space-x-3 absolute hover:scale-95 transition"
          target="_blank"
          rel="noreferrer"
      >
        GitHub
      </Link>
    </header>
  );
}