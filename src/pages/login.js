import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/usercontent';

export default function Login() {

    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const { setUser, user } = useContext(UserContext);

    window.history.pushState(null, null, "/")
    window.onpopstate = window.history.go(1)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://jsonplaceholder.typicode.com/users')
            const users = await data.json()
            setUsers(users)
        }

        fetchData()


    }, [user])

    const checkUsers = async (e) => {
        e.preventDefault()
        console.log('users')
        for (let user of users) {
            if (user.username === username && user.address.zipcode === password) {
                setUser(user)
                navigate(`/home/${username}/info```)
                localStorage.setItem('onlineUser', JSON.stringify(user))
                return
            } else {
                console.log('wrong username or password')
            }
        }

    }



    return (
        <>
            <section className='section'>
                <h1>welcome to my website</h1>
                <form onSubmit={checkUsers} className='form' >
                    <div className='form-row'>
                        <label className='form-label'>username</label>
                        <input className='form-input' type="text" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className='form-row'>
                        <label className='form-label'> password</label>
                        <input className='form-input' type="password" onChange={e => setPassword(e.target.value)} />
                        <button className='btn btn-block' type='submit' >submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}