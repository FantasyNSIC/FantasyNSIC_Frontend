/**
 * This class contains a database representation of a team in the NSIC.
 */

export class NSICTeam {
    /**
     * Represents a NSIC team.
     * @param {number} team_id - The ID of the team.
     * @param {string} team_name - The name of the team.
     * @param {string} abr - The abbreviation of the team.
     */
    constructor(team_id, team_name, abr) {
        this._team_id = team_id;
        this._team_name = team_name;
        this._abr = abr;
    }

    /**
     * Get the ID of the team.
     * @returns {number} The ID of the team.
     */
    get team_id() {
        return this._team_id;
    }

    /**
     * Set the ID of the team.
     * @param {number} team_id - The ID of the team.
     */
    set team_id(team_id) {
        this._team_id = team_id;
    }

    /**
     * Get the name of the team.
     * @returns {string} The name of the team.
     */
    get team_name() {
        return this._team_name;
    }

    /**
     * Set the name of the team.
     * @param {string} team_name - The name of the team.
     */
    set team_name(team_name) {
        this._team_name = team_name;
    }

    /**
     * Get the abbreviation of the team.
     * @returns {string} The abbreviation of the team.
     */
    get abr() {
        return this._abr;
    }

    /**
     * Set the abbreviation of the team.
     * @param {string} abr - The abbreviation of the team.
     */
    set abr(abr) {
        this._abr = abr;
    }

    /**
     * Convert the NSICTeam object to a JSON string.
     * @returns {string} The JSON representation of the NSICTeam object.
     */
    toJson() {
        return JSON.stringify({
            team_id: this._team_id,
            team_name: this._team_name,
            abr: this._abr
        });
    }

    /**
     * Create a NSICTeam object from a JSON string.
     * @param {string} json - The JSON string representing a NSICTeam object.
     * @returns {NSICTeam} The NSICTeam object created from the JSON string.
     */
    static fromJson(json) {
        const data = JSON.parse(json);
        return new NSICTeam(data.team_id, data.team_name, data.abr);
    }
}