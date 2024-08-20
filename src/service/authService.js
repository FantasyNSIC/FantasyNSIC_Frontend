import axios from "axios";

// base URL for the backend API
const fantasyURL = "https://localhost:5001"

// API Auth endpoints
const loginEndpoint = `${fantasyURL}/auth/login`;
const logoutEndpoint = `${fantasyURL}/auth/logout`;
const verifyUserEndpoint = `${fantasyURL}/auth/verifyUser`;

// Auth functions =============================================================
export function fantasy_login(username, password) {
    return new Promise((resolve, reject) => {
        axios.post(`${loginEndpoint}`, {
            username: username,
            password: password
        }, { headers: {
            'Content-Type': 'application/json'
        }, withCredentials: true
        })
        .then((response) => {
            console.log('Success', response);
            resolve(response);
        })
        .catch((error) => {
            console.log('Error:', error.message);
            reject(error);
        });
    });
}

export function fantasy_logout() {
    return new Promise((resolve, reject) => {
        axios.post(`${logoutEndpoint}`, {
        }, { withCredentials: true })
        .then((response) => {
            console.log('Success', response);
            resolve(response);
        })
        .catch((error) => {
            console.log('Error:', error.message);
            reject(error);
        });
    });
}

export function verify_user() {
    return new Promise((resolve, reject) => {
        axios.get(`${verifyUserEndpoint}`, {
            withCredentials: true,
        })
        .then((response) => {
            console.log('Success', response);
            resolve(response);
        })
        .catch((error) => {
            console.log('Error:', error.message);
            reject(error);
        });
    });
}

export function verify_user_team_creds(user_teams, user_team_id, league_id) {
    for (const team of user_teams) {
        if (team.user_team_id.toString() === user_team_id && team.league_id.toString() === league_id) {
            return true;
        }
    }
    return false;
}
