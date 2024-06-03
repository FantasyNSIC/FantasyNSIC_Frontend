/**
 * This class contains a database representation of a team's record.
 */

export class TeamRecord {
    /**
     * Constructs a new TeamRecord object.
     * @param {number} user_team_id - The user team ID.
     * @param {number} wins - The number of wins.
     * @param {number} losses - The number of losses.
     * @param {number} points_for - The points scored by the team.
     * @param {number} points_against - The points scored against the team.
     */
    constructor(user_team_id, wins, losses, points_for, points_against) {
        this.user_team_id = user_team_id;
        this.wins = wins;
        this.losses = losses;
        this.points_for = points_for;
        this.points_against = points_against;
    }

    /**
     * Gets the user team ID.
     * @returns {number} The user team ID.
     */
    getUserTeamId() {
        return this.user_team_id;
    }

    /**
     * Sets the user team ID.
     * @param {number} user_team_id - The user team ID.
     */
    setUserTeamId(user_team_id) {
        this.user_team_id = user_team_id;
    }

    /**
     * Gets the number of wins.
     * @returns {number} The number of wins.
     */
    getWins() {
        return this.wins;
    }

    /**
     * Sets the number of wins.
     * @param {number} wins - The number of wins.
     */
    setWins(wins) {
        this.wins = wins;
    }

    /**
     * Gets the number of losses.
     * @returns {number} The number of losses.
     */
    getLosses() {
        return this.losses;
    }

    /**
     * Sets the number of losses.
     * @param {number} losses - The number of losses.
     */
    setLosses(losses) {
        this.losses = losses;
    }

    /**
     * Gets the points scored by the team.
     * @returns {number} The points scored by the team.
     */
    getPointsFor() {
        return this.points_for;
    }

    /**
     * Sets the points scored by the team.
     * @param {number} points_for - The points scored by the team.
     */
    setPointsFor(points_for) {
        this.points_for = points_for;
    }

    /**
     * Gets the points scored against the team.
     * @returns {number} The points scored against the team.
     */
    getPointsAgainst() {
        return this.points_against;
    }

    /**
     * Sets the points scored against the team.
     * @param {number} points_against - The points scored against the team.
     */
    setPointsAgainst(points_against) {
        this.points_against = points_against;
    }

    /**
     * Converts the TeamRecord object to a JSON string.
     * @returns {string} The JSON string representing the TeamRecord object.
     */
    toJson() {
        return JSON.stringify({
            user_team_id: this.user_team_id,
            wins: this.wins,
            losses: this.losses,
            points_for: this.points_for,
            points_against: this.points_against
        });
    }

    /**
     * Creates a TeamRecord object from a JSON string.
     * @param {string} json - The JSON string representing a TeamRecord object.
     * @returns {TeamRecord} The TeamRecord object created from the JSON string.
     */
    static fromJson(json) {
        const data = JSON.parse(json);
        return new TeamRecord(
            data.user_team_id,
            data.wins,
            data.losses,
            data.points_for,
            data.points_against);
    }
}