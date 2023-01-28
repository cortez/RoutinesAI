export default function Footer() {
  return (
    <footer className="text-center w-full sm:mt-8 mt-12 sm:mb-8 mb-6 items-center text-white">
      <div>
        <a
          href="mailto:joseph@lcortez.com?subject=AI%20Workouts%20Feedback"
          target="_blank"
          rel="noreferrer"
          className="text-white hover:bg-gray-700 py-2 px-3 bg-gray-800 rounded-xl"
        >
          Give feedback
        </a>
      </div>
      <div className="text-gray-600 mt-5">
        Powered by{" "}
        <a
          href="https://openai.com/api"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-gray-600"
        >
          OpenAI
        </a>{" "}
        and{" "}
        <a
          href="https://vercel.com/features/edge-functions"
          target="_blank"
          rel="noreferrer"
          className="text-gray-600 hover:text-gray-600"
        >
          Vercel Edge Functions
        </a>
      </div>
    </footer>
  );
}