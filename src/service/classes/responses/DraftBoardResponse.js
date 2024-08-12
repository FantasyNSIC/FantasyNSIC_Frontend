import { UserRoster } from '../UserRoster.js';
import { DraftOrder } from '../DraftOrder.js';
import { NSICPlayer } from '../NSICPlayer.js';

/**
 * This class represents a response object for the draft board.
 */

export class DraftBoardResponse {
    /**
     * Represents a response object for the draft board.
     * @param {Array} draft_order - The draft order.
     * @param {Array} available_players - The available players.
     * @param {UserRoster} user_roster - The user roster.
     * @param {Boolean} draft_enable - Whether the draft is enabled.
     */
    constructor(draft_order, available_players, user_roster, draft_enable) {
        this.draft_order = draft_order;
        this.available_players = available_players;
        this.user_roster = user_roster;
        this.draft_enable = draft_enable;
    }

    /**
     * Returns the draft order.
     * @returns {Array} The draft order.
     */
    getDraftOrder() {
        return this._draft_order;
    }

    /**
     * Sets the draft order.
     * @param {Array} draft_order - The draft order.
     */
    setDraftOrder(draft_order) {
        if (!Array.isArray(draft_order)) {
            throw new Error('Draft order must be an array.');
        }
        this._draft_order = draft_order;
    }

    /**
     * Returns the available players.
     * @returns {Array} The available players.
     */
    getAvailablePlayers() {
        return this._available_players;
    }

    /**
     * Sets the available players.
     * @param {Array} available_players - The available players.
     */
    setAvailablePlayers(available_players) {
        if (!Array.isArray(available_players)) {
            throw new Error('Available players must be an array.');
        }
        this._available_players = available_players;
    }

    /**
     * Returns the user roster.
     * @returns {UserRoster} The user roster.
     */
    getUserRoster() {
        return this._user_roster;
    }

    /**
     * Sets the user roster.
     * @param {UserRoster} user_roster - The user roster.
     */
    setUserRoster(user_roster) {
        if (!(user_roster instanceof UserRoster)) {
            throw new Error('User roster must be a UserRoster object.');
        }
        this._user_roster = user_roster;
    }

    /**
     * Returns whether the draft is enabled.
     * @returns {Boolean} Whether the draft is enabled.
     */
    getDraftEnable() {
        return this._draft_enable;
    }

    /**
     * Sets whether the draft is enabled.
     * @param {Boolean} draft_enable - Whether the draft is enabled.
     */
    setDraftEnable(draft_enable) {
        if (typeof draft_enable !== 'boolean') {
            throw new Error('Draft enable must be a boolean.');
        }
        this._draft_enable = draft_enable;
    }

    /**
     * Returns the draft board response as a JSON object.
     * @returns {Object} The draft board response as a JSON object.
     */
    toJson() {
        return {
            draft_order: this.draft_order.map((draft_order) => draft_order.toJson()),
            available_players: this.available_players.map((player) => player.toJson()),
            user_roster: this.user_roster.toJson(),
            draft_enable: this.draft_enable
        };
    }

    /**
     * Returns a draft board response object from a response object.
     * @param {Object} response - The response object.
     * @returns {DraftBoardResponse} The draft board response object.
     */
    static fromResponse(response) {
        return new DraftBoardResponse(
            response.data.draft_order.map((draft_order) => DraftOrder.from_response(draft_order)),
            response.data.available_players.map((player) => NSICPlayer.fromResponse(player)),
            UserRoster.fromResponse(response.data.user_roster),
            response.data.draft_enable
        );
    }
}
