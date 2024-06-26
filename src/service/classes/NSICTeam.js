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
        this.team_id = team_id;
        this.team_name = team_name;
        this.abr = abr;
    }

    /**
     * Get the ID of the team.
     * @returns {number} The ID of the team.
     */
    getTeamId() {
        return this.team_id;
    }

    /**
     * Set the ID of the team.
     * @param {number} team_id - The ID of the team.
     */
    setTeamId(team_id) {
        this.team_id = team_id;
    }

    /**
     * Get the name of the team.
     * @returns {string} The name of the team.
     */
    getTeamName() {
        return this.team_name;
    }

    /**
     * Set the name of the team.
     * @param {string} team_name - The name of the team.
     */
    setTeamName(team_name) {
        this.team_name = team_name;
    }

    /**
     * Get the abbreviation of the team.
     * @returns {string} The abbreviation of the team.
     */
    getAbr() {
        return this.abr;
    }

    /**
     * Set the abbreviation of the team.
     * @param {string} abr - The abbreviation of the team.
     */
    setAbr(abr) {
        this.abr = abr;
    }

    /**
     * Create an empty representation of a NSICTeam object.
     * @returns {NSICTeam} An empty NSICTeam object.
     */
    static empty() {
        return new NSICTeam(0, "", "");
    }

    /**
     * Convert the NSICTeam object to a JSON string.
     * @returns {string} The JSON representation of the NSICTeam object.
     */
    toJson() {
        return JSON.stringify({
            team_id: this.team_id,
            team_name: this.team_name,
            abr: this.abr
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

    /**
     * Create a NSICTeam object from a response object.
     * @param {object} response - The response object.
     * @returns {NSICTeam} The NSICTeam object created from the response object.
     */
    static fromResponse(response) {
        return new NSICTeam(response.team_id, response.team_name, response.abr);
    }
}