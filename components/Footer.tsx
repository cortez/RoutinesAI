export default function Footer() {
  return (
    <footer className="text-center rounded-3xl bg-black w-full sm:mt-7 mt-6 sm:mb-8 mb-7 items-center text-white">
      {/* <div>
        <a
          href="mailto:joseph@lcortez.com?subject=Routines%20AI%20Feedback"
          target="_blank"
          rel="noreferrer"
          className="text-white hover:bg-gray-700 py-2 px-3 bg-gray-800 rounded-xl focus:border-none"
        >
          Give feedback
        </a>
      </div> */}
      <div className="text-gray-600 mt-5">
        Powered by{" "}
        <a
          href="https://openai.com/api"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600"
        >
          OpenAI
        </a>{" "}
        and{" "}
        <a
          href="https://vercel.com/features/edge-functions"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600"
        >
          Vercel Edge Functions
        </a>
      </div>
    </footer>
  );
}