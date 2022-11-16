import React from 'react'
import { useContext } from 'react'
import UserListItem from '../components/UserListItem'
import { UserContex } from '../context/UserContext'

const UsersList =() => {
    const {users} = useContext(UserContex)
    
  return (
    <>
    {users !== undefined ? users.map(user => {
        return <UserListItem user={user}></UserListItem>
    }) : <p>Loading...</p>}
    </>
   
  )
}


export default UsersList