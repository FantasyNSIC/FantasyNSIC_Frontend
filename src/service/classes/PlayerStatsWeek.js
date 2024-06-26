/**
 * This class contains the representation of a NSIC player's statistics for a given week.
 */
export class PlayerStatsWeek {
    /**
     * Represents a player's statistics for a given week.
     * @param {number} player_id - The player's id.
     * @param {number} rush_att - The number of rushing attempts.
     * @param {number} rush_yds - The number of rushing yards.
     * @param {number} rush_avg - The average rushing yards per attempt.
     * @param {number} rush_td - The number of rushing touchdowns.
     * @param {number} pass_comp - The number of passing completions.
     * @param {number} pass_att - The number of passing attempts.
     * @param {number} pass_yds - The number of passing yards.
     * @param {number} pass_td - The number of passing touchdowns.
     * @param {number} pass_int - The number of passing interceptions.
     * @param {number} recieve_rec - The number of receptions.
     * @param {number} recieve_yds - The number of receiving yards.
     * @param {number} recieve_avg - The average receiving yards per reception.
     * @param {number} recieve_td - The number of receiving touchdowns.
     * @param {number} fg_att - The number of field goal attempts.
     * @param {number} fg_made - The number of field goals made.
     * @param {number} week_points - The number of points scored in the week.
     */
    constructor(
        player_id,
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
        fg_made,
        week_points = 0.0
    ) {
        this.player_id = player_id;
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
        this.week_points = week_points;
    }

    /**
     * Returns the player's id.
     * @returns {number} The player's id.
     */
    getPlayerId() {
        return this._player_id;
    }

    /**
     * Sets the player's id.
     * @param {number} value - The player's id.
     */
    setPlayerId(value) {
        this._player_id = value;
    }

    /**
     * Returns the number of rushing attempts.
     * @returns {number} The number of rushing attempts.
     */
    getRushAttempts() {
        return this._rush_att;
    }

    /**
     * Sets the number of rushing attempts.
     * @param {number} value - The number of rushing attempts.
     */
    setRushAttempts(value) {
        this._rush_att = value;
    }

    /**
     * Returns the number of rushing yards.
     * @returns {number} The number of rushing yards.
     */
    getRushingYards() {
        return this._rush_yds;
    }

    /**
     * Sets the number of rushing yards.
     * @param {number} value - The number of rushing yards.
     */
    setRushingYards(value) {
        this._rush_yds = value;
    }

    /**
     * Returns the average rushing yards per attempt.
     * @returns {number} The average rushing yards per attempt.
     */
    getRushingAverage() {
        return this._rush_avg;
    }

    /**
     * Sets the average rushing yards per attempt.
     * @param {number} value - The average rushing yards per attempt.
     */
    setRushingAverage(value) {
        this._rush_avg = value;
    }

    /**
     * Returns the number of rushing touchdowns.
     * @returns {number} The number of rushing touchdowns.
     */
    getRushingTouchdowns() {
        return this._rush_td;
    }

    /**
     * Sets the number of rushing touchdowns.
     * @param {number} value - The number of rushing touchdowns.
     */
    setRushingTouchdowns(value) {
        this._rush_td = value;
    }

    /**
     * Returns the number of passing completions.
     * @returns {number} The number of passing completions.
     */
    getPassCompletions() {
        return this._pass_comp;
    }

    /**
     * Sets the number of passing completions.
     * @param {number} value - The number of passing completions.
     */
    setPassCompletions(value) {
        this._pass_comp = value;
    }

    /**
     * Returns the number of passing attempts.
     * @returns {number} The number of passing attempts.
     */
    getPassAttempts() {
        return this._pass_att;
    }

    /**
     * Sets the number of passing attempts.
     * @param {number} value - The number of passing attempts.
     */
    setPassAttempts(value) {
        this._pass_att = value;
    }

    /**
     * Returns the number of passing yards.
     * @returns {number} The number of passing yards.
     */
    getPassingYards() {
        return this._pass_yds;
    }

    /**
     * Sets the number of passing yards.
     * @param {number} value - The number of passing yards.
     */
    setPassingYards(value) {
        this._pass_yds = value;
    }

    /**
     * Returns the number of passing touchdowns.
     * @returns {number} The number of passing touchdowns.
     */
    getPassingTouchdowns() {
        return this._pass_td;
    }

    /**
     * Sets the number of passing touchdowns.
     * @param {number} value - The number of passing touchdowns.
     */
    setPassingTouchdowns(value) {
        this._pass_td = value;
    }

    /**
     * Returns the number of passing interceptions.
     * @returns {number} The number of passing interceptions.
     */
    getPassingInterceptions() {
        return this._pass_int;
    }

    /**
     * Sets the number of passing interceptions.
     * @param {number} value - The number of passing interceptions.
     */
    setPassingInterceptions(value) {
        this._pass_int = value;
    }

    /**
     * Returns the number of receptions.
     * @returns {number} The number of receptions.
     */
    getReceptions() {
        return this._recieve_rec;
    }

    /**
     * Sets the number of receptions.
     * @param {number} value - The number of receptions.
     */
    setReceptions(value) {
        this._recieve_rec = value;
    }

    /**
     * Returns the number of receiving yards.
     * @returns {number} The number of receiving yards.
     */
    getReceivingYards() {
        return this._recieve_yds;
    }

