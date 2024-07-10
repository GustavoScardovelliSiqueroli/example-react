import React, { useState, useEffect } from 'react';
import '../index.css';
import projet1Api from '../axios/config';
import { useNavigate } from 'react-router';
import NavBar from '../utils/NavBar';

function Login() {
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Zera o localStorage 'jwt' quando o componente é montado
        localStorage.removeItem('jwt');
    }, []);

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await projet1Api.post("/api/login/", {
                username: loginName,
                password: loginPassword
            }).then(function (response) {
                console.log(response);
                localStorage.setItem('jwt', JSON.stringify(response.data));
                navigate("/users");
            })
                .catch(function (error) {
                    console.log(error);
                });;

            // Atualiza o localStorage 'jwt' com a resposta do login
            
        } catch (error) {
            alert("Login incorreto!");
        }
    }

    return (
        <div>
            <NavBar />
            <div className='login-content'>
                <h1>Bem-vindo a TIGESTOR</h1>
                <div className='form-content-login'>
                    <form onSubmit={loginUser}>
                        <label>
                            <input
                                type="text"
                                name="user"
                                id="user"
                                placeholder='Usuário'
                                onChange={(e) => setLoginName(e.target.value)}
                                value={loginName}
                            />
                        </label>
                        <label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Senha'
                                onChange={(e) => setLoginPassword(e.target.value)}
                                value={loginPassword}
                            />
                        </label>
                        <div className="login-buttons">
                            <a href="#" onClick={() => { navigate("/register/") }}><span>Não possui cadastro? Cadastrar</span></a>
                            <input type="submit" value="Entrar" name='submit' id='submit' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
