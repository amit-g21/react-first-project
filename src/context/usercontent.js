import { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom";


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://jsonplaceholder.typicode.com/users')
      const usersJson = await data.json()
      setUsers(usersJson)
      let onUser = JSON.parse(localStorage.getItem('onlineUser'))
      for (let user of usersJson) {
        if (user.username === onUser) {
          setUser(user)
          console.log(user.username)
        }
      }
    }

    fetchData()


  }, [])


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}