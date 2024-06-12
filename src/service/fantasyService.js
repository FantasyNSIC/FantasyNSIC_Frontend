import axios from "axios";
import { AvailablePlayersResponse } from "./classes/responses/AvailablePlayersResponse.js";
import { MyTeamInfoResponse } from "./classes/responses/MyTeamInfoResponse.js";
import { LeagueInfoResponse } from "./classes/responses/LeagueInfoResponse.js";

// base URL for the backend API
const fantasyURL = "http://localhost:5001"

// API endpoints
const getMyTeamInfoEndpoint = `${fantasyURL}/db/getMyTeamInfo`;
const getAvailablePlayersEndpoint = `${fantasyURL}/db/getAvailablePlayers`;
const getLeagueInfoEndpoint = `${fantasyURL}/db/getLeagueInfo`;

// GET functions
export function getAvailablePlayers(league_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${getAvailablePlayersEndpoint}?league_id=${league_id}`)
        .then((response) => {
            console.log('Success', response);
            const availablePlayersResponse = AvailablePlayersResponse.fromResponse(response);
            resolve(availablePlayersResponse);
        })
        .catch((error) => {
            console.log('Error:', error.message);
            reject(error);
        });
    });
}

export function getMyTeamInfo(user_team_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${getMyTeamInfoEndpoint}?user_team_id=${user_team_id}`)
        .then((response) => {
            console.log('Success', response);
            const myTeamInfoResponse = MyTeamInfoResponse.fromResponse(response);
            resolve(myTeamInfoResponse);
        })
        .catch((error) => {
            console.log('Error:', error.message);
            reject(error);
        });
    });
}

export function getLeagueInfo(league_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${getLeagueInfoEndpoint}?league_id=${league_id}`)
        .then((response) => {
            console.log('Success', response);
            const leagueInfoResponse = LeagueInfoResponse.fromResponse(response);
            resolve(leagueInfoResponse);
        })
        .catch((error) => {
            console.log('Error:', error);
            reject(error);
        });
    });
}
