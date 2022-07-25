import React, { useState } from 'react'
import styled from 'styled-components'
import Form from './Form'
import Sidebar from './Sidebar'
import TableComponent from './TableComponent'
import TodoHeader from './TodoHeader'

const TodoContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  background: rgb(240 240 240);
`
const Main = styled.div`
    width: ${props => props.ps};
    margin-left: ${props => props.ml};
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

  // sidebar Toggle
  const [sideBar,setSideBar] = useState(false);

  return (
    <TodoContainer>
      <Sidebar sideBar={sideBar} setSideBar={setSideBar} />
      <Main ps={sideBar ? '80%' : "100%"} ml={sideBar ? '20%' : "0%"}>
          <TodoHeader setSideBar={setSideBar} sideBar={sideBar} />
          <Form todo={todo} setTodo={setTodo}/>
          <TableComponent setTodo={setTodo}/>
      </Main>
    </TodoContainer>
  )
}

export default Todos