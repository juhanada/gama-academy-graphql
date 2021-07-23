import React, { useState } from 'react';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://127.0.0.1:8000/authenticate', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();
            console.log('Sucesso!', data);

        } catch (e) {
            console.log(e);
        }
        
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="email">E-mail: </label>
                <input 
                    id="email" 
                    type="email" 
                    inputMode="email" 
                    autoComplete="username" 
                    placeholder="e-mail@example.com" 
                    value={email} 
                    onChange={handleEmailChange}/>
            </fieldset>
            <fieldset>
                <label htmlFor="password">Senha: </label>
                <input 
                    id="password" 
                    type="password" 
                    autoComplete="current-password" 
                    placeholder="********" 
                    value={password} 
                    onChange={handlePasswordChange}/>
            </fieldset>
            <button type="submit">Entrar</button>
        </form>
    );
}

export default SignIn;