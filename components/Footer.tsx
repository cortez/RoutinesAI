export default function Footer() {
  return (
    <footer className="text-center w-full mt-8 mb-8 items-center text-white">
      <div className="text-gray-600">
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
      <div className="mt-5">
        <a
          href="mailto:joseph@lcortez.com?subject=AI%20Workouts%20Feedback"
          target="_blank"
          rel="noreferrer"
          className="text-white hover:bg-gray-700 py-2 px-3 bg-gray-800 rounded-xl"
        >
          Give feedback
        </a>
      </div>
    </footer>
  );
}