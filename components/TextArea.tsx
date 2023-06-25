import React, { ChangeEvent, useState } from "react"

interface Props {
  placeholder: string
}

const TextArea: React.FC<Props> = ({ placeholder }) => {
  const [input, setInput] = useState("")

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  return (
    <textarea
      value={input}
      onChange={handleInputChange}
      rows={1}
      className="transition-all resize-none bg-[var(--background)] placeholder-[var(--placeholder)] w-full rounded-xl border-2 hover:border-[var(--gray-hover)] border-[var(--gray)] focus:border-[var(--text)] focus:ring-0"
      placeholder={placeholder}
    />
  )
}

export default TextArea