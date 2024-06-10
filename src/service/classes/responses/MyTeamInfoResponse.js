import { UserRoster } from "../UserRoster";

export class MyTeamInfoResponse {
    constructor(teamName, leagueName, leagueConstraint, fullName, wins, losses, roster) {
        this._teamName = teamName;
        this._leagueName = leagueName;
        this._leagueConstraint = leagueConstraint;
        this._fullName = fullName;
        this._wins = wins;
        this._losses = losses;
        this._roster = roster;
    }

    // Getters and Setters for teamName
    get teamName() {
        return this._teamName;
    }

    set teamName(teamName) {
        this._teamName = teamName;
    }

    // Getters and Setters for leagueName
    get leagueName() {
        return this._leagueName;
    }

    set leagueName(leagueName) {
        this._leagueName = leagueName;
    }

    // Getters and Setters for leagueConstraint
    get leagueConstraint() {
        return this._leagueConstraint;
    }

    set leagueConstraint(leagueConstraint) {
        this._leagueConstraint = leagueConstraint;
    }

    // Getters and Setters for fullName
    get fullName() {
        return this._fullName;
    }

    set fullName(fullName) {
        this._fullName = fullName;
    }

    // Getters and Setters for wins
    get wins() {
        return this._wins;
    }

    set wins(wins) {
        this._wins = wins;
    }

    // Getters and Setters for losses
    get losses() {
        return this._losses;
    }

    set losses(losses) {
        this._losses = losses;
    }

    // Getters and Setters for roster
    get roster() {
        return this._roster;
    }

    set roster(roster) {
        this._roster = roster;
    }

    // Convert the object to a JSON string
    toJson() {
        return JSON.stringify(this);
    }

    // Create a MyTeamInfoResponse object from a response object
    static fromResponse(response) {
        const teamName = response.data.teamName;
        const leagueName = response.data.leagueName;
        const leagueConstraint = response.data.leagueConstraint;
        const fullName = response.data.fullName;
        const wins = response.data.wins;
        const losses = response.data.losses;
        const roster = UserRoster.fromResponse(response.data.roster);
        return new MyTeamInfoResponse(teamName, leagueName, leagueConstraint, fullName, wins, losses, roster);
    }
}