import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'

const StyledInput = styled.input`
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: block;
    border: 1px solid #e6e6e6;
    font-size: 15px;
    border-radius: 10px;
    width: 250px;
    margin-bottom: 10px;
`

const CenteredForm = styled.div`
     width : 100vw;
        height: 100vh;
        display:box;
        justify-content:center;
        align-items:center;
`

const ErrorMessage = styled.p`
  color : #ff5a5a;
  text-align: center;
`

export const Login = () => {
    const navigate = useNavigate()
    const [usernmame, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const handleLogin = (username, password) => {
      axios.post('http://localhost:4000/users/login', {username , password}).then(res => {
        // console.log(res.data.succcess)
       if(res.data.success) {
        //save the token in local storage
        localStorage.setItem('token', res.data.token)
        navigate('/users')
       }
       else{
        setError(res.data.msg)
       }
      })
    }
  return(
       <CenteredForm>
        <form onSubmit={e => {
          
          e.preventDefault()
          handleLogin(usernmame, password)
        }} action="">
        <p style={{textAlign:'center'}}>Login Page</p>
        <StyledInput onChange={e => {
          setUsername(e.target.value)
        }} type="text" placeholder='Username' />
        <StyledInput onChange={(e) => {
          setPassword(e.target.value)
        }} type="password" placeholder='Password' />
        {error && <ErrorMessage>{error}</ErrorMessage>}
       <Button text={'Login'}   />
       </form> 
       </CenteredForm>  
  ) 
}
  

