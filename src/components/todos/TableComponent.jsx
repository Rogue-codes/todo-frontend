import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {todoFetch} from '../redux/todoSlice'
import Tr from './Tr'


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
        position: relative;
        tr{
            background:#fff;
            height: 6vh; 
            &:nth-child(even) {
                background-color: rgb(240 240 240);
            }
            .ops{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 8vh;
            }
        }
    }
`

function TableComponent({setTodo}) {
    const todoState = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    // const [showModal, setShowModal]= useState(false)

    // const OpenShowModal = (_id) => {
    //     dispatch(openModal(_id))
    //     setShowModal(showModal)
    // }

    useEffect(()=>{
        dispatch(todoFetch())
    },[dispatch])



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
                        todoState.todos?.map((td)=>
                        
                    <Tr key={td.id} td={td} setTodo={setTodo}/>
                        )
                    )
                }

                

            </tbody>
        </Table>


        
    </Container>
  )
}

export default TableComponent