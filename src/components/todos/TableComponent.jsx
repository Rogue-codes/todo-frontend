import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {todoFetch} from '../redux/todoSlice'
// import { useTransition, animated } from 'react-spring'
import Tr from './Tr'


const Container = styled.div`
    @media (max-width:480px) {
      overflow: scroll
    }
    /* position: relative;
    .shadow{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 90;
        background-color: #010214a6;
    } */
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
    // const [showShadow, setShowShadow]= useState(false)



    useEffect(()=>{
        dispatch(todoFetch())
    },[dispatch])


    // const maskTransitions = useTransition(showShadow, {
    //     from: { opacity: 0 },
    //     enter: { opacity: 1 },
    //     leave: { opacity: 0 },
    //     reverse: showShadow,
    //     delay: 200,
    //     // config: config.molasses,
    //     // onRest: () => set(!show),
    // })


    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd ;

    const tody = new Date()
    let tomorrow = new Date(tody)
    tomorrow.setDate(tomorrow.getDate() + 1)
    let dd2 = String(tomorrow.getDate()).padStart(2, '0');
    let mm2 = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy2 = tomorrow.getFullYear();

    tomorrow = yyyy2 + '-' + mm2 + '-' + dd2 ;

    const tod = new Date()
    let yesterday = new Date(tod)
    yesterday.setDate(yesterday.getDate() - 1)
    let yesDd = String(yesterday.getDate()).padStart(2, '0');
    let yesMm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yesYyyy = yesterday.getFullYear();

    yesterday = yesYyyy + '-' + yesMm + '-' + yesDd ;

    console.log(Date.parse(yesterday))

    const filterTodo = todoState.todos.filter((item) =>{
        if(todoState.filterStatus === 'false'){
          return true
        }else if(todoState.filterStatus === 'true'){
          return item.isComplete 
        }else if(todoState.filterStatus === 'critical'){
            return item.priority === 'critical'
        }else if(todoState.filterStatus === 'dueToday'){
            return item.dateDue === today 
        }else if(todoState.filterStatus === 'dueTomorrow'){
            return item.dateDue === tomorrow 
        }
        else if(todoState.filterStatus === 'passedDue'){
            return Date.parse(item.dateDue) <= Date.parse(yesterday) 
        }
        return null
      })

return (
    <Container>
         <Table>
            <thead>
                <tr>
                <th>Task Title</th>
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
                    todoState.todos && todoState.todos.length <= 0 ?
                    (
                        <>
                            <p style={{  fontSize:'1vw', width: '100%', marginLeft:'100%' }}>You have no active task.</p>
                        </>
                    ):
                    
                    (
                        filterTodo?.map((td)=>
                        
                    <Tr key={td.id} td={td} setTodo={setTodo} />
                        )
                    )
                }

                

            </tbody>
        </Table>

        {/* {
            maskTransitions(
            (styles, item) => item && <animated.div style={styles} className='shadow' onClick={()=> setShowShadow(false)}>

            </animated.div>
            )
        } */}
        
    </Container>
  )
}

export default TableComponent