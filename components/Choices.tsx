import { Fragment, useRef, useEffect } from 'react'

type Props = {
  choices: string[]
  selectedChoice: string
  setSelectedChoice: any
}

const Choices = ({ choices, selectedChoice, setSelectedChoice }: Props) => {
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
          <div
            className={`active:scale-95 cursor-pointer text-center rounded-xl inline-block mb-2 mr-2 min-w-[40px] py-1.5 px-[13px] border-2 focus:border-blue focus:outline-0 relative transition-all ${selectedChoice === choice ? 'bg-blue bg-opacity-25 hover:bg-opacity-[35%] border-blue' : 'hover:bg-[var(--gray-hover)] hover:border-[var(--gray-hover)] bg-[var(--gray)] border-[var(--gray)]'}`}
            tabIndex={0}
            data-choice={choice}
            onClick={(event) => {
              event.preventDefault()
              setSelectedChoice(choice)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setSelectedChoice(choice)
              }
            }}
            style={{ userSelect: 'none' }}
          >
            {choice}
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default Choices
