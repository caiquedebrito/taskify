import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../model'
import { Actions } from '../TodoReducer'
import { SingleTodo } from './SingleTodo'
import './styles.css'

interface Props {
    // state: Todo[]
    // dispatch: React.Dispatch<Actions>
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodoList = ({  todos, setTodos, completedTodos, setCompletedTodos}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {
          (provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className="todos__heading">Active Tasks</span>
              {
                todos.map((todo, index) => <SingleTodo index={index} todos={todos} setTodos={setTodos} todo={todo} key={todo.id} />)
              }
              {provided.placeholder}
            </div>
          )
        } 
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {
          (provided, snapshot) => (
            <div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className="todos__heading">Complited Tasks</span>
              {
                completedTodos.map((todo, index) => <SingleTodo index={index} todos={todos} setTodos={setTodos} todo={todo} key={todo.id}/>)
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      
    </div>
  )
}
