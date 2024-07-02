import axios from "axios";

// GET
import { MyTeamInfoResponse } from "./classes/responses/MyTeamInfoResponse.js";
import { AvailablePlayersResponse } from "./classes/responses/AvailablePlayersResponse.js";
import { MatchupInfoResponse } from "./classes/responses/MatchupInfoResponse.js";
import { ScoreboardInfoResponse } from "./classes/responses/ScoreboardInfoResponse.js";
import { LeagueInfoResponse } from "./classes/responses/LeagueInfoResponse.js";
import { StandingsInfoResponse } from "./classes/responses/StandingsInfoResponse.js";

// POST
import { NSICPlayerResponse } from "./classes/responses/NSICPlayerResponse.js";
import { ConfirmationResponse } from "./classes/responses/ConfirmationResponse.js";

// base URL for the backend API
const fantasyURL = "http://localhost:5001"

// API endpoints GET
const getMyTeamInfoEndpoint = `${fantasyURL}/db/getMyTeamInfo`;
const getAvailablePlayersEndpoint = `${fantasyURL}/db/getAvailablePlayers`;
const getMatchupInfoEndpoint = `${fantasyURL}/db/getMatchupInfo`;
const getScoreboardInfoEndpoint = `${fantasyURL}/db/getScoreboardInfo`;
const getLeagueInfoEndpoint = `${fantasyURL}/db/getLeagueInfo`;
const getStandingsInfoEndpoint = `${fantasyURL}/db/getStandingsInfo`;

// API endpoints POST
const getNSICPlayerInfoEndpoint = `${fantasyURL}/db/getNSICPlayerInfo`;
const addNSICPlayerEndpoint = `${fantasyURL}/rq/addNSICPlayerToRoster`;
const dropNSICPlayerEndpoint = `${fantasyURL}/rq/dropNSICPlayerFromRoster`;

// GET functions =============================================================
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

export function getMatchupInfo(user_team_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${getMatchupInfoEndpoint}?user_team_id=${user_team_id}`)
        .then((response) => {
            console.log('Success', response);
            const matchupInfoResponse = MatchupInfoResponse.fromResponse(response);
            resolve(matchupInfoResponse);
        })
        .catch((error) => {
            console.log('Error:', error);
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

// POST functions ============================================================
export function getNSICPlayerInfo(player_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${getNSICPlayerInfoEndpoint}`, {player_id: player_id}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log('Success', response);
            const nsicPlayerResponse = NSICPlayerResponse.fromResponse(response);
            resolve(nsicPlayerResponse);
        })
        .catch((error) => {
            console.log('Error:', error);
            reject(error);
        });
    });
}

export function addNSICPlayerToRoster(player_id, user_team_id, league_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${addNSICPlayerEndpoint}`, {
            player_id: player_id,
            user_team_id: user_team_id,
            league_id: league_id
        }, { headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log('Success', response);
            const confirmationResponse = ConfirmationResponse.fromResponse(response);
            resolve(confirmationResponse);
        })
        .catch((error) => {
            console.log('Error:', error);
            reject(error);
        });
    });
}

export function dropNSICPlayerFromRoster(player_id, user_team_id, league_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${dropNSICPlayerEndpoint}`, {
            player_id: player_id,
            user_team_id: user_team_id,
            league_id: league_id
        }, { headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log('Success', response);
            const confirmationResponse = ConfirmationResponse.fromResponse(response);
            resolve(confirmationResponse);
        })
        .catch((error) => {
            console.log('Error:', error);
            reject(error);
        });
    });
}
