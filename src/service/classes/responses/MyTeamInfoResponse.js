import { UserRoster } from "../UserRoster";

export class MyTeamInfoResponse {
    constructor(teamName, leagueName, fullName, wins, losses, roster,
        overflowFlag = false, overflowPos = "") {
        this.teamName = teamName;
        this.leagueName = leagueName;
        this.fullName = fullName;
        this.wins = wins;
        this.losses = losses;
        this.roster = roster;
        this.overflowFlag = overflowFlag;
        this.overflowPos = overflowPos;
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

    // Getters and Setters for overflowFlag
    getOverflowFlag() {
        return this.overflowFlag;
    }

    setOverflowFlag(overflowFlag) {
        this.overflowFlag = overflowFlag;
    }

    // Getters and Setters for overflowPos
    getOverflowPos() {
        return this.overflowPos;
    }

    setOverflowPos(overflowPos) {
        this.overflowPos = overflowPos;
    }

    // Convert the object to a JSON string
    toJson() {
        return JSON.stringify(this);
    }

    // Create a MyTeamInfoResponse object from a response object
    static fromResponse(response) {
        const teamName = response.data.teamName;
        const leagueName = response.data.leagueName;
        const fullName = response.data.fullName;
        const wins = response.data.wins;
        const losses = response.data.losses;
        const roster = UserRoster.fromResponse(response.data.roster);
        const overflowFlag = response.data.overflowFlag;
        const overflowPos = response.data.overflowPos;
        return new MyTeamInfoResponse(teamName, leagueName, fullName, wins, losses,
            roster, overflowFlag, overflowPos);
    }
}