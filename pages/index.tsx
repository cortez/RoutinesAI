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
    <div className="rounded-3xl">
      <div className="flex rounded-3xl max-w-full mx-auto flex-col items-center justify-center min-h-screen bg-white">
        <Head>
          <title>Routines AI</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        <main className="bg-white rounded-3xl flex flex-1 w-full flex-col items-center justify-center text-center px-4">
          <div>
            <img src="./hero.svg" className="w-full sm:block hidden absolute mt-16 left-0" />
          </div>
          <h1 className="z-10 sm:text-6xl text-3xl max-w-3xl font-bold text-black mt-16 sm:mt-28" data-aos="zoom-in">
            Generate your own personalized workout routine in seconds
          </h1>

          <div className="sm:max-w-md w-full sm:mt-32 mt-20">
            <div className="flex items-center space-x-3">
              <p className="font-normal text-left my-3 ml-1">Amount of workouts per week:</p>
            </div>
            <div className="block">
              <FrequencyDropDown frequency={frequency} setFrequency={(newFrequency) => setFrequency(newFrequency)} />
            </div>

            <div className="flex mt-10 items-center space-x-3 mt-10">
              <p className="font-normal text-left my-3 ml-1">What equipment do you have access to?</p>
            </div>
            <div className="block">
              <EquipmentDropDown equipment={equipment} setEquipment={(newEquipment) => setEquipment(newEquipment)} />
            </div>

            <div className="flex mt-10 items-center space-x-3">
              <p className="font-normal text-left my-3 ml-1">
                What is your main goal?
              </p>
            </div>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={1}
              className="resize-none w-full rounded-xl bg-gray-100 hover:bg-gray-200 border-gray-100 focus:border-lime-400 focus:ring-lime-400"
              placeholder={
                "e.g. Lose Weight"
              }
            />

            <div className="flex mt-10 items-center space-x-3">
              <p className="font-normal text-left my-3 ml-1">
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
              className="resize-none mb-12 w-full rounded-xl bg-gray-100 hover:bg-gray-200 border-gray-100 focus:border-lime-400 focus:ring-lime-400"
              placeholder={
                "e.g. Sprained Ankle"
              }
            />

            {!loading && (
              <>
              <button
                className="bg-gradient-to-r from-lime-400 to-lime-300 background-animate font-medium rounded-xl text-black font-medium px-4 py-8 mb-2 w-full focus:outline-black select-none hover:translate-y-2 hover:[box-shadow:0_0px_0_0_#84CC16] hover:border-b-[0px] transition-all duration-150 [box-shadow:0_9px_0_0_#84CC16]"
                onClick={(e) => generateWorkout(e)}
              >
                <Image
                  src="/magic.svg"
                  width={18}
                  height={18}
                  alt="magic icon"
                  className="inline mb-1 mr-2"
                />
                Generate your workouts
              </button>

              </>
            )}
            {loading && (
              <button
                className="loading-button bg-gradient-to-r from-lime-400 to-teal-400 background-animate font-medium rounded-xl text-black font-medium px-4 py-8 w-full focus:outline-black select-none sm-mb:0 mb-2 cursor-no-drop"
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
              <motion.div className="space-y-8 sm:space-y-10 mb-4 sm:mb-28">
                {generatedWorkouts && (
                  <>
                    <div>
                      <h2 className="sm:text-4xl text-2xl font-bold text-black mx-auto mt-20">
                        Your generated workouts
                      </h2>
                      <h3 className="sm:mt-3 mt-1 text-gray-400">
                        (Aim to complete multiple sets for each day)
                      </h3>
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
                                toast("Copied workout", {
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
      </div>
      <Footer />
    </div>
  );
};
export default Home;