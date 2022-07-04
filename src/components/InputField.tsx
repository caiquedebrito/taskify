import React, { useRef } from 'react'
import './styles.css'

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void
}

export const InputField = ({ todo, setTodo, handleAdd }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form className='input' onSubmit={(e) => {
            handleAdd(e)
            inputRef.current?.blur()
        }}>
        <input 
            type="input" 
            ref={inputRef}
            placeholder='Enter a task' 
            className='input__box'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
        />
        <button className='input__submit' type='submit'>Go</button>
    </form>
  )
}
