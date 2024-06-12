/**
 * This class holds the constraints for a league. It contains the number of positions
 * each team is allowed. It also contains the number of players each team is allowed
 */

export class LeagueConstraint {
    /**
     * Constructor for LeagueConstraint class
     * @param {number} qb - The number of quarterbacks allowed
     * @param {number} rb - The number of running backs allowed
     * @param {number} wr - The number of wide receivers allowed
     * @param {number} te - The number of tight ends allowed
     * @param {number} k - The number of kickers allowed
     * @param {number} bench - The number of bench players allowed
     */
    constructor(qb, rb, wr, te, k, bench) {
        this.qb = qb;
        this.rb = rb;
        this.wr = wr;
        this.te = te;
        this.k = k;
        this.bench = bench;
    }

    /**
     * Get the number of quarterbacks allowed
     * @returns {number} The number of quarterbacks allowed
     */
    getQB() {
        return this.qb;
    }

    /**
     * Set the number of quarterbacks allowed
     * @param {number} qb - The number of quarterbacks allowed
     */
    setQB(qb) {
        this.qb = qb;
    }

    /**
     * Get the number of running backs allowed
     * @returns {number} The number of running backs allowed
     */
    getRB() {
        return this.rb;
    }

    /**
     * Set the number of running backs allowed
     * @param {number} rb - The number of running backs allowed
     */
    setRB(rb) {
        this.rb = rb;
    }

    /**
     * Get the number of wide receivers allowed
     * @returns {number} The number of wide receivers allowed
     */
    getWR() {
        return this.wr;
    }

    /**
     * Set the number of wide receivers allowed
     * @param {number} wr - The number of wide receivers allowed
     */
    setWR(wr) {
        this.wr = wr;
    }

    /**
     * Get the number of tight ends allowed
     * @returns {number} The number of tight ends allowed
     */
    getTE() {
        return this.te;
    }

    /**
     * Set the number of tight ends allowed
     * @param {number} te - The number of tight ends allowed
     */
    setTE(te) {
        this.te = te;
    }

    /**
     * Get the number of kickers allowed
     * @returns {number} The number of kickers allowed
     */
    getK() {
        return this.k;
    }

    /**
     * Set the number of kickers allowed
     * @param {number} k - The number of kickers allowed
     */
    setK(k) {
        this.k = k;
    }

    /**
     * Get the number of bench players allowed
     * @returns {number} The number of bench players allowed
     */
    getBench() {
        return this.bench;
    }

    /**
     * Set the number of bench players allowed
     * @param {number} bench - The number of bench players allowed
     */
    setBench(bench) {
        this.bench = bench;
    }

    /**
     * Get the total number of players allowed
     * @returns {number} The total number of players allowed
     */
    getTotalPlayers() {
        return this.qb + this.rb + this.wr + this.te + this.k + this.bench;
    }

    /**
     * Get the string representation of the constraints
     * @returns {string} The string representation of the constraints
     */
    toString() {
        return `QB: ${this.qb}, RB: ${this.rb}, WR: ${this.wr}, TE: ${this.te}, K: ${this.k}, Bench: ${this.bench}`;
    }

    /**
     * Forms new LeagueConstraint object from constraints response string.
     * @param {string} constraintsResponse - The constraints response string.
     * @returns {LeagueConstraint} - The new LeagueConstraint object.
     */
    static fromConstraintsResponse(constraintsResponse) {
        const leagueConstraints = {};
        const constraints = constraintsResponse.split(",");
        constraints.forEach((part) => {
            const [key, value] = part.split("-");
            leagueConstraints[key] = parseInt(value);
        });
        return new LeagueConstraint(leagueConstraints.QB, leagueConstraints.RB, leagueConstraints.WR,
            leagueConstraints.TE, leagueConstraints.K, leagueConstraints.BENCH);
    }
}