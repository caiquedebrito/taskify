import React, { useReducer, useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import './App.css'
import { InputField } from './components/InputField'
import { TodoList } from './components/TodoList'
import { Todo } from './model'
import { TodoReducer } from './TodoReducer'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  // const [state, dispatch] = useReducer(TodoReducer, [])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      // dispatch({ type: "add", payload: todo})
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    let add, active = todos, complete = completedTodos

    if (source.droppableId === "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className="App">
        <h1>Taskify</h1>
        <InputField 
          todo={todo} 
          setTodo={setTodo} 
          handleAdd={handleAdd}
        />
        <TodoList 
          todos={todos}
          setTodos={setTodos}
          // state={state} 
          // dispatch={dispatch} 
          completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
