import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import FrequencyDropDown, { FrequencyType } from "../components/FrequencyDropDown";
import EquipmentDropDown, { EquipmentType } from "../components/EquipmentDropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState<FrequencyType>("1");
  const [equipment, setEquipment] = useState<EquipmentType>("Any Equipment");
  const [goal, setGoal] = useState("");
  const [limitations, setLimitations] = useState("");
  const [generatedWorkouts, setGeneratedWorkouts] = useState<String>("");

  console.log("Streamed response: ", generatedWorkouts);

  const prompt =
    limitations === ""
      ? `Generate ${frequency} workouts using ${equipment} with a goal to ${goal} and are clearly labeled "Workout Day (number) ((type of workout)): ", and so on. Generate the workouts at max 30 words and beginning with reps and sets, formatted with an "x" between, followed by the exercise name.`
      : `Generate ${frequency} workouts using ${equipment} with a goal to ${goal} and are clearly labeled "Workout Day (number) ((type of workout)): ", and so on. Generate the workouts at max 30 words and beginning with reps and sets, formatted with an "x" between, followed by the exercise name. Include accommodations for someone with ${limitations}.`

  const generateWorkout = async (e: any) => {
    e.preventDefault();
    setGeneratedWorkouts("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedWorkouts((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-full mx-auto flex-col items-center justify-center py-2 min-h-screen bg-black">
      <Head>
        <title>AI Workouts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="rounded-3xl bg-white flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <h1 className="sm:text-6xl text-xl max-w-3xl font-bold text-slate-900 mt-20 sm:mt-28" data-aos="zoom-in">
          Generate your own personalized workout routine in seconds
        </h1>

        <div className="sm:max-w-md w-full mt-16">

          <div className="flex items-center space-x-3">
            <Image src="/frequency.svg" width={22} height={22} alt="1 icon" />
            <p className="text-left font-medium my-5">Amount of workouts per week:</p>
          </div>
          <div className="block">
            <FrequencyDropDown frequency={frequency} setFrequency={(newFrequency) => setFrequency(newFrequency)} />
          </div>

          <div className="flex mt-10 items-center space-x-3 mt-10">
            <Image src="/equipment.svg" width={22} height={22} alt="1 icon" />
            <p className="text-left font-medium my-5">What equipment do you have access to?</p>
          </div>
          <div className="block">
            <EquipmentDropDown equipment={equipment} setEquipment={(newEquipment) => setEquipment(newEquipment)} />
          </div>

          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/goal.svg"
              width={22}
              height={22}
              alt="1 icon"
              className="sm:mb-0"
            />
            <p className="text-left font-medium my-5">
              What is your main goal?
            </p>
          </div>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={1}
            className="resize-none w-full rounded-xl bg-gray-100 hover:bg-gray-200 border-none focus:border-gray-500 focus:ring-gray-500"
            placeholder={
              "e.g. Lose Weight"
            }
          />

          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/limitations.svg"
              width={22}
              height={22}
              alt="1 icon"
              className="sm:mb-0"
            />
            <p className="text-left font-medium my-5">
              Name any limitations{" "}
              <span className="text-gray-400">
                (or leave blank)
              </span>
              .
            </p>
          </div>
          <textarea
            value={limitations}
            onChange={(e) => setLimitations(e.target.value)}
            rows={1}
            className="resize-none w-full rounded-xl bg-gray-100 hover:bg-gray-200 border-none focus:border-gray-500 focus:ring-gray-500"
            placeholder={
              "e.g. Sprained Ankle"
            }
          />

          {!loading && (
            <button
              className="bg-lime-400 rounded-xl text-black font-medium px-4 py-6 mt-16 hover:bg-lime-500 w-full"
              onClick={(e) => generateWorkout(e)}
            >
              <img src="/magic.svg" className="w-5 inline mb-1 mr-2"/> Generate your workouts
            </button>
          )}
          {loading && (
            <button
              className="bg-lime-400 rounded-xl text-white font-medium px-4 py-6 sm:mt-7 mt-6 hover:bg-lime-500 w-full"
              disabled
            >
              <LoadingDots color="black" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700" />
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 mb-14 sm:mb-28">
              {generatedWorkouts && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-xl font-bold text-gray-900 mx-auto mt-10">
                      Your generated workouts
                    </h2>
                  </div>
                  <div className="space-y-4 flex flex-col items-center justify-center max-w-full mx-auto">
                    {generatedWorkouts
                      .split("Workout ")
                      .splice(1)
                      .map((generatedWorkout) => {
                        return (
                          <div
                            className="bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedWorkout);
                              toast("Copied text!", {
                              });
                            }}
                            key={generatedWorkout}
                          >
                            <p>{generatedWorkout}</p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};
export default Home;