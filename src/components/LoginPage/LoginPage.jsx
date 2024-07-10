import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { fantasy_login, fantasy_logout } from '../../service/authService';
import './LoginPage.less';

const LoginPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showUserTeams, setShowUserTeams] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [userTeams, setUserTeams] = useState([]);

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
                if (response.data.user_teams.length === 1) {
                    const resUserTeamId = response.data.user_teams[0].user_team_id;
                    const resLeagueId = response.data.user_teams[0].league_id;
                    navigate(`/myteam?user_team_id=${resUserTeamId}&league_id=${resLeagueId}`);
                }
                else {
                    setUserTeams(response.data.user_teams);
                    setShowLogin(false);
                    setShowUserTeams(true);
                }
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

    const TeamSelectionPage = ({userTeams = []}) => {
        const [selectedTeam, setSelectedTeam] = useState({ userTeamId: '', leagueId: '' });

        function handleTeamSelection(event, userTeamId, leagueId) {
            const isChecked = event.target.checked;
            if (isChecked) {
                setSelectedTeam({ userTeamId, leagueId });
            } else {
                setSelectedTeam({ userTeamId: '', leagueId: '' });
            }
        };

        function handleSelectButton() {
            setPauseButtons(true);
            setShowError(false);
            if (selectedTeam.userTeamId === '' || selectedTeam.leagueId === '') {
                setErrorMessage('Please select a team.');
                setShowError(true);
                setPauseButtons(false);
                return;
            }
            navigate(`/myteam?user_team_id=${selectedTeam.userTeamId}&league_id=${selectedTeam.leagueId}`);
        }

        async function handleBackButton() {
            try {
                setPauseButtons(true);
                await fantasy_logout();
                setShowUserTeams(false);
                setShowLogin(true);
            } catch (error) {
                console.error('Error:', error.message);
                setErrorMessage(error.message);
                setShowError(true);
            } finally {
                setPauseButtons(false);
            }
        }

        return (
            <div className='login-page-subheading-container'>
                <div className='login-page-login-text-container'>
                    <div className='login-page-login-text'>Select Team:</div>
                </div>
                <form>
                    {userTeams.map((team) => (
                        <div className='login-page-team-selection-team-box' key={team.user_team_id}>
                            <input className='login-page-team-selection-checkbox'
                                type="checkbox"
                                id={`team-${team.user_team_id}`}
                                name="teamSelection"
                                value={team.user_team_id}
                                onChange={(e) => handleTeamSelection(e, team.user_team_id, team.league_id)}
                                checked={selectedTeam.userTeamId === team.user_team_id}/>
                            <label htmlFor={`team-${team.user_team_id}`}>
                                <div className='login-page-team-selection-team-text'>
                                    {team.team_name} - {team.league_name}</div>
                            </label>
                        </div>))}
                </form>
                <div className='login-page-team-selection-buttons-container'>
                    <button className='login-page-sign-in-button'
                        onClick={() => { if (!pauseButtons) {handleSelectButton()}}}>
                        Select
                    </button>
                    <div className='login-page-buttons-divider-container'>
                        <div className='login-page-buttons-divider'></div>
                    </div>
                    <button className='login-page-back-button'
                        onClick={() => { if (!pauseButtons) {handleBackButton()}}}>
                        Back
                    </button>
                </div>
                {showError && (<div className='login-page-error-container'>
                        <div className='login-page-error-text-container'>
                            <div className='login-page-error-text'>{errorMessage}</div>
                        </div>
                    </div>)}
            </div>
        );
    }

    return (
        <div className='login-page-main-container'>
            <div className='login-page-content-container'>
                <div className='login-page-heading-container'>
                    <div className='login-page-heading-text'>NSIC Fantasy</div>
                </div>
                <div className='login-page-heading-divider'></div>
                {showLogin && (<div className='login-page-subheading-container'>
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
                </div>)}
                {showUserTeams && (<div className='login-page-subheading-container'>
                    <TeamSelectionPage userTeams={userTeams} />
                </div>)}
            </div>
        </div>
    );
};

export default LoginPage;