import { NSICPlayer } from "./NSICPlayer.js";

/**
 * This class is a representation of a user's roster. It contains a list
 * of players and their status (active, benched, or injured).
 */
export class UserRoster {
    constructor() {
        this.roster = [];
    }

    /**
     * Add a player to the roster with the specified status.
     *
     * @param {NSICPlayer} player - The player object to add.
     * @param {string} status - The status of the player ('active', 'benched', or 'injured').
     */
    addPlayer(player, status) {
        this.roster.push({ player, status });
    }

    /**
     * Remove a player from the roster.
     *
     * @param {number} playerId - The player ID of the player to remove.
     */
    removePlayer(playerId) {
        this.roster = this.roster.filter((p) => p.player.player_id !== playerId);
    }

    /**
     * Search for a player by position and status.
     * 
     * @param {string} position - The position of the player.
     * @param {string} status - The status of the player.
     */
    searchPlayer(position, status) {
        if (position === 'ALL') {
            return this.roster.filter((p) => p.status === status);
        }
        return this.roster.filter((p) => p.player.pos === position && p.status === status);
    }

    /**
     * Convert the roster to a dictionary.
     *
     * @returns {Object} - The dictionary representation of the roster.
     */
    toDict() {
        const rosterDict = this.roster.reduce((dict, player, index) => {
            dict[index] = player.player.toDict();
            return dict;
        }, {});
        return rosterDict;
    }

    /**
     * Convert the roster to a JSON string.
     *
     * @returns {string} - The JSON representation of the roster.
     */
    toJson() {
        return JSON.stringify(this.roster, (key, value) => {
            if (typeof value === 'object' && value !== null && 'toDict' in value) {
                return value.toDict();
            }
            return value;
        });
    }

    /**
     * Create a UserRoster object from a tuple.
     *
     * @param {Array} tuple - The tuple representing the roster.
     * @returns {UserRoster} - The UserRoster object created from the tuple.
     */
    static fromTuple(tuple) {
        const roster = new UserRoster();
        tuple.forEach((item) => {
            const player = NSICPlayer.fromTuple(item);
            const status = item[1];
            roster.addPlayer(player, status);
        });
        return roster;
    }

    /**
     * Create a UserRoster object from a response object string.
     *
     * @param {list} json - list of player to add into the roster.
     * @returns {UserRoster} - The UserRoster object created from the JSON string.
     */
    static fromResponse(player_list) {
        const roster = new UserRoster();
        player_list.forEach((player) => {
            roster.addPlayer(NSICPlayer.fromResponse(player['player']), player['status']);
        });
        return roster;
    }
}