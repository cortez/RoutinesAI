import React, { ChangeEvent, useState } from 'react'

interface Props {
  placeholder: string
}

const Input: React.FC<Props> = ({ placeholder }) => {
  const [input, setInput] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <input
      value={input}
      onChange={handleInputChange}
      className='h-11 p-3 transition-colors resize-none bg-[var(--background)] placeholder-[var(--placeholder)] w-full rounded-xl border-2 border-[var(--gray)] focus:border-blue focus:outline-none outline-none focus:ring-0'
      placeholder={placeholder}
    />
  )
}

export default Input
