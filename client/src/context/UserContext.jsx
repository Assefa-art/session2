import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { createContext } from 'react'

export const UserContex = createContext()

const UserContextProvider = ({children}) => {
    const [users, setUsers] = useState()
    const [selectedUser, setSelectedUser] = useState({})

    const fetchUsers = () => {
        axios.get('http://localhost:4000/users/').then(users => {
          setUsers(users.data.users)
        })
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost:4000/users/${id}`).then(response => {
           fetchUsers()
        })
    }

    const createUser = (userInfo) => {
        axios.post(`http://localhost:4000/users`, {...userInfo}).then(response => {
           fetchUsers()
        })
    }
    const updateUser = (id, information) => {
      console.log(information)
        axios.patch(`http://localhost:4000/users/${id}`, information).then(response => {
          console.log(response)
           fetchUsers()
           setSelectedUser(null)
        }).catch(err => {
          console.log(err)
        })
    }

    useEffect(() => {
      fetchUsers()
    //   axios.get('http://localhost:4000/users/').then(users => {
    //     setUsers(users.data.users)
    //   })
      }, [])
      
  return (
    <UserContex.Provider value={{users, deleteUser, createUser, updateUser, selectedUser, setSelectedUser}}>
        {children}
    </UserContex.Provider>
  )
}

export default UserContextProvider