import { Fragment, useRef, useEffect } from 'react'

type Props = {
  choices: string[]
  selectedChoice: string
  setSelectedChoice: any
}

const ChoiceDropDown = ({ choices, selectedChoice, setSelectedChoice }: Props) => {
  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(event.target.value)
  }

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const focusedElement = document.activeElement as HTMLElement
        if (containerRef.current?.contains(focusedElement)) {
          setSelectedChoice(focusedElement.getAttribute('data-choice') || '')
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setSelectedChoice])

  return (
    <div ref={containerRef}>
      {choices.map((choice) => (
        <Fragment key={choice}>
          <input
            type="radio"
            id={`choice-${choice}`}
            name="choice"
            value={choice}
            checked={selectedChoice === choice}
            onChange={handleChoiceChange}
            className="hidden"
          />
          <label
            htmlFor={`choice-${choice}`}
            className={`cursor-pointer rounded-xl inline-block mb-2 mr-2 py-1.5 px-[13px] border-2 relative focus:outline-black transition-all ${selectedChoice === choice ? 'bg-blue bg-opacity-25 hover:bg-opacity-[35%] border-blue' : 'hover:bg-gray-200 hover:border-gray-200 bg-gray-100 border-gray-100'}`}
            tabIndex={0}
            data-choice={choice}
          >
            {choice}
          </label>
        </Fragment>
      ))}
    </div>
  )
}

export default ChoiceDropDown
