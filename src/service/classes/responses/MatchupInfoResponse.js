import { UserRoster } from '../UserRoster.js';
import { TeamRecord } from '../TeamRecord.js';

/**
 * This file contains a response object that holds information about a given week's matchup for a user.
 */


export class MatchupInfoResponse {
    /**
     * Represents a response object for the matchup information, weekly matchups.
     * @param {string} current_week - The current week.
     * @param {string} team_1_name - The name of team 1.
     * @param {string} team_1_full_name - The full name of team 1.
     * @param {TeamRecord} team_1_record - The record of team 1.
     * @param {number} team_1_points - The points of team 1.
     * @param {UserRoster} team_1_roster - The roster of team 1.
     * @param {string} team_2_name - The name of team 2.
     * @param {string} team_2_full_name - The full name of team 2.
     * @param {TeamRecord} team_2_record - The record of team 2.
     * @param {number} team_2_points - The points of team 2.
     * @param {UserRoster} team_2_roster - The roster of team 2.
     */
    constructor(
        current_week,
        team_1_name,
        team_1_full_name,
        team_1_record,
        team_1_points,
        team_1_roster,
        team_2_name,
        team_2_full_name,
        team_2_record,
        team_2_points,
        team_2_roster
    ) {
        this.current_week = current_week;
        this.team_1_name = team_1_name;
        this.team_1_full_name = team_1_full_name;
        this.team_1_record = team_1_record;
        this.team_1_points = team_1_points;
        this.team_1_roster = team_1_roster;
        this.team_2_name = team_2_name;
        this.team_2_full_name = team_2_full_name;
        this.team_2_record = team_2_record;
        this.team_2_points = team_2_points;
        this.team_2_roster = team_2_roster;
    }

    /**
     * Returns the current week.
     * @returns {string} The current week.
     */
    get current_week() {
        return this._current_week;
    }

    /**
     * Sets the current week.
     * @param {string} current_week - The current week.
     */
    set current_week(current_week) {
        if (typeof current_week !== 'string') {
            throw new Error('Current week must be a string.');
        }
        this._current_week = current_week;
    }

    /**
     * Returns the team 1 name.
     * @returns {string} The team 1 name.
     */
    get team_1_name() {
        return this._team_1_name;
    }

    /**
     * Sets the team 1 name.
     * @param {string} team_1_name - The team 1 name.
     */
    set team_1_name(team_1_name) {
        if (typeof team_1_name !== 'string') {
            throw new Error('Team 1 name must be a string.');
        }
        this._team_1_name = team_1_name;
    }

    /**
     * Returns the team 1 full name.
     * @returns {string} The team 1 full name.
     */
    get team_1_full_name() {
        return this._team_1_full_name;
    }

    /**
     * Sets the team 1 full name.
     * @param {string} team_1_full_name - The team 1 full name.
     */
    set team_1_full_name(team_1_full_name) {
        if (typeof team_1_full_name !== 'string') {
            throw new Error('Team 1 full name must be a string.');
        }
        this._team_1_full_name = team_1_full_name;
    }

    /**
     * Returns the team 1 points.
     * @returns {number} The team 1 points.
     */
    get team_1_points() {
        return this._team_1_points;
    }

    /**
     * Sets the team 1 points.
     * @param {number} team_1_points - The team 1 points.
     */
    set team_1_points(team_1_points) {
        if (typeof team_1_points !== 'number') {
            throw new Error('Team 1 points must be a number.');
        }
        this._team_1_points = team_1_points;
    }

    /**
     * Returns the team 1 record.
     * @returns {TeamRecord} The team 1 record.
     */
    get team_1_record() {
        return this._team_1_record;
    }

    /**
     * Sets the team 1 record.
     * @param {TeamRecord} team_1_record - The team 1 record.
     */
    set team_1_record(team_1_record) {
        if (!(team_1_record instanceof TeamRecord)) {
            throw new Error('Team 1 record must be a Team_Record object.');
        }
        this._team_1_record = team_1_record;
    }

    /**
     * Returns the team 1 roster.
     * @returns {UserRoster} The team 1 roster.
     */
    get team_1_roster() {
        return this._team_1_roster;
    }

    /**
     * Sets the team 1 roster.
     * @param {UserRoster} team_1_roster - The team 1 roster.
     */
    set team_1_roster(team_1_roster) {
        if (!(team_1_roster instanceof UserRoster)) {
            throw new Error('Team 1 roster must be a UserRoster object.');
        }
        this._team_1_roster = team_1_roster;
    }

