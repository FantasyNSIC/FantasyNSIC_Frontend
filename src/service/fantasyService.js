import axios from "axios";
import { MyTeamInfoResponse } from "./classes/responses/MyTeamInfoResponse.js";
import { AvailablePlayersResponse } from "./classes/responses/AvailablePlayersResponse.js";
import { ScoreboardInfoResponse } from "./classes/responses/ScoreboardInfoResponse.js";
import { LeagueInfoResponse } from "./classes/responses/LeagueInfoResponse.js";
import { StandingsInfoResponse } from "./classes/responses/StandingsInfoResponse.js";

// base URL for the backend API
const fantasyURL = "http://localhost:5001"

// API endpoints
const getMyTeamInfoEndpoint = `${fantasyURL}/db/getMyTeamInfo`;
const getAvailablePlayersEndpoint = `${fantasyURL}/db/getAvailablePlayers`;
const getScoreboardInfoEndpoint = `${fantasyURL}/db/getScoreboardInfo`;
const getLeagueInfoEndpoint = `${fantasyURL}/db/getLeagueInfo`;
const getStandingsInfoEndpoint = `${fantasyURL}/db/getStandingsInfo`;

// GET functions
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

export function getScroreboardInfo(league_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${getScoreboardInfoEndpoint}?league_id=${league_id}`)
        .then((response) => {
            console.log('Success', response);
            const scoreboardInfoResponse = ScoreboardInfoResponse.fromResponse(response);
            resolve(scoreboardInfoResponse);
        })
        .catch((error) => {
            console.log('Error:', error);
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

export function getStandingsInfo(league_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${getStandingsInfoEndpoint}?league_id=${league_id}`)
        .then((response) => {
            console.log('Success', response);
            const standingsInfoResponse = StandingsInfoResponse.fromResponse(response);
            resolve(standingsInfoResponse);
        })
        .catch((error) => {
            console.log('Error:', error);
            reject(error);
        });
    });
}
