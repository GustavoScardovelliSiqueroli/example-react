import React, { useState, useEffect } from 'react';
import NavBar from '../utils/NavBar';
import { useNavigate } from 'react-router';
import projet1Api from '../axios/config';

export default function RegisterCollaborator() {
    const navigate = useNavigate();
    const [collaboratorName, setCollaboratorName] = useState('');
    const [collaboratorEmail, setCollaboratorEmail] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();  // Evita o comportamento padrão do formulário
        const token = JSON.parse(localStorage.getItem("jwt")).token;
        try {
            const response = await projet1Api.post("/collaborators/", {
                'name': collaboratorName,
                'email': collaboratorEmail
            }, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            navigate("/users/");
        } catch (error) {
            // Trate erros, como mostrar uma mensagem de erro
            console.error('Erro ao registrar usuário:', error);
        }
    }

    return (
        <div>
            <NavBar />
            <div className='register-collaborator'>
                <h1>Novo colaborador</h1>
                <form onSubmit={registerUser}>
                    <input 
                        onChange={(e) => setCollaboratorName(e.target.value)} 
                        type="text" 
                        name="collaborator-name" 
                        id="collaborator-name" 
                        placeholder='Nome do colaborador' 
                        value={collaboratorName} 
                    />
                    <input 
                        onChange={(e) => setCollaboratorEmail(e.target.value)} 
                        type="email" 
                        name="collaborator-email" 
                        id="collaborator-email" 
                        placeholder='Email do colaborador' 
                        value={collaboratorEmail} 
                    />
                    <div className='bts-register-collaborator'>
                        <div className='color-cancel' onClick={() => navigate(-1)}>
                            <i className="fi fi-br-angle-left"></i>
                        </div>
                        <button type="submit" className='color-input'>
                            <i className="fi fi-br-check"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
