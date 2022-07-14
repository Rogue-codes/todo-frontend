import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { todoDelete, todoFetch, todoToggle } from '../redux/todoSlice'
import moment from 'moment'
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'
import {BsFillCheckCircleFill} from 'react-icons/bs'


const Container = styled.div`
    @media (max-width:480px) {
      overflow: scroll
    }
`
const Table = styled.table`
    width: 80%;
    margin: auto;
    margin-top: 2%;
    border-collapse: collapse;
    position: relative;
    thead{
        height: 6vh;
    }
    th{
        @media (max-width:480px) {
        font-size: .7rem;
        }
        height: 8vh;
        background:#fff;
        color: #000;
        font-size: 1vw;
    }
    td{
        text-align: center;
        font-size: 1vw;
    }
    tbody{
        tr{
            background:#fff;
            height: 6vh; 
            &:nth-child(even) {
                background-color: rgb(240 240 240);
            }
            .ops{
                display: flex;
                justify-content: center;
                gap: 15%;
                padding: 4%;
            }
        }
    }
`

function TableComponent({setTodo}) {
    const todoState = useSelector((state) => state.todos)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(todoFetch())
    },[dispatch])

    const handleDelete =(_id) => {
        dispatch(todoDelete(_id))
    }

    const handleToggleComplete = (_id) => {
        dispatch(todoToggle(_id))
    }
  return (
    <Container>
         <Table>
            <thead>
                <tr>
                <th>Task Title</th>
                <th>Author</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Date Due</th>
                <th>Operations</th>
                </tr>
            </thead><br />

            <tbody>
                {
                    todoState.fetchTodoStatus === 'pending' ?
                    (<p>Loading.....</p>):
                    todoState.fetchTodoStatus === 'rejected' ?
                    (<p>An error occurred, can't get task</p>):
                    
                    (
                        todoState.todos.map((td)=><tr key={td._id}>
                        <td>{td.name}</td>
                        <td>{td.author}</td>
                        <td>{td.priority}</td>
                        <td>{td.isComplete ? 'done' : "not done"}</td>
                        <td>{moment(td.date).fromNow()}</td>
                        <td></td>
                        <td className='ops'>
                            <AiFillDelete size='1rem' cursor='pointer' color='red' onClick={()=>handleDelete(td._id)}/>
                            <AiFillEdit size='1rem' cursor='pointer' color='blue' onClick={()=>setTodo(td)}/>
                            <BsFillCheckCircleFill size='1rem' cursor='pointer' color='green' onClick={()=>handleToggleComplete(td._id)}/>
                        </td>
                    </tr> 
                        )
                    )
                }

            </tbody>
        </Table>
        
    </Container>
  )
}

export default TableComponent