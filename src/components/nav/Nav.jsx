import React, { useState } from 'react'
import styled from 'styled-components'
import {FaUserAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../redux/authSlice'

const NavBar = styled.nav`
    width: 100%;
    height: 10vh;
    background: #444791;
    display: flex;
    justify-content: space-between;
    padding: 2%;
    align-items: center;
    color: white;

    .animate{
        width: 8%;
        height: 15vh;
        border-top: 4px solid #fffae6;
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        position: fixed;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        left: 92%;
        top: 9%;
        z-index: 50;
        a{
            display: block;
            padding: 4%;
            text-decoration: none;
            font-size: 1vw;
            color: #444791;
        }
    }
`
const Left = styled.div`
    a{
        text-decoration: none;
        color: white;
    }
`
const Right = styled.div`
    
`
function Nav() {
    const [showMenu, setShowMenu]= useState(false)
    const auth = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

    const menuTransitions = useTransition(showMenu, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
      reverse: showMenu,
      delay: 200,
        // config: config.molasses,
      // onRest: () => set(!show),
    })
  return (
    <NavBar>
        <Left>
            <Link to='/'>Tasksify</Link>
        </Left>

        <Right>
           {auth.name} <FaUserAlt size='1.2rem' color='white' onClick={()=>setShowMenu(!showMenu)}/>
        </Right>

        {
        menuTransitions(
        (styles, item) => item && <animated.div style={styles} className='animate' onMouseOut={()=>{setShowMenu(false)}} onMouseOver={()=>{setShowMenu(true)}}>
            {auth._id ? (<Link to='/' onClick={()=>{
              dispatch(logOutUser(null))
              alert('logged out')
            }}>log Out</Link>) : (<Link to='/signIn'>sign In</Link>) }
            {/* <Link to='/signUp'>Sign Up</Link> */}
        </animated.div>
        )
      }
    </NavBar>
  )
}

export default Nav