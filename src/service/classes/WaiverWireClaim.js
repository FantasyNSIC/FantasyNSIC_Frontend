import { NSICPlayer } from './NSICPlayer.js';

/**
 * This class represents a waiver wire claim in a league.
 */

export class WaiverWireClaim {
    /**
     * A waiver wire claim representation in the database.
     * @param {NSICPlayer} addedPlayer - The player being added.
     * @param {NSICPlayer} droppedPlayer - The player being dropped, can be null.
     */
    constructor(addedPlayer, droppedPlayer) {
        this.addedPlayer = addedPlayer;
        this.droppedPlayer = droppedPlayer;
    }

    /**
     * Returns the player being added.
     * @returns {NSICPlayer} - The player being added.
     */
    getAddedPlayer() {
        return this.addedPlayer;
    }

    /**
     * Sets the player being added.
     * @param {NSICPlayer} addedPlayer - The player being added.
     */
    setAddedPlayer(addedPlayer) {
        this.addedPlayer = addedPlayer;
    }

    /**
     * Returns the player being dropped, can be null.
     * @returns {NSICPlayer} - The player being dropped.
     */
    getDroppedPlayer() {
        return this.droppedPlayer;
    }

    /**
     * Sets the player being dropped, can be null.
     * @param {NSICPlayer} droppedPlayer - The player being dropped.
     */
    setDroppedPlayer(droppedPlayer) {
        this.droppedPlayer = droppedPlayer;
    }

    /**
     * Converts the waiver wire claim object to a JSON object.
     * @returns {object} - The JSON object representing the waiver wire claim.
     */
    toJson() {
        if (this.droppedPlayer === null) {
            return {
                addedPlayer: this.addedPlayer.toJson(),
                droppedPlayer: null
            };
        }
        return {
            addedPlayer: this.addedPlayer.toJson(),
            droppedPlayer: this.droppedPlayer.toJson()
        };
    }

    /**
     * Converts a JSON object to a waiver wire claim object.
     * @param {object} json - The JSON object representing the waiver wire claim.
     * @returns {WaiverWireClaim} - The waiver wire claim object.
     */
    static fromJson(json) {
        if (json.droppedPlayer === null) {
            return new WaiverWireClaim(
                NSICPlayer.fromJson(json.addedPlayer),
                null
            );
        }
        return new WaiverWireClaim(
            NSICPlayer.fromJson(json.addedPlayer),
            NSICPlayer.fromJson(json.droppedPlayer)
        );
    }

    /**
     * Converts a response object to a waiver wire claim object.
     * @param {object} response - The response object representing the waiver wire claim.
     * @returns {WaiverWireClaim} - The waiver wire claim object.
     */
    static fromResponse(response) {
        if (response.dropped_player === null) {
            return new WaiverWireClaim(
                NSICPlayer.fromResponse(response.added_player),
                null
            );
        }
        return new WaiverWireClaim(
            NSICPlayer.fromResponse(response.added_player),
            NSICPlayer.fromResponse(response.dropped_player)
        );
    }
}
