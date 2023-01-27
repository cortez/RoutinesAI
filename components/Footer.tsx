import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center w-full sm:mt-8 sm:mb-8 mt-6 mb-6 items-center text-white">
      <div>
        Powered by{" "}
        <a
          href="https://openai.com/"
          target="_blank"
          rel="noreferrer"
          className="hover:underline transition underline-offset-2"
        >
          OpenAI
        </a>{" "}
        and{" "}
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noreferrer"
          className="hover:underline transition underline-offset-2"
        >
          Vercel Edge Functions
        </a>
      </div>
    </footer>
  );
}