    /**
     * Returns the team 2 name.
     * @returns {string} The team 2 name.
     */
    get team_2_name() {
        return this._team_2_name;
    }

    /**
     * Sets the team 2 name.
     * @param {string} team_2_name - The team 2 name.
     */
    set team_2_name(team_2_name) {
        if (typeof team_2_name !== 'string') {
            throw new Error('Team 2 name must be a string.');
        }
        this._team_2_name = team_2_name;
    }

    /**
     * Returns the team 2 full name.
     * @returns {string} The team 2 full name.
     */
    get team_2_full_name() {
        return this._team_2_full_name;
    }

    /**
     * Sets the team 2 full name.
     * @param {string} team_2_full_name - The team 2 full name.
     */
    set team_2_full_name(team_2_full_name) {
        if (typeof team_2_full_name !== 'string') {
            throw new Error('Team 2 full name must be a string.');
        }
        this._team_2_full_name = team_2_full_name;
    }

    /**
     * Returns the team 2 points.
     * @returns {number} The team 2 points.
     */
    get team_2_points() {
        return this._team_2_points;
    }

    /**
     * Sets the team 2 points.
     * @param {number} team_2_points - The team 2 points.
     */
    set team_2_points(team_2_points) {
        if (typeof team_2_points !== 'number') {
            throw new Error('Team 2 points must be a number.');
        }
        this._team_2_points = team_2_points;
    }

    /**
     * Returns the team 2 record.
     * @returns {TeamRecord} The team 2 record.
     */
    get team_2_record() {
        return this._team_2_record;
    }

    /**
     * Sets the team 2 record.
     * @param {TeamRecord} team_2_record - The team 2 record.
     */
    set team_2_record(team_2_record) {
        if (!(team_2_record instanceof TeamRecord)) {
            throw new Error('Team 2 record must be a Team_Record object.');
        }
        this._team_2_record = team_2_record;
    }

    /**
     * Returns the team 2 roster.
     * @returns {UserRoster} The team 2 roster.
     */
    get team_2_roster() {
        return this._team_2_roster;
    }

    /**
     * Sets the team 2 roster.
     * @param {UserRoster} team_2_roster - The team 2 roster.
     */
    set team_2_roster(team_2_roster) {
        if (!(team_2_roster instanceof UserRoster)) {
            throw new Error('Team 2 roster must be a UserRoster object.');
        }
        this._team_2_roster = team_2_roster;
    }

    /**
     * Returns a JSON representation of the matchup information response.
     * @returns {object} A JSON representation of the matchup information response.
     */
    toJson() {
        return {
            current_week: this.current_week,
            team_1_name: this.team_1_name,
            team_1_full_name: this.team_1_full_name,
            team_1_record: this.team_1_record.toJson(),
            team_1_points: this.team_1_points,
            team_1_roster: this.team_1_roster.toJson(),
            team_2_name: this.team_2_name,
            team_2_full_name: this.team_2_full_name,
            team_2_record: this.team_2_record.toJson(),
            team_2_points: this.team_2_points,
            team_2_roster: this.team_2_roster.toJson()
        };
    }

    /**
     * Returns a MatchupInfoResponse object from a JSON representation.
     * @param {object} json - A JSON representation of the MatchupInfoResponse object.
     * @returns {MatchupInfoResponse} A MatchupInfoResponse object.
     */
    static fromJson(json) {
        return new MatchupInfoResponse(
            json.current_week,
            json.team_1_name,
            json.team_1_full_name,
            TeamRecord.fromJson(json.team_1_record),
            json.team_1_points,
            UserRoster.fromJson(json.team_1_roster),
            json.team_2_name,
            json.team_2_full_name,
            TeamRecord.fromJson(json.team_2_record),
            json.team_2_points,
            UserRoster.fromJson(json.team_2_roster)
        );
    }

    /**
     * Returns a MatchupInfoResponse object from an axios response.
     * @param {object} response - An axios response.
     * @returns {MatchupInfoResponse} A MatchupInfoResponse object.
     */
    static fromResponse(response) {
        return new MatchupInfoResponse(
            response.data.current_week,
            response.data.team_1_name,
            response.data.team_1_full_name,
            TeamRecord.fromResponse(response.data.team_1_record),
            response.data.team_1_points,
            UserRoster.fromResponse(response.data.team_1_roster),
            response.data.team_2_name,
            response.data.team_2_full_name,
            TeamRecord.fromResponse(response.data.team_2_record),
            response.data.team_2_points,
            UserRoster.fromResponse(response.data.team_2_roster)
        );
    }
}
