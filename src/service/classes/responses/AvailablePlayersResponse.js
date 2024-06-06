import { NSICPlayer } from '../NSICPlayer.js';

export class AvailablePlayersResponse {
    constructor(players) {
        this.players = players;
    }

    static fromJson(jsonStr) {
        const data = JSON.parse(jsonStr);
        const players = data.players.map(player => NSICPlayer.fromJson(player));
        return new AvailablePlayersResponse(players);
    }

    toJson() {
        const data = {
            players: this.players.map(player => player.toJson())
        };
        return JSON.stringify(data);
    }

    static fromTuple(tuples) {
        const players = tuples.map(playerTuple => NSICPlayer.fromTuple(playerTuple));
        return new AvailablePlayersResponse(players);
    }

    static fromResponse(response) {
        const players = response.data.players.map(player => NSICPlayer.fromResponse(player));
        return new AvailablePlayersResponse(players);
    }
}
