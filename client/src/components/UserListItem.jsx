import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContex } from '../context/UserContext'
import Button from './Button'

 const UserWrapper = styled.div`
    padding: 10px 10px;
   border-bottom: 1px solid #eeeeee;
    /* width: 50%; */
    background-color: #e7e7e7;
    margin-bottom: 10px;
    border-radius: 30px;
    margin-left: 20px;
    margin-right: 20px;
   ` /* color: white; */


const UserListItem = ({user}) => {
    const {deleteUser, setSelectedUser} = useContext(UserContex)
   
  return (
    <UserWrapper>
        {user.username}
        <br />
        {user.email}
        <br />
        {user.phoneNumber}
        <br />
        {user.age}
        <br/>
        <span><button text={'Delete'} onClick={() => {
            deleteUser(user._id)
        }}>Delete</button>
        
        <Button text={'Edit'} onClick={() => {
            setSelectedUser(user)
        }}></Button></span>
    </UserWrapper>
  )
}

export default UserListItem