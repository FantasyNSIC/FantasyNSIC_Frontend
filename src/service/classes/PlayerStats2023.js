/**
 * This class contains a database representation of a player's stats in 2023.
 */

export class PlayerStats2023 {
    /**
     * Constructor for PlayerStats2023 class.
     * @param {number} player_id - The player's ID.
     * @param {number} gp - The number of games played.
     * @param {number} rush_att - The number of rushing attempts.
     * @param {number} rush_yds - The number of rushing yards.
     * @param {number} rush_avg - The average rushing yards per attempt.
     * @param {number} rush_td - The number of rushing touchdowns.
     * @param {number} pass_comp - The number of completed passes.
     * @param {number} pass_att - The number of pass attempts.
     * @param {number} pass_yds - The number of passing yards.
     * @param {number} pass_td - The number of passing touchdowns.
     * @param {number} pass_int - The number of interceptions thrown.
     * @param {number} recieve_rec - The number of receptions.
     * @param {number} recieve_yds - The number of receiving yards.
     * @param {number} recieve_avg - The average receiving yards per reception.
     * @param {number} recieve_td - The number of receiving touchdowns.
     * @param {number} fg_att - The number of field goal attempts.
     * @param {number} fg_made - The number of field goals made.
     */
    constructor(
        player_id,
        gp,
        rush_att,
        rush_yds,
        rush_avg,
        rush_td,
        pass_comp,
        pass_att,
        pass_yds,
        pass_td,
        pass_int,
        recieve_rec,
        recieve_yds,
        recieve_avg,
        recieve_td,
        fg_att,
        fg_made
    ) {
        this.player_id = player_id;
        this.gp = gp;
        this.rush_att = rush_att;
        this.rush_yds = rush_yds;
        this.rush_avg = rush_avg;
        this.rush_td = rush_td;
        this.pass_comp = pass_comp;
        this.pass_att = pass_att;
        this.pass_yds = pass_yds;
        this.pass_td = pass_td;
        this.pass_int = pass_int;
        this.recieve_rec = recieve_rec;
        this.recieve_yds = recieve_yds;
        this.recieve_avg = recieve_avg;
        this.recieve_td = recieve_td;
        this.fg_att = fg_att;
        this.fg_made = fg_made;
    }

    /**
     * Get the player's ID.
     * @returns {number} The player's ID.
     */
    getPlayerId() {
        return this.player_id;
    }

    /**
     * Set the player's ID.
     * @param {number} playerId - The player's ID.
     */
    setPlayerId(playerId) {
        this.player_id = playerId;
    }

    /**
     * Get the number of games played.
     * @returns {number} The number of games played.
     */
    getGamesPlayed() {
        return this.gp;
    }

    /**
     * Set the number of games played.
     * @param {number} gamesPlayed - The number of games played.
     */
    setGamesPlayed(gamesPlayed) {
        this.gp = gamesPlayed;
    }

    /**
    * Get the number of rushing attempts.
    * @returns {number} The number of rushing attempts.
    */
    getRushingAttempts() {
        return this.rush_att;
    }

    /**
    * Set the number of rushing attempts.
    * @param {number} rushingAttempts - The number of rushing attempts.
    */
    setRushingAttempts(rushingAttempts) {
        this.rush_att = rushingAttempts;
    }

    /**
    * Get the number of rushing yards.
    * @returns {number} The number of rushing yards.
    */
    getRushingYards() {
        return this.rush_yds;
    }

    /**
    * Set the number of rushing yards.
    * @param {number} rushingYards - The number of rushing yards.
    */
    setRushingYards(rushingYards) {
        this.rush_yds = rushingYards;
    }

    /**
    * Get the average rushing yards per attempt.
    * @returns {number} The average rushing yards per attempt.
    */
    getRushingAverage() {
        return this.rush_avg;
    }

    /**
    * Set the average rushing yards per attempt.
    * @param {number} rushingAverage - The average rushing yards per attempt.
    */
    setRushingAverage(rushingAverage) {
        this.rush_avg = rushingAverage;
    }

    /**
    * Get the number of rushing touchdowns.
    * @returns {number} The number of rushing touchdowns.
    */
    getRushingTouchdowns() {
        return this.rush_td;
    }

    /**
    * Set the number of rushing touchdowns.
    * @param {number} rushingTouchdowns - The number of rushing touchdowns.
    */
    setRushingTouchdowns(rushingTouchdowns) {
        this.rush_td = rushingTouchdowns;
    }

