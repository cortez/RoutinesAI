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
      className="transition-all resize-none placeholder-gray-400 w-full rounded-xl border-2 hover:border-gray-200 border-gray-100 focus:border-black focus:ring-white"
      placeholder={placeholder}
    />
  )
}

export default TextArea