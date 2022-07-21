import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { todoPost, todoUpdate } from '../redux/todoSlice'

const FormCont = styled.form`
    width: 85%;
    height: 15vh;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 2%;
    input{
        width: 20%;
        height: 6vh;
        border: none;
        border-radius: 5px;
        padding-left: 1%;
        &:focus{
            outline: none;
        }
    }
    select{
        width: 20%;
        height: 6vh;
        border: none;
        border-radius: 5px;
        padding-left: 1%;
        &:focus{
            outline: none;
        }
    }
    button{
        margin-left: 1%;
        width: 10%;
        height: 6vh;
        background: #444791;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        color: #fff;
        &:hover{
            background: #303261;
        }
    }
`
const Modal = styled.div`
    width: 30%;
    height: 5vh;
    position: fixed;
    margin-left: 20%;
    z-index: 10;
    top: 12%;
    background: #444791;
    display: ${props => props.ds};
    justify-content: center;
    align-items: center;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
function Form({todo,setTodo}) {


    const dispatch = useDispatch()
    const statusMsg =  useSelector((state)=>state.todos)
    const [pending, setPending] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(todo._id){
            dispatch(todoUpdate(todo))
        }else{
            const newTodo = {
                ...todo, 
                date : Date().toLocaleString().split(',')[0]
            }
            dispatch(todoPost(
                newTodo
            )) 
        }

       

        setPending(true)

        setTodo({
            name:'',
            author:'',
            priority:'',
            isComplete: false,
            dateDue: ''
        })

        setTimeout(() => {
            setPending(false)
        },5000)
    }

    console.log(todo)
  return (
    <FormCont onSubmit={handleSubmit}>
        <input value={todo.name} type="text" placeholder="task name" onChange={(e)=>setTodo({...todo, name: e.target.value})} />
        <input value={todo.author} type="text" placeholder="description" onChange={(e)=>setTodo({...todo, author: e.target.value})}/>
        <select value={todo.priority} name="" id="" onChange={(e)=>setTodo({...todo, priority: e.target.value})}>
            <option value="">priority</option>
            <option value="Important">Important</option>
            <option value="normal">Medium</option>
        </select>
        <input value={todo.dateDue} type="date" placeholder='date created' onChange={(e)=>setTodo({...todo, dateDue: e.target.value})} />
        <button>{todo._id ? 'update task' : 'add task'}</button>

        <Modal ds={pending ? 'flex' : 'none'}>
        {
            statusMsg.addTodoStatus === 'pending' ? (<p>Loading</p>) : null
        }
        {
            statusMsg.addTodoStatus === 'rejected' ? (<p>{statusMsg.addTodoError}</p>) : null
        }
        {
            statusMsg.addTodoStatus === 'success' ? (<p>success</p>) : null
        }
        {
            statusMsg.updateTodoStatus === 'pending' ? (<p>Loading</p>) : null
        }
        {
            statusMsg.updateTodoStatus === 'rejected' ? (<p>{statusMsg.addTodoError}</p>) : null
        }
        {
            statusMsg.updateTodoStatus === 'success' ? (<p>Task Updated</p>) : null
        }
                {
            statusMsg.deleteTodoStatus === 'pending' ? (<p>Loading</p>) : null
        }
        {
            statusMsg.deleteTodoStatus === 'rejected' ? (<p>{statusMsg.addTodoError}</p>) : null
        }
        {
            statusMsg.deleteTodoStatus === 'success' ? (<p>Task Deleted</p>) : null
        }
        </Modal>
    </FormCont>
  )
}

export default Form