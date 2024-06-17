/**
 * This class contain a database representation of a player in the NSIC.
 */

export class NSICPlayer {
    /**
     * Constructor for NSICPlayer class
     * @param {number} player_id - The player's ID
     * @param {string} first_name - The player's first name
     * @param {string} last_name - The player's last name
     * @param {number} team_id - The player's team ID
     * @param {string} pos - The player's position
     * @param {string} cls - The player's class
     * @param {number} jersey_number - The player's jersey number
     * @param {string} height - The player's height
     * @param {number} weight - The player's weight
     */
    constructor(player_id, first_name, last_name, team_id, pos, cls, jersey_number, height, weight) {
        this.player_id = player_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.team_id = team_id;
        this.pos = pos;
        this.cls = cls;
        this.jersey_number = jersey_number;
        this.height = height;
        this.weight = weight;
    }

    /**
     * Get the player's ID
     * @returns {number} The player's ID
     */
    getPlayerId() {
        return this.player_id;
    }

    /**
     * Set the player's ID
     * @param {number} player_id - The player's ID
     */
    setPlayerId(player_id) {
        this.player_id = player_id;
    }

    /**
     * Get the player's first name
     * @returns {string} The player's first name
     */
    getFirstName() {
        return this.first_name;
    }

    /**
     * Set the player's first name
     * @param {string} first_name - The player's first name
     */
    setFirstName(first_name) {
        this.first_name = first_name;
    }

    /**
     * Get the player's last name
     * @returns {string} The player's last name
     */
    getLastName() {
        return this.last_name;
    }

    /**
     * Set the player's last name
     * @param {string} last_name - The player's last name
     */
    setLastName(last_name) {
        this.last_name = last_name;
    }

    /**
     * Get the player's team ID
     * @returns {number} The player's team ID
     */
    getTeamId() {
        return this.team_id;
    }

    /**
     * Set the player's team ID
     * @param {number} team_id - The player's team ID
     */
    setTeamId(team_id) {
        this.team_id = team_id;
    }

    /**
     * Get the player's position
     * @returns {string} The player's position
     */
    getPosition() {
        return this.pos;
    }

    /**
     * Set the player's position
     * @param {string} pos - The player's position
     */
    setPosition(pos) {
        this.pos = pos;
    }

    /**
     * Get the player's class
     * @returns {string} The player's class
     */
    getClass() {
        return this.cls;
    }

    /**
     * Set the player's class
     * @param {string} cls - The player's class
     */
    setClass(cls) {
        this.cls = cls;
    }

    /**
     * Get the player's jersey number
     * @returns {string} The player's jersey number
     */
    getJerseyNumber() {
        return this.jersey_number;
    }

    /**
     * Set the player's jersey number
     * @param {number} jersey_number - The player's jersey number
     */
    setJerseyNumber(jersey_number) {
        this.jersey_number = jersey_number;
    }

    /**
     * Get the player's height
     * @returns {string} The player's height
     */
    getHeight() {
        return this.height;
    }

    /**
     * Set the player's height
     * @param {number} height - The player's height
     */
    setHeight(height) {
        this.height = height;
    }

    /**
     * Get the player's weight
     * @returns {number} The player's weight
     */
    getWeight() {
        return this.weight;
    }

    /**
     * Set the player's weight
     * @param {number} weight - The player's weight
     */
    setWeight(weight) {
        this.weight = weight;
    }

    /**
     * Defines an empty player
     * @returns {NSICPlayer} NSICPlayer instance
     */
    static empty_player() {
        return new NSICPlayer(0, '', '', 0, '', '', 0, '', 0);
    }

    /**
     * Convert JSON object to NSICPlayer instance
     * @param {object} json - JSON object representing NSICPlayer
     * @returns {NSICPlayer} NSICPlayer instance
     */
    static fromJson(json) {
        const data = JSON.parse(json);
        return new NSICPlayer(
            data.player_id,
            data.first_name,
            data.last_name,
            data.team_id,
            data.pos,
            data.cls,
            data.jersey_number,
            data.height,
            data.weight
        );
    }

    /**
     * Convert NSICPlayer instance to JSON object
     * @returns {object} JSON object representing NSICPlayer
     */
    toJson() {
        return JSON.stringify({
            player_id: this.player_id,
            first_name: this.first_name,
            last_name: this.last_name,
            team_id: this.team_id,
            pos: this.pos,
            cls: this.cls,
            jersey_number: this.jersey_number,
            height: this.height,
            weight: this.weight
        });
    }

    /**
     * Convert tuple to NSICPlayer instance
     * @param {array} tuple - Tuple representing NSICPlayer
     * @returns {NSICPlayer} NSICPlayer instance
     */
    static fromTuple(tuple) {
        return new NSICPlayer(
            tuple[0],
            tuple[1],
            tuple[2],
            tuple[3],
            tuple[4],
            tuple[5],
            tuple[6],
            tuple[7],
            tuple[8]
        );
    }

    /**
     * Convert response to NSICPlayer instance
     * @param {object} response - Response representing NSICPlayer
     * @returns {NSICPlayer} NSICPlayer instance
     */
    static fromResponse(response) {
        return new NSICPlayer(
            response.player_id,
            response.first_name,
            response.last_name,
            response.team_id,
            response.pos,
            response.cls,
            response.jersey_number,
            response.height,
            response.weight
        );
    }
}