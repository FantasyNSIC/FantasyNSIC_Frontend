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
     * Get the number of games played.
     * @returns {number} The number of games played.
     */
    getGamesPlayed() {
        return this.gp;
    }

    /**
    * Get the number of rushing attempts.
    * @returns {number} The number of rushing attempts.
    */
    getRushingAttempts() {
        return this.rush_att;
    }

    /**
    * Get the number of rushing yards.
    * @returns {number} The number of rushing yards.
    */
    getRushingYards() {
        return this.rush_yds;
    }

    /**
    * Get the average rushing yards per attempt.
    * @returns {number} The average rushing yards per attempt.
    */
    getRushingAverage() {
        return this.rush_avg;
    }

    /**
    * Get the number of rushing touchdowns.
    * @returns {number} The number of rushing touchdowns.
    */
    getRushingTouchdowns() {
        return this.rush_td;
    }

    /**
    * Get the number of completed passes.
    * @returns {number} The number of completed passes.
    */
    getPassingCompletions() {
        return this.pass_comp;
    }

    /**
    * Get the number of pass attempts.
    * @returns {number} The number of pass attempts.
    */
    getPassingAttempts() {
        return this.pass_att;
    }
    
    /**
    * Get the number of passing yards.
    * @returns {number} The number of passing yards.
    */
    getPassingYards() {
        return this.pass_yds;
    }

    /**
    * Get the number of passing touchdowns.
    * @returns {number} The number of passing touchdowns.
    */
    getPassingTouchdowns() {
        return this.pass_td;
    }

    /**
    * Get the number of interceptions thrown.
    * @returns {number} The number of interceptions thrown.
    */
    getInterceptionsThrown() {
        return this.pass_int;
    }

    /**
    * Get the number of receptions.
    * @returns {number} The number of receptions.
    */
    getReceptions() {
        return this.recieve_rec;
    }

    /**
    * Get the number of receiving yards.
    * @returns {number} The number of receiving yards.
    */
    getReceivingYards() {
        return this.recieve_yds;
    }

    /**
    * Get the average receiving yards per reception.
    * @returns {number} The average receiving yards per reception.
    */
    getReceivingAverage() {
        return this.recieve_avg;
    }

    /**
    * Get the number of receiving touchdowns.
    * @returns {number} The number of receiving touchdowns.
    */
    getReceivingTouchdowns() {
        return this.recieve_td;
    }

    /**
    * Get the number of field goal attempts.
    * @returns {number} The number of field goal attempts.
    */
    getFieldGoalAttempts() {
        return this.fg_att;
    }

    /**
    * Get the number of field goals made.
    * @returns {number} The number of field goals made.
    */
    getFieldGoalsMade() {
        return this.fg_made;
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
}