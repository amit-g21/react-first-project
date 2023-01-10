import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../context/usercontent';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';

export default function Home() {

    const { user } = useContext(UserContext);
    const { username } = useParams()
    const navigate = useNavigate()
    const userlocal = JSON.parse(localStorage.getItem('onlineUser'));

    const userloclUserName = userlocal.username

    const logOut = () => {
        localStorage.removeItem('onlineUser');
        navigate('/')
    }


    return (
        <div>
            <h3>hello {userlocal.username} ,</h3>

            <Link
                to={`/home/:${userloclUserName}/info`}
                className="btn">info</Link>

            <Link
                to={`/home/:${userloclUserName}/ToDoList`}
                className="btn">ToDo List</Link>

            <Link
                to={`/home/:${userloclUserName}/posts`}
                className="btn">posts</Link>

            <Link
                to={`/home/:${userloclUserName}/albums`}
                className="btn">albums</Link>

                <button
                    onClick={logOut}
                    className="btn">Log out</button>
            

            <Outlet />
        </div>
    )
}