import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { useTransition, animated } from 'react-spring'
import {AiFillEdit,AiOutlineCheck} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'
import {todoDelete,todoToggle } from '../redux/todoSlice'
import {CgDanger} from 'react-icons/cg'
import {FaTimes} from 'react-icons/fa'
import {IoAlert} from 'react-icons/io5'
import { useDispatch} from 'react-redux'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';



const Row = styled.tr`
        position: relative;
        .notification{
            text-align: center;
            font-size: 1vw;
            font-style: italic;
            color: red};
        }
        .strike{
            text-decoration: line-through;
        }
        .deleteModal{
            @media (max-width:480px) {
                width: 90%;
                margin-left: 5%;
                top: 5%;
            }
            width: 25%;
            position: fixed;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            height: auto;
            background: #fff;
            border-radius: 5px;
            z-index:150;
            left: 37.5%;
            top:37.5%;
            align-items: center;
            h2{
                font-size: 1vw;
                margin-top: 2%;
                padding: 2%;
                padding-left: 5%;
                font-weight: 500;
            }
            p{
                font-size: 1vw;
                padding: 2%;
                color: #444791;
                padding-left: 5%;
            }
            .delCancel{
                width: 100%;
                height: 10vh;
                margin-top: 1%;
                display: flex;
                justify-content: flex-end;
                gap: 5%;
                padding: 2%;
                button{
                    width: 40%;
                    height: 80%;
                    border-radius: 5px;
                    border: none;
                    cursor: pointer;
                    &:nth-child(2){
                        background: red;
                        color:white;
                    }
                }
            }
        }
        .done_notdone{
            padding: 2%;
            display: flex;
            justify-content: center;
            gap: 2%;
            align-items: center;
        }
        .due{
            position: absolute;
            left: 2%;
        }
        .modal{
            @media (max-width:480px) {
                width: 90%;
                margin-left: 5%;
                top: 5%;
            }
            width: 15%;
            position: absolute;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            height: 25vh;
            background: #f8f8f8;
            border-radius: 5px;
            z-index:150;
            left: 90%;
            margin-top: 3%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            .ico{
                display: flex;
                width: 100%;
                height: 30%;
                justify-content: flex-start;
                padding: 10%;
                align-items: center;
                gap: 5%;
                cursor: pointer;
                &:hover {
                    background: rgb(240 240 240);
                }
                p{
                    font-family: 'Source Sans Pro', sans-serif;
                    font-size: 1.3vw;
                    color: #0c0b0b;
                }
            }
        }
        .modalInfo{
            @media (max-width:480px) {
                width: 90%;
                margin-left: 5%;
                top: 5%;
            }
            width: 40%;
            position: fixed;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            height: 45vh;
            background: #f8f8f8;
            border-radius: 5px;
            z-index:150;
            left: 30%;
            top:22%;
            align-items: center;
            .cncel{
                @media (max-width:480px) {
                    top: 2.5%;
                }
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
            ul{
                margin-left: 5%;
                margin-top: 2%;
            }
            .pd{
                width: 100%;
                height: 15vh;
                display: flex;
                justify-content: space-between;
                padding: 2%;
                align-items: center;
                .priority{
                    width: 50%;
                    height: 100%;
                    p{
                        font-size: 1vw;
                        padding-left: 13%;
                    }
                    span{
                        width: 80%;
                        margin: auto;
                        margin-top: 5%;
                        display: block;
                        background: rgb(240 240 240);
                        padding: 3%;
                        font-size: 1vw;
                    }
                }
                .dateDue{
                    width: 50%;
                    height: 100%;
                    p{
                        font-size: 1vw;
                    }
                    span{
                        width: 90%;
                        margin: auto;
                        margin-top: 5%;
                        display: block;
                        background: rgb(240 240 240);
                        padding: 3%;
                        font-size: 1vw;
                    }
                }
            }
            .desc{
                width: 100%;
                height: 15vh;
                width: 90%;
                margin: auto;
                background: rgb(240 240 240);
                p{
                    padding: 2%;
                    font-size: 1vw;
                }
            }
        }
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
        position: relative;
        .shadow{
            width: 100%;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 90;
            background-color: #010214a6;
        }
`
function Tr({td,setTodo}) {

    const tod = new Date()
    let yesterday = new Date(tod)
    yesterday.setDate(yesterday.getDate() - 1)
    let yesDd = String(yesterday.getDate()).padStart(2, '0');
    let yesMm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yesYyyy = yesterday.getFullYear();

    yesterday = yesYyyy + '-' + yesMm + '-' + yesDd ;

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)
    const [showModalTodo, setShowModalTodo] = useState(false)
    const [showShadow, setShowShadow]= useState(false)
    const [showDelModal, setShowDelModal]= useState(false)

    const handleDelete =(_id) => {
        dispatch(todoDelete(_id))
        setShowDelModal(false)
        setShowShadow(false)
    }

    const handleToggleComplete = (_id) => {
        dispatch(todoToggle(_id))
        setShowModal(false)
    }

    const showTodoInfo = () => {
        setShowShadow(true)
        setShowModalTodo(true)

    }

    const hideTodoInfo = () => {
        setShowShadow(false)
        setShowModalTodo(false)
        setShowDelModal(false)        
    }

    const showDeleteModal = () => {
        setShowShadow(true)
        setShowDelModal(true)
    }

    const hideDeleteModal = () => {
        setShowShadow(false)
        setShowDelModal(false)
    }



    const modalTransitions = useTransition(showModal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: showModal,
        delay: 200,
          // config: config.molasses,
        // onRest: () => set(!show),
    })

    const maskTransitions = useTransition(showShadow, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: showShadow,
        delay: 200,
        // config: config.molasses,
        // onRest: () => set(!show),
    })

    const todoInfoModalTransitions = useTransition(showModalTodo, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: showModalTodo,
        delay: 200,
          // config: config.molasses,
        // onRest: () => set(!show),
    })

    const deleteModalTransitions = useTransition(showDelModal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: showDelModal,
        delay: 200,
          // config: config.molasses,
        // onRest: () => set(!show),
    })



  return (
    <Row>
        <Tippy placement={'bottom'} arrow={false} content={<span style={{color:'rgb(240 240 240)', fontSize:'.7rem'}}>Task details:</span>}>
            <td style={{cursor:'pointer'}} onClick={showTodoInfo} className={td.isComplete ? 'strike' : null}>{td.name}</td>
        </Tippy>
        <td>{td.priority}</td>
        <td>{td.isComplete ? <span className='done_notdone'><AiOutlineCheck size='.8rem'  color='green'/>Task Completed</span> : <span className='done_notdone'><IoAlert size='1rem'  color='orange'/>Task Pending</span>}</td>
        <td>{moment(td.date).fromNow()}</td>
        <td><span>{Date.parse(td.dateDue) < Date.parse(td.date) ? <CgDanger className='due' size='1rem' color='red'/>:null}</span>{moment(td.dateDue).format('DD/MM/YY')}</td>
        <Tippy placement={'bottom'} arrow={false} content={<span style={{color:'rgb(240 240 240)', fontSize:'.7rem'}}>Task: {td.name}, more actions</span>}>
            <td>
                <BiDotsHorizontalRounded size='1.2rem' cursor='pointer' onClick={()=>setShowModal(!showModal)}/>
            </td>
        </Tippy>
        {
            modalTransitions(
            (styles, item, ) => item && <animated.div style={styles} className='modal' onMouseOver={()=>{setShowModal(true)}} onMouseOut={()=>{setShowModal(false)}}>
                <div className="ico"  onClick={showDeleteModal}><RiDeleteBinLine size='1rem'  color='grey'/> <p>delete</p></div>
                <div className="ico" onClick={()=>setTodo(td)}><AiFillEdit size='1rem'  color='grey' /> <p>edit</p></div>
                <div className="ico" onClick={()=>handleToggleComplete(td._id)}><AiOutlineCheck size='1rem'  color='grey'/><p>{td.isComplete ? 'uncheck' : "check"}</p></div>
            </animated.div>
            )
        }
        {
            maskTransitions(
            (styles, item) => item && <animated.div style={styles} className='shadow' onClick={hideTodoInfo}>

            </animated.div>
            )
        }
        {
            todoInfoModalTransitions(
            (styles, item, ) => item && <animated.div style={styles} className='modalInfo'>
                <ul>
                    <li><strong>{td.name}</strong></li>
                </ul>

                <div className="pd">
                    <div className="priority">
                        <p>Priority:</p>
                        <span>{td.priority}</span>
                    </div>
                    <div className="dateDue">
                        <p>Status:</p>
                        <span>{td.isComplete ? 'Task Completed' : 'Task not completed'}</span>
                    </div>
                    <div className="dateDue">
                        <p>Date due:</p>
                        <span>{td.dateDue}</span>
                    </div>
                </div>

                <p style={{padding:'1% 7%', fontSize:'1vw'}}>Description:</p>
                <div className="desc">
                    <p>{td.author}</p>
                </div>

                <p className='notification'
                cl={Date.parse(td.dateDue) <= Date.parse(yesterday) ? 'red' : "green"}
                >{Date.parse(td.dateDue) <= Date.parse(yesterday) ? 'This Task is passed due' : 
                null}</p>

                <FaTimes className='cncel' onClick={hideTodoInfo}/>
            </animated.div>
            )
        }
        {
            deleteModalTransitions(
            (styles, item, ) => item && <animated.div style={styles} className='deleteModal'>
              <h2>"<b>{td.name}</b>" will be permanently deleted.</h2>
              <p>You won't be able to undo this action.</p>

              <div className="delCancel">
                <button onClick={hideDeleteModal}>Cancel</button>
                <button onClick={()=>handleDelete(td._id)}>Delete</button>
              </div>

            </animated.div>
            )
        }

    </Row>
  )
}

export default Tr