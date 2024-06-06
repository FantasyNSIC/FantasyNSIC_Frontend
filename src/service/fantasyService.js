import axios from "axios";
import { AvailablePlayersResponse } from "./classes/responses/AvailablePlayersResponse.js";

// base URL for the backend API
const fantasyURL = "http://127.0.0.1:5001"

// API endpoints
const getAvailablePlayersEndpoint = `${fantasyURL}/db/getAvailablePlayers`;

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
