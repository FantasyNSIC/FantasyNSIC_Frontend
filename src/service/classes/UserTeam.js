// Class representing a user team
export class User_Team {
    /**
     * Constructor for User_Team class
     * @param {number} user_team_id - The ID of the user team
     * @param {number} user_id - The ID of the user
     * @param {string} team_name - The name of the team
     * @param {number} league_id - The ID of the league
     * @param {string|null} full_name - The full name of the user (optional)
     */
    constructor(user_team_id, user_id, team_name, league_id, full_name = null) {
        this._user_team_id = user_team_id;
        this._user_id = user_id;
        this._team_name = team_name;
        this._league_id = league_id;
        this._full_name = full_name;
    }

    /**
     * Get the user team ID
     * @returns {number} The user team ID
     */
    getUserTeamId() {
        return this._user_team_id;
    }

    /**
     * Set the user team ID
     * @param {number} user_team_id - The user team ID
     * @throws {Error} If user_team_id is not a number
     */
    setUserTeamId(user_team_id) {
        if (typeof user_team_id !== 'number') {
            throw new Error('User team ID must be a number.');
        }
        this._user_team_id = user_team_id;
    }

    /**
     * Get the user ID
     * @returns {number} The user ID
     */
    getUserId() {
        return this._user_id;
    }

    /**
     * Set the user ID
     * @param {number} user_id - The user ID
     * @throws {Error} If user_id is not a number
     */
    setUserId(user_id) {
        if (typeof user_id !== 'number') {
            throw new Error('User ID must be a number.');
        }
        this._user_id = user_id;
    }

    /**
     * Get the team name
     * @returns {string} The team name
     */
    getTeamName() {
        return this._team_name;
    }

    /**
     * Set the team name
     * @param {string} team_name - The team name
     * @throws {Error} If team_name is not a string
     */
    setTeamName(team_name) {
        if (typeof team_name !== 'string') {
            throw new Error('Team name must be a string.');
        }
        this._team_name = team_name;
    }

    /**
     * Get the league ID
     * @returns {number} The league ID
     */
    getLeagueId() {
        return this._league_id;
    }

    /**
     * Set the league ID
     * @param {number} league_id - The league ID
     * @throws {Error} If league_id is not a number
     */
    setLeagueId(league_id) {
        if (typeof league_id !== 'number') {
            throw new Error('League ID must be a number.');
        }
        this._league_id = league_id;
    }

    /**
     * Get the full name
     * @returns {string|null} The full name
     */
    getFullName() {
        return this._full_name;
    }

    /**
     * Set the full name
     * @param {string} full_name - The full name
     * @throws {Error} If full_name is not a string
     */
    setFullName(full_name) {
        if (typeof full_name !== 'string') {
            throw new Error('Full name must be a string.');
        }
        this._full_name = full_name;
    }

    /**
     * Convert the User_Team object to JSON
     * @returns {Object} The JSON representation of the User_Team object
     */
    toJSON() {
        if (this._full_name !== null) {
            return {
                user_team_id: this._user_team_id,
                user_id: this._user_id,
                team_name: this._team_name,
                league_id: this._league_id,
                full_name: this._full_name
            };
        }
        return {
            user_team_id: this._user_team_id,
            user_id: this._user_id,
            team_name: this._team_name,
            league_id: this._league_id
        };
    }

    /**
     * Create a User_Team object from JSON
     * @param {Object} json - The JSON object
     * @returns {User_Team} The User_Team object created from JSON
     */
    static fromJSON(json) {
        if ('full_name' in json) {
            return new User_Team(
                json.user_team_id,
                json.user_id,
                json.team_name,
                json.league_id,
                json.full_name
            );
        }
        return new User_Team(
            json.user_team_id,
            json.user_id,
            json.team_name,
            json.league_id
        );
    }

    /**
     * Convert a response object into a User_Team object
     * @param {Object} response - The response object
     * @returns {User_Team} The User_Team object created from the response object
     */
    static fromResponse(response) {
        const user_team_id = response.user_team_id;
        const user_id = response.user_id;
        const team_name = response.team_name;
        const league_id = response.league_id;
        const full_name = response.full_name !== null ? response.full_name : null;
        return new User_Team(
            user_team_id,
            user_id,
            team_name,
            league_id,
            full_name
        );
    }
}