    /**
    * Get the number of completed passes.
    * @returns {number} The number of completed passes.
    */
    getPassingCompletions() {
        return this.pass_comp;
    }

    /**
    * Set the number of completed passes.
    * @param {number} passingCompletions - The number of completed passes.
    */
    setPassingCompletions(passingCompletions) {
        this.pass_comp = passingCompletions;
    }

    /**
    * Get the number of pass attempts.
    * @returns {number} The number of pass attempts.
    */
    getPassingAttempts() {
        return this.pass_att;
    }
    
    /**
    * Set the number of pass attempts.
    * @param {number} passingAttempts - The number of pass attempts.
    */
    setPassingAttempts(passingAttempts) {
        this.pass_att = passingAttempts;
    }

    /**
    * Get the number of passing yards.
    * @returns {number} The number of passing yards.
    */
    getPassingYards() {
        return this.pass_yds;
    }

    /**
    * Set the number of passing yards.
    * @param {number} passingYards - The number of passing yards.
    */
    setPassingYards(passingYards) {
        this.pass_yds = passingYards;
    }

    /**
    * Get the number of passing touchdowns.
    * @returns {number} The number of passing touchdowns.
    */
    getPassingTouchdowns() {
        return this.pass_td;
    }

    /**
    * Set the number of passing touchdowns.
    * @param {number} passingTouchdowns - The number of passing touchdowns.
    */
    setPassingTouchdowns(passingTouchdowns) {
        this.pass_td = passingTouchdowns;
    }

    /**
    * Get the number of interceptions thrown.
    * @returns {number} The number of interceptions thrown.
    */
    getInterceptionsThrown() {
        return this.pass_int;
    }

    /**
    * Set the number of interceptions thrown.
    * @param {number} interceptionsThrown - The number of interceptions thrown.
    */
    setInterceptionsThrown(interceptionsThrown) {
        this.pass_int = interceptionsThrown;
    }

    /**
    * Get the number of receptions.
    * @returns {number} The number of receptions.
    */
    getReceptions() {
        return this.recieve_rec;
    }

    /**
    * Set the number of receptions.
    * @param {number} receptions - The number of receptions.
    */
    setReceptions(receptions) {
        this.recieve_rec = receptions;
    }

    /**
    * Get the number of receiving yards.
    * @returns {number} The number of receiving yards.
    */
    getReceivingYards() {
        return this.recieve_yds;
    }

    /**
    * Set the number of receiving yards.
    * @param {number} receivingYards - The number of receiving yards.
    */
    setReceivingYards(receivingYards) {
        this.recieve_yds = receivingYards;
    }

    /**
    * Get the average receiving yards per reception.
    * @returns {number} The average receiving yards per reception.
    */
    getReceivingAverage() {
        return this.recieve_avg;
    }

    /**
    * Set the average receiving yards per reception.
    * @param {number} receivingAverage - The average receiving yards per reception.
    */
    setReceivingAverage(receivingAverage) {
        this.recieve_avg = receivingAverage;
    }

    /**
    * Get the number of receiving touchdowns.
    * @returns {number} The number of receiving touchdowns.
    */
    getReceivingTouchdowns() {
        return this.recieve_td;
    }

    /**
    * Set the number of receiving touchdowns.
    * @param {number} receivingTouchdowns - The number of receiving touchdowns.
    */
    setReceivingTouchdowns(receivingTouchdowns) {
        this.recieve_td = receivingTouchdowns;
    }

    /**
    * Get the number of field goal attempts.
    * @returns {number} The number of field goal attempts.
    */
    getFieldGoalAttempts() {
        return this.fg_att;
    }

    /**
    * Set the number of field goal attempts.
    * @param {number} fieldGoalAttempts - The number of field goal attempts.
    */
    setFieldGoalAttempts(fieldGoalAttempts) {
        this.fg_att = fieldGoalAttempts;
    }

    /**
    * Get the number of field goals made.
    * @returns {number} The number of field goals made.
    */
    getFieldGoalsMade() {
        return this.fg_made;
    }

    /**
    * Set the number of field goals made.
    * @param {number} fieldGoalsMade - The number of field goals made.
    */
    setFieldGoalsMade(fieldGoalsMade) {
        this.fg_made = fieldGoalsMade;
    }

