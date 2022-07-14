import React from 'react'
import styled from 'styled-components'

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
  return (
    <Header>
        <Left>
            <p>Task</p>
        </Left>
        <Right>
            <select name="" id="">
                <option>All Active</option>
                <option>Completed</option>
            </select>

            <select name="" id="">
                <option>filter</option>
                <option>Critical</option>
                <option>Due Today</option>
                <option>Due Tomorrow</option>
                <option>Passed Due</option>
            </select>
        </Right>
    </Header>
  )
}

export default TodoHeader