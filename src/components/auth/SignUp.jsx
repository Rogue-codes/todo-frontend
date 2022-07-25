import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { registerUser } from '../redux/authSlice'
const SignInContainer = styled.div`
    width: 100%;
    min-height: 90vh;
    background: url('https://statics.teams.cdn.live.net/hashed/tfl_empty_state_start_chatting-29d936c.svg');
    background-size: cover;
    -webkit-background-size:cover;
    -moz-background-size:cover;
    -o-background-size:cover;
    background-position: 10% 90%;
    border: 1px solid #000;
`
const Form = styled.form`
padding: .5%;
    width: 40%;
    height: auto;
    background: #ffffffd5;
    margin-top: 8%;
    margin-left: 4%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    .error{
        color: red;
        font-weight: 400;
        padding-top: 2px;
    }
    p{
        text-align: center;
        padding-top:5%;
        color: #444791;
        font-weight: 900;
    }
    input{
        display: block;
        width: 80%;
        height: 8vh;
        margin: auto;
        margin-top: 5%;
        color: #444791;
        padding-left: 1%;
        border: 1px solid #444791;
        border-radius: 5px;
        &::placeholder{
            color: #444791;
        }
        &:focus{
            outline: none;
        }
    }
    button{
        width: 80%;
        height: 8vh;
        margin-top: 5%;
        margin-left: 10%;
        border: none;
        background: #444791;
        color: #fff;
        font-size: 1.5vw;
        cursor: pointer;
    }
`
function SignUp() {
    const auth = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [value,setValue] = useState({
        name:'',
        email: '',
        password: '',
    })

    useEffect(()=>{
        if(auth._id){
            navigate('/')
        }
    },[auth._id,navigate])

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser(value))
        console.log(auth)

    }
  return (
    <SignInContainer>
        <Form onSubmit={handleSubmit}>
            <p>Create a new account</p>
            <input placeholder="Name" value={value.name} type="text" onChange={(e)=>setValue({...value, name: e.target.value})} />
            <input placeholder="E-mail Address" value={value.email} type="text" onChange={(e)=>setValue({...value, email: e.target.value})} />
            <input  placeholder='Password' type="password" value={value.password} onChange={(e)=>setValue({...value, password: e.target.value})} />
            <button>{auth.registerStatus === 'pending' ? "submitting" : 'register' }</button>
            {auth.registerStatus === 'rejected' ? (<p className='error'>{auth.registerError}</p>): null}
        </Form>
    </SignInContainer>
  )
}

export default SignUp