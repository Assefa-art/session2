
import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import { UserContex } from '../context/UserContext'

const UpdateUser = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState( )
    const [age, setAge] = useState( )
  
    const {updateUser, selectedUser, setSelectedUser} = useContext(UserContex)
    const handleSubmit = (e) => {
        e.preventDefault()
        updateUser(selectedUser._id,{username, email, phoneNumber, age : Number(age) || null})
        // console.log(updateUser)
        setUsername('')
        setEmail('')
        setPhoneNumber('')
        setAge('')
        setSelectedUser(null)
        //join again
    }
  return (
    <div>
        <p>Update user</p>
        <form onSubmit={handleSubmit}>
            <label for='username'>User Name</label>
            <input value={username || selectedUser && selectedUser.username} required={true} onChange={e => {
                setUsername(e.target.value)
                //join again
            }} id='username' type="text" />

            <label for='email'>Email</label>
            <input  value={email || selectedUser && selectedUser.email}  onChange={e => {
                setEmail(e.target.value)
            }} id='email' type="text" />

            <label for='phonenumber'>Phone number</label>
            <input  value={phoneNumber || selectedUser && selectedUser.phoneNumber} onChange={e => {
                setPhoneNumber(e.target.value)
            }} id='phoneNumber' type="text" />

            <label for='age'>Age</label>
            <input  value={age || selectedUser && selectedUser.age} required={true} onChange={e => {
                setAge(e.target.value)
            }} id='username' type="number" />

            <Button type='UpdateUser' onClick={() => {}} text='Update' ></Button>
        </form>
    </div>
  )
}


export default UpdateUser