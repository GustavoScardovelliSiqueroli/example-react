import React, { Component } from 'react'
import NavBar from '../utils/NavBar'
import { useNavigate } from 'react-router'

export default function Register (){
    const navigate = useNavigate(); 

    return (
        <div >
            <NavBar></NavBar>
            <div className="register-main">
                <h1>Fazer registro em TIGESOTR</h1>
                <form name='form-register' style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <input type="text" name='user' id='user' placeholder='Usuário' />
                    <input type="password" name='password' id='password' placeholder='Senha' />
                    <input type="password" name='valid-pwd' id='valid-pwd' placeholder='Repita sua senha' />
                    <div className="bts-register">
                        <a href="#" onClick={ ()=>{navigate("/login/")}}><span>Voltar para o login</span></a>
                        <input type="submit" value="Cadastrar" />

                    </div>

                </form>
            </div>
        </div>
    )
}
