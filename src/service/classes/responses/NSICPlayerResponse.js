import { NSICPlayer } from "../NSICPlayer.js";
import { NSICTeam } from "../NSICTeam.js";
import { PlayerStats2023 } from "../PlayerStats2023.js";
import { PlayerStatsWeek } from "../PlayerStatsWeek.js";

/**
 * This file contains the response class for returning all related info on a NSIC player.
 */


export class NSICPlayerResponse {
    /**
     * Represents a response object for the NSIC player information.
     * @param {NSICPlayer} player_info - The player's information.
     * @param {NSICTeam} player_team - The player's team.
     * @param {PlayerStats2023} stats_2023 - The player's 2023 statistics.
     * @param {Array<PlayerStatsWeek>} weekly_stats - The player's weekly statistics.
     */
    constructor(player_info, player_team, stats_2023, weekly_stats) {
        this.player_info = player_info;
        this.player_team = player_team;
        this.stats_2023 = stats_2023;
        this.weekly_stats = weekly_stats;
    }

    /**
     * Returns the player's information.
     * @returns {NSICPlayer} The player's information.
     */
    getPlayerInfo() {
        return this._player_info;
    }

    /**
     * Sets the player's information.
     * @param {NSICPlayer} player_info - The player's information.
     */
    setPlayerInfo(player_info) {
        if (!(player_info instanceof NSICPlayer)) {
            throw new Error('Player info must be a NSIC_Player object.');
        }
        this._player_info = player_info;
    }

    /**
     * Returns the player's team.
     * @returns {NSICTeam} The player's team.
     */
    getPlayerTeam() {
        return this._player_team;
    }

    /**
     * Sets the player's team.
     * @param {NSICTeam} player_team - The player's team.
     */
    setPlayerTeam(player_team) {
        if (!(player_team instanceof NSICTeam)) {
            throw new Error('Player team must be a NSIC_Team object.');
        }
        this._player_team = player_team;
    }

    /**
     * Returns the player's 2023 statistics.
     * @returns {PlayerStats2023} The player's 2023 statistics.
     */
    getStats2023() {
        return this._stats_2023;
    }

    /**
     * Sets the player's 2023 statistics.
     * @param {PlayerStats2023} stats_2023 - The player's 2023 statistics.
     */
    setStats2023(stats_2023) {
        if (!(stats_2023 instanceof PlayerStats2023)) {
            throw new Error('Stats 2023 must be a Player_Stats_2023 object.');
        }
        this._stats_2023 = stats_2023;
    }

    /**
     * Returns the player's weekly statistics.
     * @returns {Array<PlayerStatsWeek>} The player's weekly statistics.
     */
    getWeeklyStats() {
        return this._weekly_stats;
    }

    /**
     * Sets the player's weekly statistics.
     * @param {Array<PlayerStatsWeek>} weekly_stats - The player's weekly statistics.
     */
    setWeeklyStats(weekly_stats) {
        if (!weekly_stats.every((stats) => stats instanceof PlayerStatsWeek)) {
            throw new Error('All stats in weekly stats must be Player_Stats_Week object.');
        }
        this._weekly_stats = weekly_stats;
    }

    /**
     * Returns the response object as a dictionary.
     * @returns {Object} The response object as a dictionary.
     */
    toJson() {
        return {
            player_info: this.player_info.toJson(),
            player_team: this.player_team.toJson(),
            stats_2023: this.stats_2023.toJson(),
            weekly_stats: this.weekly_stats.map((stat) => stat.toJson()),
        };
    }

    /**
     * Creates a response object from a response.
     * @param {Object} response - The response object.
     * @returns {NSICPlayerResponse} The response object.
     */
    static fromResponse(response) {
        return new NSICPlayerResponse(
            NSICPlayer.fromResponse(response.data.player_info),
            NSICTeam.fromResponse(response.data.player_team),
            PlayerStats2023.fromResponse(response.data.stats_2023),
            response.data.weekly_stats.map((stat) => PlayerStatsWeek.fromResponse(stat)),
        );
    }
}
