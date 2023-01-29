import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white text-black text-lg mb-11 flex">
      <Link href="/" className="top-4 left-6 w-32 font-medium space-x-3 absolute hover:text-gray-600 transition"
          target="_blank"
          rel="noreferrer"
      >
      <Image src="/logo.svg" className="-ml-2 -mt-2 mr-1 inline" alt="logo icon" width={22} height={22} />
        Routines AI
      </Link>
      <Link href="https://github.com/cortez/RoutinesAI" className="top-4 right-6 font-medium space-x-3 absolute hover:text-gray-600"
          target="_blank"
          rel="noreferrer"
      >
        GitHub
      </Link>
    </header>
  );
}