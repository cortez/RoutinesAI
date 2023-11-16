import Link from "next/link"

export default function Header() {
  return (
    <header className="flex justify-between items-center pb-10">
      <Link
        href="/"
        className="flex gap-2 items-center text-lg focus:outline-black"
      >
        <img src="../favicon.ico" className="w-6" alt="Logo" />
        Routines AI
      </Link>
      <Link
        href="https://github.com/cortez/RoutinesAI"
        className="text-md px-3 py-1.5 bg-[var(--gray)] hover:bg-[var(--gray-hover)] active:scale-95 transition-all rounded-xl focus:outline-black"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </Link>
    </header>
  )
}
