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
     * @param {string} user_team_name - The name of the user's team (optional).
     */
    constructor(user_team_id, wins, losses, points_for, points_against, user_team_name = null) {
        this.user_team_id = user_team_id;
        this.wins = wins;
        this.losses = losses;
        this.points_for = points_for;
        this.points_against = points_against;
        this.user_team_name = user_team_name;
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
     * Gets the name of the user's team.
     * @returns {string} The name of the user's team.
     */
    getUserTeamName() {
        return this.user_team_name;
    }

    /**
     * Sets the name of the user's team.
     * @param {string} user_team_name - The name of the user's team.
     */
    setUserTeamName(user_team_name) {
        this.user_team_name = user_team_name;
    }

    /**
     * Returns an empty TeamRecord object.
     * @returns {TeamRecord} An empty TeamRecord object.
     */
    static empty() {
        return new TeamRecord(0, 0, 0, 0.0, 0.0, "");
    }

    /**
     * Converts the TeamRecord object to a JSON string.
     * @returns {string} The JSON string representing the TeamRecord object.
     */
    toJson() {
        if (this.user_team_name !== null) {
            return JSON.stringify({
                user_team_id: this.user_team_id,
                wins: this.wins,
                losses: this.losses,
                points_for: this.points_for,
                points_against: this.points_against,
                user_team_name: this.user_team_name
            });
        }
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
        if ('user_team_name' in data) {
            return new TeamRecord(
                data.user_team_id,
                data.wins,
                data.losses,
                data.points_for,
                data.points_against,
                data.user_team_name);
        }
        return new TeamRecord(
            data.user_team_id,
            data.wins,
            data.losses,
            data.points_for,
            data.points_against);
    }

    /**
     * Converts a response object into a TeamRecord object.
     * @param {Object} response - The response object.
     * @returns {TeamRecord} The TeamRecord object created from the response object.
     */
    static fromResponse(response) {
        const user_team_id = response.user_team_id;
        const wins = response.wins;
        const losses = response.losses;
        const points_for = response.points_for;
        const points_against = response.points_against;
        const user_team_name = response.user_team_name !== null ? response.user_team_name : null;
        return new TeamRecord(
            user_team_id,
            wins,
            losses,
            points_for,
            points_against,
            user_team_name
        );
    }
}