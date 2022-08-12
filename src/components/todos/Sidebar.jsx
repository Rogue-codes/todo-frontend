import React from 'react'
import styled from 'styled-components'
import {BsSun,BsListTask} from 'react-icons/bs'
import {BiTaskX} from 'react-icons/bi'
import {GrCheckmark} from 'react-icons/gr'
import {MdOutlinePendingActions,MdToday} from 'react-icons/md'
import {CgDanger} from 'react-icons/cg'
import moment from 'moment'
import { useSelector } from 'react-redux'
import {FaTimes} from 'react-icons/fa'

const Side = styled.aside`
    @media (max-width:480px) {
        left: ${props => props.mb};
        width: 100%;
        border: 11px solid #000;
        z-index:80
    }
    width: 20%;
    background:#fff;
    min-height: 100vh;
    position: absolute;
    left: ${props => props.ps};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    .top{
        display: flex;
        width: 100%;
        background: #ecf6fd;
        justify-content: flex-start;
        gap: 5%;
        padding: 2%;
        align-items: center;
    }
    .day{
        display: flex;
        width: 100%;
        height: 18vh;
        background: #ecf6fd;
        justify-content: flex-start;
        gap: 5%;
        padding: 2%;
        align-items: center;
        margin-bottom: 10%;
    }
    .date{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 5%;
        padding: 5%;
        &:hover {
            background: rgb(240 240 240);
        }
    }
    button{
        @media (max-width:480px) {
            font-size: 1rem;
        }
        width: 80%;
        margin-left: 10%;
        margin-top: 10%;
        height: 10vh;
        border: none;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background: #444791;
        color: #fff;
        cursor: pointer;
        font-size: 1.3vw;
    }
    .cncel{
        @media (max-width:480px) {
            display: block;
            top: 2.5%;
        }
        display: none;
        position: absolute;
        top: 5%;
        left: 90%;
        color: grey;
        font-size: 1.3rem;
        cursor: pointer;
        &:hover {
            color: #000;
        }
    }
`

function Sidebar({sideBar,setSideBar}) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd ;

    const tod = new Date()
    let yesterday = new Date(tod)
    yesterday.setDate(yesterday.getDate() - 1)
    let yesDd = String(yesterday.getDate()).padStart(2, '0');
    let yesMm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yesYyyy = yesterday.getFullYear();

    yesterday = yesYyyy + '-' + yesMm + '-' + yesDd ;


    const todayDate = new Date();

    const totalTask = useSelector((state) => state.todos.todos)

    const completed = totalTask.filter((item) => item.isComplete)

    const pending = totalTask.filter((item) => !item.isComplete)

    const dueToday = totalTask.filter((item) => item.dateDue === today)

    const passedDue = totalTask.filter((item) => Date.parse(item.dateDue) <= Date.parse(yesterday))

    const important = totalTask.filter((item) => item.priority === 'Important')

    console.log(totalTask.length)

  return (
    <Side ps={sideBar ? "0%" : "-20%"} mb={sideBar ? "0%" : "-180%"}>
        <FaTimes className='cncel' onClick={()=>setSideBar(false)}/>
        <div className="top">
            <BsSun size='1.5rem'/><p>My day</p>
        </div>
        <div className="day">
            <p><b>{moment(todayDate).format('dddd.do.MMMM.YYYY')}</b></p>
        </div>

        <div className="date">
            <BsListTask size='1.5rem'/><p>Total Task : <b>{totalTask.length}</b></p>
        </div>

        <div className="date">
            <GrCheckmark/><p>Completed Task : <b>{completed.length}</b></p>
        </div>

        <div className="date">
           <MdOutlinePendingActions size='1.5rem'/><p>Pending : <b>{pending.length}</b></p>
        </div>

        <div className="date">
            <MdToday size='1.5rem'/><p>Todays Task : <b>{dueToday.length}</b></p>
        </div>

        <div className="date">
            <BiTaskX size='1.5rem'/><p>Tasks Passed due : <b>{passedDue.length}</b></p>
        </div>

        <div className="date">
            <CgDanger size='1.5rem'/><p>Important Tasks : <b>{important.length}</b></p>
        </div>

        {/* <Link to='/charts'><button>GET INSIGHTS</button></Link> */}
        
    </Side>
  )
}

export default Sidebar