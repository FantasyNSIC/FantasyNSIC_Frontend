import { UserRoster } from "../UserRoster";

export class MyTeamInfoResponse {
    constructor(teamName, leagueName, leagueConstraint, fullName, wins, losses, roster) {
        this.teamName = teamName;
        this.leagueName = leagueName;
        this.leagueConstraint = leagueConstraint;
        this.fullName = fullName;
        this.wins = wins;
        this.losses = losses;
        this.roster = roster;
    }

    // Getters and Setters for teamName
    getTeamName() {
        return this.teamName;
    }

    setTeamName(teamName) {
        this.teamName = teamName;
    }

    // Getters and Setters for leagueName
    getLeagueName() {
        return this.leagueName;
    }

    setLeagueName(leagueName) {
        this.leagueName = leagueName;
    }

    // Getters and Setters for leagueConstraint
    getLeagueConstraint() {
        return this.leagueConstraint;
    }

    setLeagueConstraint(leagueConstraint) {
        this.leagueConstraint = leagueConstraint;
    }

    // Getters and Setters for fullName
    getFullName() {
        return this.fullName;
    }

    setFullName(fullName) {
        this.fullName = fullName;
    }

    // Getters and Setters for wins
    getWins() {
        return this.wins;
    }

    setWins(wins) {
        this.wins = wins;
    }

    // Getters and Setters for losses
    getLosses() {
        return this.losses;
    }

    setLosses(losses) {
        this.losses = losses;
    }

    // Getters and Setters for roster
    getRoster() {
        return this.roster;
    }

    setRoster(roster) {
        this.roster = roster;
    }

    // Convert the object to a JSON string
    toJson() {
        return JSON.stringify(this);
    }

    // Create a MyTeamInfoResponse object from a response object
    static fromResponse(response) {
        const teamName = response.data._teamName;
        const leagueName = response.data._leagueName;
        const leagueConstraint = response.data._leagueConstraint;
        const fullName = response.data._fullName;
        const wins = response.data._wins;
        const losses = response.data._losses;
        const roster = UserRoster.fromResponse(response.data._roster);
        return new MyTeamInfoResponse(teamName, leagueName, leagueConstraint, fullName, wins, losses, roster);
    }
}