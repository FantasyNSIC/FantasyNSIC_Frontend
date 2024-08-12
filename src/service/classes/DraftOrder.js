import { NSICPlayer } from './NSICPlayer.js';

/**
 * This class represents a database representation of a single draft entry.
 */

export class DraftOrder {
    /**
     * Represents a single draft entry.
     * @param {number} draft_pick - The draft pick.
     * @param {number} league_id - The league id.
     * @param {number} user_team_id - The user team id.
     * @param {string} team_name - The team name.
     * @param {NSICPlayer} player_id - The player id. Optional.
     */
    constructor(draft_pick, league_id, user_team_id, team_name, player_id = null) {
        this.draft_pick = draft_pick;
        this.league_id = league_id;
        this.user_team_id = user_team_id;
        this.team_name = team_name;
        this.player_id = player_id;
    }

    /**
     * Returns the draft pick.
     * @returns {number} The draft pick.
     */
    getDraftPick() {
        return this.draft_pick;
    }

    /**
     * Sets the draft pick.
     * @param {number} draft_pick - The draft pick.
     */
    setDraftPick(draft_pick) {
        if (typeof draft_pick !== 'number') {
            throw new Error('Draft pick must be a number.');
        }
        this.draft_pick = draft_pick;
    }

    /**
     * Returns the league id.
     * @returns {number} The league id.
     */
    getLeagueId() {
        return this.league_id;
    }

    /**
     * Sets the league id.
     * @param {number} league_id - The league id.
     */
    setLeagueId(league_id) {
        if (typeof league_id !== 'number') {
            throw new Error('League ID must be a number.');
        }
        this.league_id = league_id;
    }

    /**
     * Returns the user team id.
     * @returns {number} The user team id.
     */
    getUserTeamId() {
        return this.user_team_id;
    }

    /**
     * Sets the user team id.
     * @param {number} user_team_id - The user team id.
     */
    setUserTeamId(user_team_id) {
        if (typeof user_team_id !== 'number') {
            throw new Error('User team ID must be a number.');
        }
        this.user_team_id = user_team_id;
    }

    /**
     * Returns the team name.
     * @returns {string} The team name.
     */
    getTeamName() {
        return this.team_name;
    }

    /**
     * Sets the team name.
     * @param {string} team_name - The team name.
     */
    setTeamName(team_name) {
        if (typeof team_name !== 'string') {
            throw new Error('Team name must be a string.');
        }
        this.team_name = team_name;
    }

    /**
     * Returns the player id.
     * @returns {NSICPlayer|null} The player id.
     */
    getPlayerId() {
        return this.player_id;
    }

    /**
     * Sets the player id.
     * @param {NSICPlayer|null} player_id - The player id.
     */
    setPlayerId(player_id) {
        if (player_id !== null && !(player_id instanceof NSICPlayer)) {
            throw new Error('Player ID must be an object.');
        }
        this.player_id = player_id;
    }

    /**
     * Returns the draft order object as a dictionary.
     * @returns {object} The draft order object as a dictionary.
     */
    to_json() {
        if (this.player_id !== null) {
            return {
                draft_pick: this._draft_pick,
                league_id: this._league_id,
                user_team_id: this._user_team_id,
                player_id: this._player_id.toJson()
            };
        } else {
            return {
                draft_pick: this._draft_pick,
                league_id: this._league_id,
                user_team_id: this._user_team_id,
                player_id: null
            };
        }
    }

    /**
     * Returns a draft order object from a response object.
     * @param {object} response - The response object.
     * @returns {DraftOrder} The draft order object.
     */
    static from_response(response) {
        if (response.player_id !== null) {
            return new DraftOrder(
                response.draft_pick,
                response.league_id,
                response.user_team_id,
                response.team_name,
                NSICPlayer.fromResponse(response.player_id)
            );
        } else {
            return new DraftOrder(
                response.draft_pick,
                response.league_id,
                response.user_team_id,
                response.team_name
            );
        }
    }
}
