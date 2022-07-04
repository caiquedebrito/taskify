import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Actions } from '../TodoReducer'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number
    todo: Todo
    // state: Todo[]
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    // dispatch: React.Dispatch<Actions>
}


export const SingleTodo = ({index, todo, todos, setTodos}: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    const handleSubmit = (e: FormEvent, id: number) => {
        e.preventDefault()
        // dispatch({ type: "edit", payload: [id, editTodo]})
        setTodos(
            todos.map(todo => todo.id === id ? {...todo, todo: editTodo} : todo)
        )
        setEdit(false)
    }

    const handleDelete = (id: number) => {
        // dispatch({ type: "remove", payload: id})
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleDone = (id: number) => {
        // dispatch({ type: "done", payload: id})
        setTodos(
            todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone}: todo)
            )
    }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided) => (

        <form className='todos__single' onSubmit={(e) => handleSubmit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            {
                edit ? <input ref={inputRef} type="text" className="todos__single--text" value={editTodo} onChange={(e) => setEditTodo(e.target.value)}/> : 
                todo.isDone ? (
                    <s className="todos__single--text">{todo.todo}</s>
                    ) : (
                    <span className="todos__single--text">{todo.todo}</span>)
            }
            <div>
                <span className="icon" onClick={ () => {
                    if (!edit && !todo.isDone) {
                        setEdit(!edit)
                    }
                }
                }><AiFillEdit /></span>
                <span className="icon" onClick={() => handleDelete(todo.id)}><AiFillDelete /></span>
                <span className="icon" onClick={() => handleDone(todo.id)}><MdDone /></span>
            </div>
        </form>
            )
        }
    </Draggable>
  )
}
