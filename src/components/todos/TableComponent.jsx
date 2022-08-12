import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {todoFetch} from '../redux/todoSlice'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Tr from './Tr'

const Container = styled.div`
    @media (max-width:480px) {
      overflow: scroll
    }
`
const Table = styled.table`
    .none{
        @media (max-width:480px) {
        display: none;
    }
    }
    @media (max-width:480px) {
        width: 100%;
    }
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
        font-size: .7rem   
        }
        height: 8vh;
        background:#fff;
        color: #000;
        font-size: 1vw;
    }
    td{
        @media (max-width:480px) {
            font-size: 1rem;
        }
        text-align: center;
        font-size: 1vw;
    }
    tbody{
        position: relative;
        .loader{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .loading{
            width: 100px;
        }
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

function TableComponent({setTodo,setTheme}) {
    const todoState = useSelector((state) => state.todos)
    const dispatch = useDispatch()



    useEffect(()=>{
        dispatch(todoFetch())
    },[dispatch])



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
        }else if(todoState.filterStatus === 'pending'){
            return !item.isComplete 
        }else if(todoState.filterStatus === 'critical'){
            return item.priority === 'Important'
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
            <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download as XLS"/>
         <Table id="table-to-xls">
            <thead>
                <tr>
                <th>Task Title</th>
                <th className='none'>Priority</th>
                <th>Status</th>
                <th className='none'>Date Created</th>
                <th className='none'>Date Due</th>
                <th>Operations</th>
                </tr>
            </thead><br />

            <tbody>
                {
                    todoState.fetchTodoStatus === 'pending' ?
                    (<div className='loader'><p>Loading.....</p><img className='loading' src="/loading.gif" alt="" /></div>):
                    todoState.fetchTodoStatus === 'rejected' ?
                    (<p>An error occurred, can't get task</p>):
                    todoState.todos && todoState.todos.length <= 0 ?
                    (
                        <>
                            <p style={{  fontSize:'1vw', width: '100%', marginLeft:'100%' }}>You have no task.</p>
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
    </Container>
  )
}

export default TableComponent