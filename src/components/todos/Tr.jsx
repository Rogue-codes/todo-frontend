import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { useTransition, animated } from 'react-spring'
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {todoDelete,todoToggle } from '../redux/todoSlice'
import { useDispatch} from 'react-redux'



const Row = styled.tr`
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
                &:hover {
                    background: rgb(240 240 240);
                }
                p{
                    font-size: 1vw;
                    color: grey;
                }
            }
        }
`
function Tr({td,setTodo}) {

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)

    const handleDelete =(_id) => {
        dispatch(todoDelete(_id))
        setShowModal(false)
    }

    const handleToggleComplete = (_id) => {
        dispatch(todoToggle(_id))
        setShowModal(false)
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

  return (
    <Row>
        <td>{td.name}</td>
        <td>{td.author}</td>
        <td>{td.priority}</td>
        <td>{td.isComplete ? 'done' : "not done"}</td>
        <td>{moment(td.date).fromNow()}</td>
        <td>{td.dateDue}</td>
        <td><BiDotsHorizontalRounded size='1.2rem' cursor='pointer' onClick={()=>setShowModal(!showModal)}/></td>
        {
            modalTransitions(
            (styles, item, ) => item && <animated.div style={styles} className='modal'>
                <div className="ico"><AiFillDelete size='1.5rem' cursor='pointer' color='grey' onClick={()=>handleDelete(td._id)} /> <p>delete</p></div>
                <div className="ico"><AiFillEdit size='1.5rem' cursor='pointer' color='grey' onClick={()=>setTodo(td)}/> <p>edit</p></div>
                <div className="ico"><BsFillCheckCircleFill size='1.5rem' cursor='pointer' color='grey'  onClick={()=>handleToggleComplete(td._id)} onClick={()=>setShowModal(false)}/><p>check</p></div>
            </animated.div>
            )
        }
    </Row>
  )
}

export default Tr