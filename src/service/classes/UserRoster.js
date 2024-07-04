import { NSICPlayer } from "./NSICPlayer.js";

/**
 * This class is a representation of a user's roster. It contains a list
 * of players within their respective spots on the roster.
 */
export class UserRoster {
    /**
     * Constructor for UserRoster class
     * @param {NSICPlayer[]} QB - The list of quarterbacks on the roster
     * @param {NSICPlayer[]} RB - The list of running backs on the roster
     * @param {NSICPlayer[]} WR - The list of wide receivers on the roster
     * @param {NSICPlayer[]} TE - The list of tight ends on the roster
     * @param {NSICPlayer[]} K - The list of kickers on the roster
     * @param {NSICPlayer[]} BENCH - The list of bench players on the roster
     */
    constructor() {
        this.QB = [];
        this.RB = [];
        this.WR = [];
        this.TE = [];
        this.K = [];
        this.BENCH = [];
    }

    /**
     * Adds a player to the roster.
     *
     * @param {NSICPlayer} player - The player to add.
     * @param {string} position - The position of the player.
     */
    addPlayer(player, position) {
        if (position === 'QB') {
            this.QB.push(player);
        } else if (position === 'RB') {
            this.RB.push(player);
        } else if (position === 'WR') {
            this.WR.push(player);
        } else if (position === 'TE') {
            this.TE.push(player);
        } else if (position === 'K') {
            this.K.push(player);
        } else if (position === 'BENCH') {
            this.BENCH.push(player);
        }
    }

    /**
     * Adds an empty player to the roster.
     *
     * @param {string} position - The position of the player.
     */
    addEmptyPlayer(position) {
        this.addPlayer(NSICPlayer.empty_player(), position);
    }

    /**
     * Removes a player from the roster.
     * @param {NSICPlayer} player - The player to remove.
     */
    removePlayer(player) {
        if (this.QB.includes(player)) {
            this.QB.splice(this.QB.indexOf(player), 1);
        } else if (this.RB.includes(player)) {
            this.RB.splice(this.RB.indexOf(player), 1);
        } else if (this.WR.includes(player)) {
            this.WR.splice(this.WR.indexOf(player), 1);
        } else if (this.TE.includes(player)) {
            this.TE.splice(this.TE.indexOf(player), 1);
        } else if (this.K.includes(player)) {
            this.K.splice(this.K.indexOf(player), 1);
        } else if (this.BENCH.includes(player)) {
            this.BENCH.splice(this.BENCH.indexOf(player), 1);
        }
    }

    /**
     * returns roster list based on input.
     * @param {string} position - The position of the player.
     * @returns {NSICPlayer[]} - The list of players in the position.
     */
    getRosterList(position) {
        if (position === 'QB') {
            return this.QB;
        } else if (position === 'RB') {
            return this.RB;
        } else if (position === 'WR') {
            return this.WR;
        } else if (position === 'TE') {
            return this.TE;
        } else if (position === 'K') {
            return this.K;
        } else if (position === 'BENCH') {
            return this.BENCH;
        }
    }

    /**
     * Filters bench player based on input position.
     * @param {string} position - The position of the player.
     * @returns {NSICPlayer[]} - The list of players in the bench.
     */
    getBenchList(position) {
        return this.BENCH.filter((player) => player.pos === position || player.player_id === 0);
    }

    /**
     * Returns a dictionary representation of the roster.
     * @returns {Object} - The dictionary representation of the roster.
     */
    toJson() {
        return {
            QB: this.QB.map((player) => player.toJson()),
            RB: this.RB.map((player) => player.toJson()),
            WR: this.WR.map((player) => player.toJson()),
            TE: this.TE.map((player) => player.toJson()),
            K: this.K.map((player) => player.toJson()),
            BENCH: this.BENCH.map((player) => player.toJson())
        };
    }

    /**
     * Returns a UserRoster object from a response object.
     * @param {Object} response - The JSON string to convert.
     * @returns {UserRoster} - The UserRoster object.
     */
    static fromResponse(response) {
        const userRoster = new UserRoster();
        userRoster.QB = response.QB.map((player) => NSICPlayer.fromResponse(player));
        userRoster.RB = response.RB.map((player) => NSICPlayer.fromResponse(player));
        userRoster.WR = response.WR.map((player) => NSICPlayer.fromResponse(player));
        userRoster.TE = response.TE.map((player) => NSICPlayer.fromResponse(player));
        userRoster.K = response.K.map((player) => NSICPlayer.fromResponse(player));
        userRoster.BENCH = response.BENCH.map((player) => NSICPlayer.fromResponse(player));
        return userRoster;
    }
}
