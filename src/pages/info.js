import React, { useContext } from 'react'
import { UserContext } from '../context/usercontent';
import { useNavigate } from 'react-router-dom';

export default function Info() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate()

    // Object.entries(user).map(([key, value]) => {
    //     return(<h1>{key}: {value}</h1>)
    // })

    const userlocal = JSON.parse(localStorage.getItem('onlineUser'));


    return (
        <div>
            <h1>{userlocal.name} info: </h1>
            <h3>Username: {userlocal.username}</h3>
            <h3>Email: {userlocal.email}</h3>
            <h3>Street: {userlocal.address.street}</h3>
            <h3>Suite: {userlocal.address.suite}</h3>
            <h3>City: {userlocal.address.city}</h3>
            <h3>Phone: {userlocal.phone}</h3>
            <h3>Website: {userlocal.website}</h3>
            <h3>Company name: {userlocal.company.name}</h3>
            <h3>Bs: {userlocal.company.bs}</h3>
            
        </div>
    )
}