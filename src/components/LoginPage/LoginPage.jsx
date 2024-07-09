import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { fantasy_login } from '../../service/authService';
import './LoginPage.less';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [pauseButtons, setPauseButtons] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            setPauseButtons(true);
            if (username === '' || password === '') {
                setErrorMessage('Credentials cannot be empty.');
                setShowError(true);
                return;
            }
            setPassword('');
            setShowError(false);
            const response = await fantasy_login(username, password);
            if (response.data.status === true) {
                navigate(`/myteam?user_team_id=${response.data.user_teams.user_team_id}&league_id=${response.data.user_teams.league_id}`);
            }
            else {
                setErrorMessage(response.data.message);
                setShowError(true);
            }
        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage(error.message);
            setShowError(true);
        } finally {
            setPauseButtons(false);
        }
    };

    return (
        <div className='login-page-main-container'>
            <div className='login-page-content-container'>
                <div className='login-page-heading-container'>
                    <div className='login-page-heading-text'>NSIC Fantasy</div>
                </div>
                <div className='login-page-heading-divider'></div>
                <div className='login-page-subheading-container'>
                    <div className='login-page-login-text-container'>
                        <div className='login-page-login-text'>Login</div>
                    </div>
                    <div className='login-page-info-text'>Username:</div>
                    <div className='login-page-input-container'>
                        <input
                            className='login-page-input-box'
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className='login-page-info-text'>Password:</div>
                    <div className='login-page-input-container'>
                        <input
                            className='login-page-input-box'
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className='login-page-buttons-container'>
                        <button className='login-page-sign-in-button'
                            onClick={() => { if (!pauseButtons) {handleSubmit()}}}>
                            Sign In
                        </button>
                    </div>
                    {showError && (<div className='login-page-error-container'>
                        <div className='login-page-error-text-container'>
                            <div className='login-page-error-text'>{errorMessage}</div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;