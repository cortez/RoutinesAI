import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import FrequencyDropDown, { FrequencyType } from "../components/FrequencyDropDown";
import EquipmentDropDown, { EquipmentType } from "../components/EquipmentDropDown";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState<FrequencyType>("1");
  const [equipment, setEquipment] = useState<EquipmentType>("Any Equipment");
  const [goal, setGoal] = useState("");
  const [limitations, setLimitations] = useState("");
  const [generatedWorkouts, setGeneratedWorkouts] = useState<String>("");

  const prompt =
    limitations === ""
      ? `Generate ${frequency} workouts using ${equipment} with a goal to ${goal} and are clearly labeled "Workout Day (number) ((type of workout)): ", and so on. Generate the workouts at max 35 words and beginning with reps and sets, formatted with an "x" between, followed by the exercise name.`
      : `Generate ${frequency} workouts using ${equipment} with a goal to ${goal} and are clearly labeled "Workout Day (number) ((type of workout)): ", and so on. Generate the workouts at max 35 words and beginning with reps and sets, formatted with an "x" between, followed by the exercise name. Include accommodations for someone with ${limitations}.`

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
    <>
      <div className="bg-white flexmax-w-full mx-auto flex-col items-center justify-center">
        <Head>
          <title>Routines AI</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
          <div className="2xl:mt-36 sm:mt-24 mt-10 sm:w-1/2 lg:w-1/3 xl:w-1/4 w-full">

            <div className="mt-12 -mb-1">
              <p className="text-left xl:my-3 my-2 ml-1">How many workouts/week do you want to do?</p>
              <FrequencyDropDown frequency={frequency} setFrequency={(newFrequency) => setFrequency(newFrequency)} />
            </div>

            <div className="mt-12 -mb-1">
              <p className="text-left xl:my-3 my-2 ml-1">What equipment do you have access to?</p>
              <EquipmentDropDown equipment={equipment} setEquipment={(newEquipment) => setEquipment(newEquipment)} />
            </div>

            <div className="mt-12 -mb-1">
              <p className="text-left xl:my-3 my-2 ml-1">What is your main goal?</p>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                rows={1}
                className="font-normal resize-none placeholder-gray-400 w-full rounded-lg border-2 border-gray-100 focus:border-black focus:ring-white"
                placeholder={
                  "e.g. Lose Weight"
                }
              />
            </div>

            <div className="mt-12 -mb-1">
              <p className="text-left xl:my-3 my-2 ml-1">
                Name any limitations or leave blank.
              </p>
              <textarea
                value={limitations}
                onChange={(e) => setLimitations(e.target.value)}
                rows={1}
                className="font-normal resize-none 2xl:mb-14 mb-10 placeholder-gray-400 w-full rounded-lg border-2 border-gray-100 focus:border-black focus:ring-white"
                placeholder={
                  "e.g. Sprained Ankle"
                }
              />
            </div>
          </div>

          {!loading && (
            <>
              <button
                className="xl:mb-2 sm:mb-0 mb-2 mt-2 bg-black font-semibold rounded-lg text-white font-medium px-6 py-3 w-xl focus:outline-black select-none hover:bg-neutral-700 active:scale-95 transition"
                onClick={(e) => generateWorkout(e)}
              >
                <Image
                  src="/magic.svg"
                  width={17}
                  height={17}
                  alt="magic icon"
                  className="inline mb-1 -ml-1 mr-2"
                />
                Generate
              </button>

            </>
          )}
          {loading && (
            <button
              className="transition xl:mb-2 sm:mb-0 mb-0 loading-button bg-gradient-to-r from-sky-400 to-blue-500 background-animate font-medium rounded-lg font-medium px-14 py-3 w-xl focus:outline-black select-none cursor-no-drop"
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}

          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ duration: 2000 }}
          />
          <hr className="h-px bg-gray-700" />
          <AnimatePresence mode="wait">
            <motion.div className="space-y-8 sm:space-y-10 sm:mb-32 mb-16">
              {generatedWorkouts && (
                <>
                  <div>
                    <h1 className="text-2xl font-semibold text-black mx-auto sm:mt-14 mt-16">
                      Your generated workouts
                    </h1>
                    {/* <h3 className="mt-1 text-gray-400 font-normal">
                        (Aim to complete multiple sets for each day)
                      </h3> */}
                  </div>
                  <div className="space-y-4 flex flex-col items-center justify-center max-w-lg mx-auto">
                    {generatedWorkouts
                      .split("Workout ")
                      .splice(1)
                      .map((generatedWorkout) => {
                        generatedWorkout = generatedWorkout.replace(/\./g, '');
                        return (
                          <div
                            className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 transition cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedWorkout);
                              toast("Copied workout", {
                              });
                            }}
                            key={generatedWorkout}
                          >
                            <p className="font-normal">{generatedWorkout}</p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  );
};
export default Home;