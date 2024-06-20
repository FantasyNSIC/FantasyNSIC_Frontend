import { WeekMatchup } from '../WeekMatchup.js';
/**
 * This class represents a response object for the scoreboard information.
 */
export class ScoreboardInfoResponse {
    /**
     * Represents a response object for the scoreboard information, weekly matchups.
     * @param {string} league_name - The league name.
     * @param {string} current_week - The current week.
     * @param {Array} matchups - The weekly matchups.
     */
    constructor(league_name, current_week, matchups) {
        this.league_name = league_name;
        this.current_week = current_week;
        this.matchups = matchups;
    }

    /**
     * Returns the league name.
     * @returns {string} The league name.
     */
    getLeagueName() {
        return this.league_name;
    }

    /**
     * Sets the league name.
     * @param {string} league_name - The league name.
     */
    setLeagueName(league_name) {
        if (typeof league_name !== 'string') {
            throw new Error('League name must be a string.');
        }
        this.league_name = league_name;
    }

    /**
     * Returns the current week.
     * @returns {string} The current week.
     */
    getCurrentWeek() {
        return this.current_week;
    }

    /**
     * Sets the current week.
     * @param {string} current_week - The current week.
     */
    setCurrentWeek(current_week) {
        if (typeof current_week !== 'string') {
            throw new Error('Current week must be a string.');
        }
        this.current_week = current_week;
    }

    /**
     * Returns the weekly matchups.
     * @returns {Array} The weekly matchups.
     */
    getMatchups() {
        return this.matchups;
    }

    /**
     * Sets the weekly matchups.
     * @param {Array} matchups - The weekly matchups.
     */
    setMatchups(matchups) {
        if (!Array.isArray(matchups) || !matchups.every(matchup => matchup instanceof WeekMatchup)) {
            throw new Error('Matchups must be a list of Week_Matchup objects.');
        }
        this.matchups = matchups;
    }

    /**
     * Returns the JSON representation of the object.
     * @returns {Object} The JSON representation of the object.
     */
    toJson() {
        return {
            league_name: this.league_name,
            current_week: this.current_week,
            matchups: this.matchups.map(matchup => matchup.toJSON())
        };
    }

    /**
     * Returns a ScoreboardInfoResponse object from a JSON object.
     * @param {Object} json - The JSON object.
     * @returns {ScoreboardInfoResponse} The ScoreboardInfoResponse object.
     */
    static fromJson(json) {
        return new ScoreboardInfoResponse(
            json.league_name,
            json.current_week,
            json.matchups.map(matchup => WeekMatchup.fromJSON(matchup))
        );
    }

    /**
     * Returns a ScoreboardInfoResponse object from an axios response object.
     * @param {Object} response - The axios response object.
     * @returns {ScoreboardInfoResponse} The ScoreboardInfoResponse object.
     */
    static fromResponse(response) {
        return new ScoreboardInfoResponse(
            response.data.league_name,
            response.data.current_week,
            response.data.matchups.map(matchup => WeekMatchup.fromResponse(matchup))
        )
    }
}
