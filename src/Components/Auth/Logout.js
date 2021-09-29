import axios from 'axios';
import Cookies from 'universal-cookie';
import React from 'react';
import { Redirect } from 'react-router';

const cookie = new Cookies();
const Logout = () => {
    // Delete token from cookies 
    console.log(cookie.get('token'))
    cookie.remove('token', {
        expires: 1
    });

    axios.get('http://localhost:3000/api/v1/auth/logout', {withCredentials: true})
    .then(response => {
        console.log(response.data);
        window.location.reload();
    })
    .catch(error => {
        console.log(error);
    })
    return(
        <Redirect to='/' />
    )
};

export default Logout;