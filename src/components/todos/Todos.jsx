import React, { useState } from 'react'
import styled from 'styled-components'
import Form from './Form'
import TableComponent from './TableComponent'
import TodoHeader from './TodoHeader'

const TodoContainer = styled.div`
    width: 100%;
    min-height: 90vh;
    background: rgb(240 240 240);
`

function Todos() {
    const [todo, setTodo] = useState({
      name:'',
      author:'',
      priority:'',
      isComplete: false,
      dateDue : '',
  })
  return (
    <TodoContainer>
        <TodoHeader/>
        <Form todo={todo} setTodo={setTodo}/>
        <TableComponent setTodo={setTodo}/>
    </TodoContainer>
  )
}

export default Todos