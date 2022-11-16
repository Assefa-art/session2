import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import { UserContex } from '../context/UserContext'

const CreateUser = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [age, setAge] = useState()
    const [password, setPasword] = useState()
    const {createUser} = useContext(UserContex)
    
  
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({username, email, phoneNumber, age: +age, password})
            // return
        createUser({username, email, phoneNumber, age: +age, password})
        setUsername('')
        setEmail('')
        setPhoneNumber('')
        setAge('')
        setPasword('')
    }
  return (
    <div>
        <p>Create new user</p>
        <form onSubmit={handleSubmit}>
            <label for='username'>Username</label>
            <input value={username} required={true} onChange={e => {
                setUsername(e.target.value)
                //join again
            }} id='username' type="text" />

            <label for='email'>Email</label>
            <input  value={email}  onChange={e => {
                setEmail(e.target.value)
            }} id='email' type="text" />

            <label for='phonenumber'>Phone number</label>
            <input  value={phoneNumber} onChange={e => {
                setPhoneNumber(e.target.value)
            }} id='phoneNumber' type="text" />

            <label for='age'>Age</label>
            <input  value={age} required={true} onChange={e => {
                setAge(e.target.value)
            }} id='username' type="number" />

            <label for='password'>Age</label>
            <input  value={password} required={true} onChange={e => {
                setPasword(e.target.value)
            }} id='password' type="password" />

            <Button type='submit' onClick={() => {}} text='Submit' ></Button>
        </form>
    </div>
  )
}

export default CreateUser