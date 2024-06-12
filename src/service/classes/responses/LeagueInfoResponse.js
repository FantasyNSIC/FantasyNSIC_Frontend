/**
 * This class is a response object that contains the information of a league.
 */
import { User_Team } from "../UserTeam.js";

export class LeagueInfoResponse {
    /**
     * Initializes a league information response object.
     * @param {string} league_name - The league name.
     * @param {string} league_constraint - The league constraint.
     * @param {Array} league_teams - The league teams.
     */
    constructor(league_name, league_constraint, league_teams) {
        this.league_name = league_name;
        this.league_constraint = league_constraint;
        this.league_teams = league_teams;
        this.number_of_teams = league_teams.length;
    }

    /**
     * Returns the league name.
     * @returns {string} The league name.
     */
    getLeagueName() {
        return this._league_name;
    }

    /**
     * Sets the league name.
     * @param {string} league_name - The league name.
     */
    setLeagueName(league_name) {
        if (typeof league_name !== 'string') {
            throw new Error('League name must be a string.');
        }
        this._league_name = league_name;
    }

    /**
     * Returns the league constraint.
     * @returns {string} The league constraint.
     */
    getLeagueConstraint() {
        return this._league_constraint;
    }

    /**
     * Sets the league constraint.
     * @param {string} league_constraint - The league constraint.
     */
    setLeagueConstraint(league_constraint) {
        if (typeof league_constraint !== 'string') {
            throw new Error('League constraint must be a string.');
        }
        this._league_constraint = league_constraint;
    }

    /**
     * Returns the league teams.
     * @returns {Array} The league teams.
     */
    getLeagueTeams() {
        return this._league_teams;
    }

    /**
     * Sets the league teams.
     * @param {Array} league_teams - The league teams.
     */
    setLeagueTeams(league_teams) {
        if (!Array.isArray(league_teams)) {
            throw new Error('League teams must be an array.');
        }
        this._league_teams = league_teams;
    }

    /**
     * Converts the league information response object to a JSON object.
     * @returns {Object} The JSON object.
     */
    toJson() {
        return {
            league_name: this.getLeagueName(),
            league_constraint: this.getLeagueConstraint(),
            league_teams: this.getLeagueTeams().map(team => team.toJson()),
            number_of_teams: this.number_of_teams
        };
    }

    /**
     * Converts a JSON object to a league information response object.
     * @param {Object} json - The JSON object.
     * @returns {LeagueInfoResponse} The league information response object.
     */
    static fromJson(json) {
        const league_teams = json.league_teams.map(team => User_Team.fromJSON(team));
        return new LeagueInfoResponse(json.league_name, json.league_constraint, league_teams);
    }

    /**
     * Convert a response object into a LeagueInfoResponse object.
     * @param {Object} response - The response object.
     * @returns {LeagueInfoResponse} The LeagueInfoResponse object.
     */
    static fromResponse(response) {
        const league_name = response.data.league_name;
        const league_constraint = response.data.league_constraint;
        const league_teams = response.data.league_teams.map(team => User_Team.fromResponse(team));
        return new LeagueInfoResponse(league_name, league_constraint, league_teams);
    }
}
