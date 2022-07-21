import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { filterActiveAndInActive } from '../redux/todoSlice'

const Header = styled.header`
    width: 100%;
    height: 6vh;
    border: 1px solid lightgrey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2%;
`
const Left = styled.div`

`
const Right = styled.div`
    width: 20%;
    display: flex;
    justify-content: space-between;
`

function TodoHeader() {
    const filterValue = useSelector((state) => state.todos.filterStatus)
    const [filter,setFilter] = useState(filterValue)

    const dispatch = useDispatch()
    const handleChange = (e) => {
        setFilter(e.target.value)
        dispatch(filterActiveAndInActive(
          e.target.value
        ))
      }

  return (
    <Header>
        <Left>
            <p>Task</p>
        </Left>
        <Right>
            <select value={filter} onChange={handleChange} name="" id="">
                <option value={false}>All Active</option>
                <option value={true}>Completed</option>
            </select>

            <select value={filter} onChange={handleChange} name="" id="">
                <option value='false'>filter</option>
                <option value='critical'>Critical</option>
                <option value='dueToday'>Due Today</option>
                <option value='dueTomorrow'>Due Tomorrow</option>
                <option value='passedDue'>Passed Due</option>
            </select>
        </Right>
    </Header>
  )
}

export default TodoHeader