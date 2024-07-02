import React, { Component, useState, useEffect } from 'react'
import '../index.css'
import projet1Api from '../axios/config';
import { useNavigate } from 'react-router';

function Login() {

    const [loginName, setLoginName] = useState();
    const [loginPassword, setLoginPassword] = useState();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('jwt', JSON.stringify(items));
    }, [items]);

    const loginUser = async (e) => {
        e.preventDefault();
        try {

            localStorage.setItem('jwt', JSON.stringify(
                await projet1Api.post("/api/login/", {}, {
                    auth: {
                        username: loginName,
                        password: loginPassword
                    }
                }))
            )
            navigate("/users");

        } catch (e) {

            alert("Login incorreto!")
        }
    }

    return (
        <div>
            <div className='login-content'>
                <h1>Bem-vindo a TIGESTOR</h1>

                <div className='form-content-login'>
                    <form onSubmit={(e) => { loginUser(e) }}>

                        <label>

                            <input type="text" name="user" id="user" placeholder='Usuário' onChange={(e) => { setLoginName(e.target.value) }} />
                        </label>

                        <label>
                            <input type="password" name="password" id="password" placeholder='Senha' onChange={(e) => { setLoginPassword(e.target.value) }} />
                        </label>

                        <div className="login-buttons">
                            <a href="./register"><span>Não possui cadastro? Cadastrar</span></a>
                            <input type="submit" value="Entrar" name='submit' id='submit' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login;
