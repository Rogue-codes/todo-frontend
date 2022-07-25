import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { filterActiveAndInActive } from '../redux/todoSlice'
import {AiOutlineMenu} from 'react-icons/ai'

const Header = styled.header`
    @media (max-width:480px) {
        flex-direction: column;
        align-items: flex-start;
        height: auto;
    }
    width: 100%;
    height: 6vh;
    border: 1px solid lightgrey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2% 5%;
`
const Left = styled.div`
    @media (max-width:480px) {
        width: 25%;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 6%;
`
const Right = styled.div`
    @media (max-width:480px) {
        flex-direction: column;
        align-items: flex-start;
        height: 12vh;
    }
    width: 20%;
    display: flex;
    justify-content: space-between;
`

function TodoHeader({setSideBar,sideBar}) {
    const filterValue = useSelector((state) => state.todos.filterStatus)
    const [filter,setFilter] = useState(filterValue)

    const dispatch = useDispatch()
    const handleChange = (e) => {
        setFilter(e.target.value)
        dispatch(filterActiveAndInActive(
          e.target.value
        ))
      }

    const toggleSideBar = () =>{
        setSideBar(!sideBar)
    }

  return (
    <Header>
        <Left onClick={toggleSideBar}>
            <AiOutlineMenu cursor='pointer' size='1.2rem'/> 
            <p>Task</p>
        </Left>
        <Right>
            <select value={filter} onChange={handleChange} name="" id="">
                <option value={false}>All Active</option>
                <option value='pending'>Pending</option>
                <option value={true}>Completed</option>
            </select>

            <select value={filter} onChange={handleChange} name="" id="">
                <option value='false'>filter</option>
                <option value='critical'>Important</option>
                <option value='dueToday'>Due Today</option>
                <option value='dueTomorrow'>Due Tomorrow</option>
                <option value='passedDue'>Passed Due</option>
            </select>
        </Right>
    </Header>
  )
}

export default TodoHeader