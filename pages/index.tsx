import type { NextPage } from 'next'

import { AnimatePresence, motion } from 'framer-motion'

import Head from 'next/head'
import Image from 'next/image'

import { useState } from 'react'

import { Toaster, toast } from 'react-hot-toast'

import Choices from '../components/Choices'
import TextArea from '../components/TextArea'

import Header from '../components/Header'
import LoadingDots from '../components/LoadingDots'

const frequencyChoices = ['1', '2', '3', '4', '5', '6', '7']
const equipmentChoices = ['Any Equipment', 'Dumbbells Only', 'Pull-up Bar', 'Ballet Barre', 'Resistance Bands', 'No Equipment']

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [frequency, setFrequency] = useState("1")
  const [equipment, setEquipment] = useState("Any Equipment")
  const [goal, setGoal] = useState("")
  const [limitations, setLimitations] = useState("")
  const [generatedWorkouts, setGeneratedWorkouts] = useState<String>("")

  const prompt =
    limitations === ""
      ? `Generate ${frequency} workouts using ${equipment} with a goal to ${goal} and are clearly labeled "Workout Day (number) ((type of workout)): ", and so on. Generate the workouts at max 35 words and beginning with reps and sets, formatted with an "x" between, followed by the exercise name.`
      : `Generate ${frequency} workouts using ${equipment} with a goal to ${goal} and are clearly labeled "Workout Day (number) ((type of workout)): ", and so on. Generate the workouts at max 35 words and beginning with reps and sets, formatted with an "x" between, followed by the exercise name. Include accommodations for someone with ${limitations}.`

  const generateWorkout = async (e: any) => {
    e.preventDefault()
    setGeneratedWorkouts("")
    setLoading(true)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt
      })
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setGeneratedWorkouts((prev) => prev + chunkValue)
    }
    setLoading(false)
  }

  return (
    <div className="p-5 text-[var(--text)] bg-[var(--background)]">
      <Head>
        <title>Routines AI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="max-w-[350px] mx-auto flex-col items-center">
        <h2>How many workouts/week do you want to do?</h2>
        <Choices
          choices={frequencyChoices}
          selectedChoice={frequency}
          setSelectedChoice={setFrequency}
        />

        <h2>What equipment do you have access to?</h2>
        <Choices
          choices={equipmentChoices}
          selectedChoice={equipment}
          setSelectedChoice={setEquipment}
        />

        <h2>What is your main goal?</h2>
        <TextArea placeholder="e.g. Lose Weight" />

        <h2>Name any limitations or leave blank.</h2>
        <TextArea placeholder={"e.g. Sprained Ankle"}
        />

        <div className="flex justify-center">
          {!loading ? (
            <button
              className="focus:outline-2 outline-blue scale-105 mt-10 xl:mb-2 sm:mb-0 mb-2 bg-[var(--button)] rounded-xl text-white px-6 py-3 select-none active:scale-100 transition"
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
          ) : (
            <button
              className="focus:outline-2 outline-blue scale-105 mt-10 xl:mb-2 sm:mb-0 mb-2 bg-gradient-to-r from-sky-300 to-blue background-animate rounded-xl px-14 py-3 select-none cursor-no-drop transition"
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <AnimatePresence mode="wait">
          <motion.div className="space-y-8 sm:mb-32 mb-8">
            {generatedWorkouts && (
              <>
                <h1 className="text-center text-2xl text-[var(--text)] mx-auto mt-10 sm:mt-14">
                  Your generated workouts
                </h1>
                <div className="text-center space-y-4 flex flex-col items-center justify-center max-w-lg mx-auto">
                  {generatedWorkouts
                    .split("Workout ")
                    .splice(1)
                    .map((generatedWorkout) => {
                      generatedWorkout = generatedWorkout.replace(/\./g, '')
                      return (
                        <div
                          className="bg-[var(--gray)] hover:bg-[var(--gray-hover)] active:scale-95 rounded-xl p-4 transition-all cursor-copy"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedWorkout)
                            toast("Copied workout", {
                            })
                          }}
                          key={generatedWorkout}
                        >
                          {generatedWorkout}
                        </div>
                      )
                    })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Home