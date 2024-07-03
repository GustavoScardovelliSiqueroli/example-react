import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router';


function NavBar() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {

        setItems(localStorage.getItem('jwt'));
    }, []); // Array de dependências vazio para executar apenas na montagem

    useEffect(() => {
        const storedItems = localStorage.getItem("jwt");
        try {
            const token = JSON.parse(storedItems).token;
            console.log(token);
            document.getElementById('login-navbar').innerHTML = 'Logout'
        }
        catch {
            document.getElementById('login-navbar').innerHTML = 'Login'
        }
    }, [items]); // Array de dependências vazio para executar apenas na montagem


    return (
        <nav className="navbar" >
            <a href='#' onClick={() => { navigate("/users/") }}><span>Colaboradores</span></a>
            <a href='#' onClick={() => { navigate("/login/") }}><span id='login-navbar' className='login-navbar'>Login</span></a>
        </nav>
    )

}

export default NavBar;
