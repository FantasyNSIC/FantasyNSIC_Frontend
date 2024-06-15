import { TeamRecord } from "../TeamRecord.js";

/**
 * This class contains the functionality of a list of Team_Record objects.
 */

export class StandingsInfoResponse {
    /**
     * Represents a list of Team_Record objects.
     * @param {Array} records - The list of user records.
     */
    constructor(records) {
        this._records = records;
    }

    /**
     * Returns the list of user records.
     * @returns {Array} - The list of user records.
     */
    getRecords() {
        return this._records;
    }

    /**
     * Sets the list of user records.
     * @param {Array} records - The list of user records.
     */
    setRecords(records) {
        if (!Array.isArray(records)) {
            throw new Error("Records must be an array.");
        }
        this._records = records;
    }

    /**
     * Sorts the list of records by losses and wins.
     */
    sortRecords() {
        this._records.sort((a, b) => {
            if (a.losses === b.losses) {
                return b.wins - a.wins;
            }
            return a.losses - b.losses;
        });
    }

    /**
     * Converts the object to a JSON serializable dictionary.
     * @returns {string} - The JSON string representation of the object.
     */
    toJson() {
        const data = {
            records: this._records.map(record => record.toJson())
        };
        return JSON.stringify(data);
    }

    /**
     * Creates a StandingsInfoResponse object from a JSON string.
     * @param {string} jsonStr - The JSON string representation of the object.
     * @returns {StandingsInfoResponse} - The StandingsInfoResponse object.
     */
    static fromJson(jsonStr) {
        const data = JSON.parse(jsonStr);
        const records = data.records.map(record => TeamRecord.fromJson(record));
        return new StandingsInfoResponse(records);
    }

    /**
     * Creates a StandingsInfoResponse object from a response object.
     * @param {Object} response - The response object.
     * @returns {StandingsInfoResponse} - The StandingsInfoResponse object.
     */
    static fromResponse(response) {
        const records = response.data.records.map(record => TeamRecord.fromResponse(record));
        return new StandingsInfoResponse(records);
    }
}