    /**
     * Create an empty PlayerStats2023 object.
     * @param {number} playerId - The player's ID.
     * @returns {PlayerStats2023} The empty PlayerStats2023 object.
     */
    static empty(playerId) {
        return new PlayerStats2023(playerId, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0, 0, 0, 0);
    }

    /**
     * Filters stats based on input pos.
     * @param {string} pos - The position of the player.
     * @returns {dict} The filtered dictionary object.
     */
    static filterStats(pos) {
        if (pos === "RB") {
            return {
                gp: this.gp,
                rush_att: this.rush_att,
                rush_yds: this.rush_yds,
                rush_avg: this.rush_avg,
                rush_td: this.rush_td,
                recieve_rec: this.recieve_rec,
                recieve_yds: this.recieve_yds,
                recieve_avg: this.recieve_avg,
                recieve_td: this.recieve_td
            };
        }
        else if (pos === "QB") {
            return {
                gp: this.gp,
                pass_comp: this.pass_comp,
                pass_att: this.pass_att,
                pass_yds: this.pass_yds,
                pass_td: this.pass_td,
                pass_int: this.pass_int,
                rush_att: this.rush_att,
                rush_yds: this.rush_yds,
                rush_avg: this.rush_avg,
                rush_td: this.rush_td
            };
        }
        else if (pos === "WR") {
            return {
                gp: this.gp,
                recieve_rec: this.recieve_rec,
                recieve_yds: this.recieve_yds,
                recieve_avg: this.recieve_avg,
                recieve_td: this.recieve_td,
                rush_att: this.rush_att,
                rush_yds: this.rush_yds,
                rush_avg: this.rush_avg,
                rush_td: this.rush_td
            };
        }
        else if (pos === "TE") {
            return {
                gp: this.gp,
                recieve_rec: this.recieve_rec,
                recieve_yds: this.recieve_yds,
                recieve_avg: this.recieve_avg,
                recieve_td: this.recieve_td,
                rush_att: this.rush_att,
                rush_yds: this.rush_yds,
                rush_avg: this.rush_avg,
                rush_td: this.rush_td
            };
        }
        else if (pos === "K") {
            return {
                gp: this.gp,
                fg_att: this.fg_att,
                fg_made: this.fg_made
            };
        }
        else {
            return {
                gp: this.gp
            };
        }
    }

    /**
     * Convert the PlayerStats2023 object to JSON format.
     * @returns {string} The JSON representation of the object.
     */
    toJson() {
        return JSON.stringify({
            player_id: this.player_id,
            gp: this.gp,
            rush_att: this.rush_att,
            rush_yds: this.rush_yds,
            rush_avg: this.rush_avg,
            rush_td: this.rush_td,
            pass_comp: this.pass_comp,
            pass_att: this.pass_att,
            pass_yds: this.pass_yds,
            pass_td: this.pass_td,
            pass_int: this.pass_int,
            recieve_rec: this.recieve_rec,
            recieve_yds: this.recieve_yds,
            recieve_avg: this.recieve_avg,
            recieve_td: this.recieve_td,
            fg_att: this.fg_att,
            fg_made: this.fg_made
        });
    }

    /**
     * Create a PlayerStats2023 object from a JSON string.
     * @param {string} json - The JSON string representing the object.
     * @returns {PlayerStats2023} The PlayerStats2023 object.
     */
    static fromJson(json) {
        const data = JSON.parse(json);
        return new PlayerStats2023(
            data.player_id,
            data.gp,
            data.rush_att,
            data.rush_yds,
            data.rush_avg,
            data.rush_td,
            data.pass_comp,
            data.pass_att,
            data.pass_yds,
            data.pass_td,
            data.pass_int,
            data.recieve_rec,
            data.recieve_yds,
            data.recieve_avg,
            data.recieve_td,
            data.fg_att,
            data.fg_made
        );
    }

    /**
     * Create a PlayerStats2023 object from a response object.
     * @param {object} response - The response object.
     * @returns {PlayerStats2023} The PlayerStats2023 object.
     */
    static fromResponse(response) {
        return new PlayerStats2023(
            response.player_id,
            response.gp,
            response.rush_att,
            response.rush_yds,
            response.rush_avg,
            response.rush_td,
            response.pass_comp,
            response.pass_att,
            response.pass_yds,
            response.pass_td,
            response.pass_int,
            response.recieve_rec,
            response.recieve_yds,
            response.recieve_avg,
            response.recieve_td,
            response.fg_att,
            response.fg_made
        );
    }
}