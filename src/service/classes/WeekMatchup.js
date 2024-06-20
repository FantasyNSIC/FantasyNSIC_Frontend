import { User_Team } from "./UserTeam.js";
/**
 * This class represents a given weekly matchup between two teams in a league.
 */

export class WeekMatchup {
    /**
     * Weekly matchup storing players and team information.
     * @param {User_Team} team1 - The first team.
     * @param {User_Team} team2 - The second team.
     * @param {number} team1Points - The first team's points.
     * @param {number} team2Points - The second team's points.
     * @param {number} team1Wins - The first team's wins.
     * @param {number} team2Wins - The second team's wins.
     * @param {number} team1Losses - The first team's losses.
     * @param {number} team2Losses - The second team's losses.
     */
    constructor(
        team1,
        team2,
        team1Points,
        team2Points,
        team1Wins,
        team2Wins,
        team1Losses,
        team2Losses
    ) {
        this.team1 = team1;
        this.team2 = team2;
        this.team1Points = team1Points;
        this.team2Points = team2Points;
        this.team1Wins = team1Wins;
        this.team2Wins = team2Wins;
        this.team1Losses = team1Losses;
        this.team2Losses = team2Losses;
    }

    /**
     * Returns the first team.
     * @returns {User_Team} The first team.
     */
    getTeam1() {
        return this.team1;
    }

    /**
     * Sets the first team.
     * @param {User_Team} team1 - The first team.
     */
    setTeam1(team1) {
        if (!(team1 instanceof User_Team)) {
            throw new Error("Team 1 must be a UserTeam object.");
        }
        this.team1 = team1;
    }

    /**
     * Returns the second team.
     * @returns {User_Team} The second team.
     */
    getTeam2() {
        return this.team2;
    }

    /**
     * Sets the second team.
     * @param {User_Team} team2 - The second team.
     */
    setTeam2(team2) {
        if (!(team2 instanceof User_Team)) {
            throw new Error("Team 2 must be a UserTeam object.");
        }
        this.team2 = team2;
    }

    /**
     * Returns the first team's points.
     * @returns {number} The first team's points.
     */
    getTeam1Points() {
        return this.team1Points;
    }

    /**
     * Sets the first team's points.
     * @param {number} team1Points - The first team's points.
     */
    setTeam1Points(team1Points) {
        if (typeof team1Points !== "number") {
            throw new Error("Team 1 points must be a number.");
        }
        this.team1Points = team1Points;
    }

    /**
     * Returns the second team's points.
     * @returns {number} The second team's points.
     */
    getTeam2Points() {
        return this.team2Points;
    }

    /**
     * Sets the second team's points.
     * @param {number} team2Points - The second team's points.
     */
    setTeam2Points(team2Points) {
        if (typeof team2Points !== "number") {
            throw new Error("Team 2 points must be a number.");
        }
        this.team2Points = team2Points;
    }

    /**
     * Returns the first team's wins.
     * @returns {number} The first team's wins.
     */
    getTeam1Wins() {
        return this.team1Wins;
    }

    /**
     * Sets the first team's wins.
     * @param {number} team1Wins - The first team's wins.
     */
    setTeam1Wins(team1Wins) {
        if (typeof team1Wins !== "number") {
            throw new Error("Team 1 wins must be an integer.");
        }
        this.team1Wins = team1Wins;
    }

    /**
     * Returns the second team's wins.
     * @returns {number} The second team's wins.
     */
    getTeam2Wins() {
        return this.team2Wins;
    }

    /**
     * Sets the second team's wins.
     * @param {number} team2Wins - The second team's wins.
     */
    setTeam2Wins(team2Wins) {
        if (typeof team2Wins !== "number") {
            throw new Error("Team 2 wins must be an integer.");
        }
        this.team2Wins = team2Wins;
    }

    /**
     * Returns the first team's losses.
     * @returns {number} The first team's losses.
     */
    getTeam1Losses() {
        return this.team1Losses;
    }

    /**
     * Sets the first team's losses.
     * @param {number} team1Losses - The first team's losses.
     */
    setTeam1Losses(team1Losses) {
        if (typeof team1Losses !== "number") {
            throw new Error("Team 1 losses must be an integer.");
        }
        this.team1Losses = team1Losses;
    }

    /**
     * Returns the second team's losses.
     * @returns {number} The second team's losses.
     */
    getTeam2Losses() {
        return this.team2Losses;
    }

    /**
     * Sets the second team's losses.
     * @param {number} team2Losses - The second team's losses.
     */
    setTeam2Losses(team2Losses) {
        if (typeof team2Losses !== "number") {
            throw new Error("Team 2 losses must be an integer.");
        }
        this.team2Losses = team2Losses;
    }

    /**
     * Returns the weekly matchup as a JSON object.
     * @returns {object} The weekly matchup as a JSON object.
     */
    toJSON() {
        return {
            team1: this.team1.toJSON(),
            team2: this.team2.toJSON(),
            team1Points: this.team1Points,
            team2Points: this.team2Points,
            team1Wins: this.team1Wins,
            team2Wins: this.team2Wins,
            team1Losses: this.team1Losses,
            team2Losses: this.team2Losses,
        };
    }

    /**
     * Returns a weekly matchup from a JSON object.
     * @param {object} json - The JSON object representing a weekly matchup.
     * @returns {WeekMatchup} The weekly matchup.
     */
    static fromJSON(json) {
        return new WeekMatchup(
            User_Team.fromJSON(json.team1),
            User_Team.fromJSON(json.team2),
            json.team1Points,
            json.team2Points,
            json.team1Wins,
            json.team2Wins,
            json.team1Losses,
            json.team2Losses
        );
    }

    /**
     * Returns a weekly matchup from an response object.
     * @param {object} response - The response object representing a weekly matchup.
     * @returns {WeekMatchup} The weekly matchup.
     */
    static fromResponse(response) {
        return new WeekMatchup(
            User_Team.fromResponse(response.team_1),
            User_Team.fromResponse(response.team_2),
            response.team_1_points,
            response.team_2_points,
            response.team_1_wins,
            response.team_2_wins,
            response.team_1_losses,
            response.team_2_losses
        );
    }
}
