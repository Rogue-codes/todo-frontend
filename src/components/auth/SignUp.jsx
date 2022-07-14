import React from 'react'
import styled from 'styled-components'
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
    width: 40%;
    height: 65vh;
    background: #ffffffd5;
    margin-top: 8%;
    margin-left: 4%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    p{
        text-align: center;
        padding-top:8%;
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
    }
`
function SignUp() {
  return (
    <SignInContainer>
        <Form>
            <p>Create a new account</p>
            <input placeholder="Name" type="text" />
            <input placeholder="E-mail Address" type="text" />
            <input  placeholder='Password' type="text" />
            <button>Sign Up</button>
        </Form>
    </SignInContainer>
  )
}

export default SignUp