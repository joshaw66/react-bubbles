import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';



const LoginForm = styled.div`
display: flex;
background-color: grey;
width: 15%;
justify-content: center;
`

const Username = styled.div`
color: black;
`

const Password = styled.div`
color: black;
`

const SubmitButton = styled.button`
color: black;
padding: 10%;
border-radius: 10px;
border: solid lightgrey;

  &:hover {
    background-color: #fff5d9;
    cursor: pointer;
  }
`

const Login = (props) => {
    const [newUser, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({ ...newUser, [e.target.name]: e.target.value })

        console.log(newUser)
    }

    const login = (e) => {
        e.preventDefault()
        console.log(newUser)

        axios   
            .post('http://localhost:5000/api/login', newUser)
            .then(res => {
              localStorage.setItem('token', res.data.payload);
              console.log(res.data.payload);
              props.history.push('/')
            })
            .catch(err => {
              console.log(err);
            })
    }



    return (
        <LoginForm>
            <form onSubmit={e => login(e)}>
              <Username>Username:</Username>
                <input
                  type="text"
                  name="username"
                  onChange={e => handleChange(e)}
                />
                <br></br>
                <Password>Password:</Password>
                <input
                  type='text'
                  name='password'
                  onChange={e => handleChange(e)}
                />
                <br></br>
                <SubmitButton
                   type='submit'
                >LOGIN</SubmitButton>
            </form>
        </LoginForm>
      )
  }
  
  export default Login;
