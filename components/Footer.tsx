export default function Footer() {
  return (
    <footer className="text-center w-full mt-8 mb-8 items-center text-white">
      <div>
        Powered by{" "}
        <a
          href="https://openai.com/api"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-600"
        >
          OpenAI
        </a>{" "}
        and{" "}
        <a
          href="https://vercel.com/features/edge-functions"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-600"
        >
          Vercel Edge Functions
        </a>
      </div>
    </footer>
  );
}