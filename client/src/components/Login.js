import React from 'react';
import { useState } from 'react';
import axios from 'axios';

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
        <div>
            <form onSubmit={e => login(e)}>
              <div>Username:</div>
                <input
                  type="text"
                  name="username"
                  onChange={e => handleChange(e)}
                />
                <br></br>
                <div>Password:</div>
                <input
                  type='text'
                  name='password'
                  onChange={e => handleChange(e)}
                />
                <br></br>
                <button
                   type='submit'
                >Login</button>
            </form>
        </div>
      )
  }
  
  export default Login;