    /**
     * Sets the number of receiving yards.
     * @param {number} value - The number of receiving yards.
     */
    setReceivingYards(value) {
        this._recieve_yds = value;
    }

    /**
     * Returns the average receiving yards per reception.
     * @returns {number} The average receiving yards per reception.
     */
    getReceivingAverage() {
        return this._recieve_avg;
    }

    /**
     * Sets the average receiving yards per reception.
     * @param {number} value - The average receiving yards per reception.
     */
    setReceivingAverage(value) {
        this._recieve_avg = value;
    }

    /**
     * Returns the number of receiving touchdowns.
     * @returns {number} The number of receiving touchdowns.
     */
    getReceivingTouchdowns() {
        return this._recieve_td;
    }

    /**
     * Sets the number of receiving touchdowns.
     * @param {number} value - The number of receiving touchdowns.
     */
    setReceivingTouchdowns(value) {
        this._recieve_td = value;
    }

    /**
     * Returns the number of field goal attempts.
     * @returns {number} The number of field goal attempts.
     */
    getFieldGoalAttempts() {
        return this._fg_att;
    }

    /**
     * Sets the number of field goal attempts.
     * @param {number} value - The number of field goal attempts.
     */
    setFieldGoalAttempts(value) {
        this._fg_att = value;
    }

    /**
     * Returns the number of field goals made.
     * @returns {number} The number of field goals made.
     */
    getFieldGoalsMade() {
        return this._fg_made;
    }

    /**
     * Sets the number of field goals made.
     * @param {number} value - The number of field goals made.
     */
    setFieldGoalsMade(value) {
        this._fg_made = value;
    }

    /**
     * Returns the number of points scored in the week.
     * @returns {number} The number of points scored in the week.
     */
    getWeekPoints() {
        return this._week_points;
    }

    /**
     * Sets the number of points scored in the week.
     * @param {number} value - The number of points scored in the week.
     */
    setWeekPoints(value) {
        this._week_points = value;
    }

    /**
     * Returns the player's statistics based on their position.
     * @param {string} pos - The player's position.
     * @returns {object} The player's statistics.
     */
    filter_stats(pos) {
        if (pos === "RB") {
            return {
                week_points: this.week_points,
                rush_att: this.rush_att,
                rush_yds: this.rush_yds,
                rush_avg: this.rush_avg,
                rush_td: this.rush_td,
                recieve_rec: this.recieve_rec,
                recieve_yds: this.recieve_yds,
                recieve_avg: this.recieve_avg,
                recieve_td: this.recieve_td,
            };
        } else if (pos === "QB") {
            return {
                week_points: this.week_points,
                pass_comp: this.pass_comp,
                pass_att: this.pass_att,
                pass_yds: this.pass_yds,
                pass_td: this.pass_td,
                pass_int: this.pass_int,
                rush_att: this.rush_att,
                rush_yds: this.rush_yds,
                rush_avg: this.rush_avg,
                rush_td: this.rush_td,
            };
        } else if (pos === "WR") {
            return {
                week_points: this.week_points,
                recieve_rec: this.recieve_rec,
                recieve_yds: this.recieve_yds,
                recieve_avg: this.recieve_avg,
                recieve_td: this.recieve_td,
                rush_att: this.rush_att,
                rush_yds: this.rush_yds,
                rush_avg: this.rush_avg,
                rush_td: this.rush_td,
            };
        } else if (pos === "TE") {
            return {
                week_points: this.week_points,
                recieve_rec: this.recieve_rec,
                recieve_yds: this.recieve_yds,
                recieve_avg: this.recieve_avg,
                recieve_td: this.recieve_td,
                rush_att: this.rush_att,
                rush_yds: this.rush_yds,
                rush_avg: this.rush_avg,
                rush_td: this.rush_td,
            };
        } else if (pos === "K") {
            return {
                week_points: this.week_points,
                fg_att: this.fg_att,
                fg_made: this.fg_made,
            };
        } else {
            return {
                week_points: this.week_points,
            };
        }
    }

    /**
     * Returns the object as a JSON dictionary.
     * @returns {object} The object as a JSON dictionary.
     */
    toJson() {
        return {
            player_id: this.player_id,
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
            fg_made: this.fg_made,
            week_points: this.week_points,
        };
    }

    /**
     * Returns a player statistics object from a JSON dictionary.
     * @param {object} json - The JSON dictionary.
     * @returns {PlayerStatsWeek} The player statistics object.
     */
    static fromJson(json) {
        return new PlayerStatsWeek(
            json.player_id,
            json.rush_att,
            json.rush_yds,
            json.rush_avg,
            json.rush_td,
            json.pass_comp,
            json.pass_att,
            json.pass_yds,
            json.pass_td,
            json.pass_int,
            json.recieve_rec,
            json.recieve_yds,
            json.recieve_avg,
            json.recieve_td,
            json.fg_att,
            json.fg_made,
            json.week_points
        );
    }

    /**
     * Returns a player statistics object from a response object.
     * @param {object} response - The response object.
     * @returns {PlayerStatsWeek} The player statistics object.
     */
    static fromResponse(response) {
        return new PlayerStatsWeek(
            response.player_id,
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
            response.fg_made,
            response.week_points
        );
    }
}
