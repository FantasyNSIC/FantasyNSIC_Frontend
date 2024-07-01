import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getNSICPlayerInfo } from "../../service/fantasyService";
import { getBigLogoFunction } from "../../images/bigLogos/getBigLogoFunction";
import { getTeamColorMain, getTeamColorSecondary } from "./getTeamColorFunction.js";
import { FiAlertTriangle, FiX, FiPlusCircle, FiMinusCircle, FiSlash } from "react-icons/fi";
import { NSICPlayer } from "../../service/classes/NSICPlayer";
import { NSICTeam } from "../../service/classes/NSICTeam";
import { PlayerStats2023 } from "../../service/classes/PlayerStats2023";
import { PlayerStatsWeek } from "../../service/classes/PlayerStatsWeek.js";
import "./NSICPlayerDisplay.less";

// Main component for displaying player information.
const NSICPlayerDisplay = ({handleClose, player_id, playerPos, actionButton = "none"}) => {
    if (player_id === 0) { return null; }
    
    // Use state to hold the player information.
    const [playerGeneralInfo, setPlayerGeneralInfo] = useState(NSICPlayer.empty_player());
    const [playerTeamInfo, setPlayerTeamInfo] = useState(NSICTeam.empty());
    const [playerStats2023, setPlayerStats2023] = useState(PlayerStats2023.empty(0));
    const [playerWeeklyStats, setPlayerWeeklyStats] = useState([]);

    // Use state to hold the filter for the stats table.
    const [playerStatsWeekChecked, setPlayerStatsWeekChecked] = useState(false);
    const [playerStats2023Checked, setPlayerStats2023Checked] = useState(false);
    const [playerStatsWeekFilter, setPlayerStatsWeekFilter] = useState(playerPos);
    const [playerStats2023Filter, setPlayerStats2023Filter] = useState(playerPos);

    // Use state to hold the error message.
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // Fetch the player information when the component renders.
    useEffect(() => {
        const fetchPlayerInfo = async () => {
            try {
                const response = await getNSICPlayerInfo(player_id);
                setPlayerGeneralInfo(response.player_info);
                setPlayerTeamInfo(response.player_team);
                setPlayerStats2023(response.stats_2023);
                setPlayerWeeklyStats(response.weekly_stats);
            } catch (exception) {
                setShowError(true);
                setError(exception.message); // Access the message property of the error
            }
        };
        fetchPlayerInfo();
    }, []);

    // UseEffect for disabling the background scrolling.
    useEffect(() => {
        if (player_id !== 0) { document.body.classList.add('no-scroll')}
        else { document.body.classList.remove('no-scroll') }
        return () => { document.body.classList.remove('no-scroll') }
    }, [player_id]);

    // Function for handling stats filter checkbox.
    function handleStatsFilter(type) {
        if (type === "week") {
            setPlayerStatsWeekChecked(prevChecked => {
                const newChecked = !prevChecked;
                setPlayerStatsWeekFilter(newChecked ? "ALL" : playerPos);
                return newChecked;
            });
        } else if (type === "2023") {
            setPlayerStats2023Checked(prevChecked => {
                const newChecked = !prevChecked;
                setPlayerStats2023Filter(newChecked ? "ALL" : playerPos);
                return newChecked;
            });
        }
    };

    // Stats table for displaying weekly stats.
    const WeeklyStatsTable = ({ headings, data, pos }) => {
        const filteredData = data.map(week => week.filterStats(pos));
        const cellWidth = Math.max(100, 500 / headings.length);
    
        return (
            <table className="nsic-player-display-stats-table">
                <thead className="nsic-player-display-stats-table-thead">
                    <tr className="nsic-player-display-stats-table-tr">
                        <th className="nsic-player-display-stats-table-th-empty"
                            style={{'--minWidth': `${cellWidth}px`}}></th>
                        {headings.map((heading, index) => (
                            <th className="nsic-player-display-stats-table-th" key={index}
                                style={{'--minWidth': `${cellWidth}px`}}>
                                {heading}
                            </th>))}
                    </tr>
                </thead>
                <tbody className="nsic-player-display-stats-table-tbody">
                    {filteredData.map((row, rowIndex) => (
                        <tr className="nsic-player-display-stats-table-tr" key={rowIndex}>
                            <td className="nsic-player-display-stats-table-td-week"
                                style={{'--minWidth': `${cellWidth}px`}}>
                                Week {rowIndex + 1}
                            </td>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td className="nsic-player-display-stats-table-td" key={cellIndex}
                                    style={{'--minWidth': `${cellWidth}px`}}>
                                    {cell}
                                </td>))}
                        </tr>))}
                </tbody>
            </table>
        );
    };

    // Stats table for displaying 2023 stats.
    const Stats2023Table = ({ headings, data, pos }) => {
        const filteredData = data.filterStats(pos);
        const cellWidth = Math.max(100, 500 / headings.length);

        return (
            <table className="nsic-player-display-stats-table">
                <thead className="nsic-player-display-stats-table-thead">
                    <tr className="nsic-player-display-stats-table-tr">
                        <th className="nsic-player-display-stats-table-th-empty"
                            style={{'--minWidth': `${cellWidth}px`}}></th>
                        {headings.map((heading, index) => (
                            <th className="nsic-player-display-stats-table-th" key={index}
                                style={{'--minWidth': `${cellWidth}px`}}>
                                {heading}
                            </th>))}
                    </tr>
                </thead>
                <tbody className="nsic-player-display-stats-table-tbody-2023">
                        <tr className="nsic-player-display-stats-table-tr">
                            <td className="nsic-player-display-stats-table-td-week"
                                style={{'--minWidth': `${cellWidth}px`}}>2023
                            </td>
                            {Object.values(filteredData).map((cell, cellIndex) => (
                                <td className="nsic-player-display-stats-table-td" key={cellIndex}
                                    style={{'--minWidth': `${cellWidth}px`}}>
                                    {cell}
                                </td>))}
                        </tr>
                </tbody>
            </table>
        );
    };

    return ReactDOM.createPortal(
        (
        <div className="nsic-player-display-overlay">
            <div className="nsic-player-display-content" onClick={(e) => e.stopPropagation()}>
                <div className="nsic-player-display-top-info-container">
                    <div className="nsic-player-display-top-info-team-graphic"
                        style={{'--background-color': `${getTeamColorMain(playerGeneralInfo.team_id)}`}}>
                        <div className="nsic-player-display-top-info-diag-overlay">
                            <div className="nsic-player-display-top-indo-diag-alternate"
                                style={{'--background-color': `${getTeamColorSecondary(
                                    playerGeneralInfo.team_id)}`}}/>
                        </div>
                        <div className="nsic-player-display-top-info-team-graphic-logo-container">
                            <div className="nsic-player-display-team-graphic-jersey-number-container">
                                <div className="nsic-player-display-team-graphic-jersey-number">
                                    #{playerGeneralInfo.jersey_number}
                                </div>
                            </div>
                            <img className="nsic-player-display-team-big-logo"
                                src={getBigLogoFunction(playerGeneralInfo.team_id)} />
                        </div>
                    </div>
                    <div className="nsic-player-display-top-info-player-general-container">
                        <div className="nsic-player-display-heading-buttons">
                            <div className="nsic-player-display-x-button" onClick={() => handleClose()}>
                                <FiX />
                            </div>
                        </div>
                        <div className="nsic-player-display-general-name-container">
                            <div className="nsic-player-display-general-name">
                                {playerGeneralInfo.first_name} {playerGeneralInfo.last_name}
                            </div>
                        </div>
                        <div className="nsic-player-display-general-info-container">
                            <div className="nsic-player-display-general-info">
                                Team: {playerTeamInfo.abr}
                            </div>
                        </div>
                        <div className="nsic-player-display-general-info-container">
                            <div className="nsic-player-display-general-info">
                                Pos: {playerGeneralInfo.pos}
                            </div>
                        </div>
                        <div className="nsic-player-display-general-info-container">
                            <div className="nsic-player-display-general-info">
                                Class: {playerGeneralInfo.cls}
                            </div>
                        </div>
                        <div className="nsic-player-display-general-info-hwtp-container">
                            <div className="nsic-player-display-general-info-hwtp">
                                <div className="nsic-player-display-general-info-hwtp-heading-container">
                                    <div className="nsic-player-display-general-info-hwtp-heading">
                                        Height</div>
                                </div>
                                <div className="nsic-player-display-general-info-hwtp-info-container">
                                    <div className="nsic-player-display-general-info-hwtp-info">
                                        {playerGeneralInfo.height}
                                    </div>
                                </div>
                            </div>
                            <div className="nsic-player-display-general-info-hwtp">
                                <div className="nsic-player-display-general-info-hwtp-heading-container">
                                    <div className="nsic-player-display-general-info-hwtp-heading">
                                        Weight</div>
                                </div>
                                <div className="nsic-player-display-general-info-hwtp-info-container">
                                    <div className="nsic-player-display-general-info-hwtp-info">
                                        {playerGeneralInfo.weight}
                                    </div>
                                </div>
                            </div>
                            <div className="nsic-player-display-general-info-hwtp">
                            <div className="nsic-player-display-general-info-hwtp-heading-container">
                                    <div className="nsic-player-display-general-info-hwtp-heading">
                                        Total Points</div>
                                </div>
                                <div className="nsic-player-display-general-info-hwtp-info-container">
                                    <div className="nsic-player-display-general-info-hwtp-info">
                                        {playerGeneralInfo.total_points}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nsic-player-display-action-button-container">
                    {actionButton === "add" && (<div className="nsic-player-display-action-button-add">
                        <FiPlusCircle/>ADD</div>)}
                    {actionButton === "drop" && (<div className="nsic-player-display-action-button-drop">
                        <FiMinusCircle/>DROP</div>)}
                    {actionButton === "none" && (<div className="nsic-player-display-action-button-none">
                        <FiSlash/>NONE</div>)}
                </div>
                <div className="nsic-player-display-stats-heading-container">
                    <div className="nsic-player-display-stats-heading">Weekly Stats:</div>
                    <div className="nsic-player-display-stats-weekly-filter-container">
                        Show full stats: 
                        <input className="nsic-player-display-stats-checkbox" type="checkbox"
                            checked={playerStatsWeekChecked} onChange={() => handleStatsFilter("week")}/>
                    </div>
                </div>
                <div className="nsic-player-display-weekly-stats-box-container">
                    <div className="nsic-player-display-stats-box">
                        {showError && (<div className="nsic-player-display-page-error-message-container">
                            <div className="nsic-player-display-page-error-message-box">
                                <FiAlertTriangle size={64} />{error}, Please try again later.</div>
                            </div>)}
                        <WeeklyStatsTable 
                            headings={PlayerStatsWeek.filterStatsHeadings(playerStatsWeekFilter)}
                            data={playerWeeklyStats}
                            pos={playerStatsWeekFilter}/>
                    </div>
                </div>
                <div className="nsic-player-display-stats-heading-container">
                    <div className="nsic-player-display-stats-heading">2023 Stats:</div>
                    <div className="nsic-player-display-stats-2023-filter-container">
                        Show full stats: 
                        <input className="nsic-player-display-stats-checkbox" type="checkbox"
                            checked={playerStats2023Checked} onChange={() => handleStatsFilter("2023")}/>
                    </div>
                </div>
                <div className="nsic-player-display-2023-stats-box-container">
                    <div className="nsic-player-display-stats-box">
                        <Stats2023Table
                            headings={PlayerStats2023.filterStatsHeadings(playerStats2023Filter)}
                            data={playerStats2023}
                            pos={playerStats2023Filter}/>
                    </div>
                </div>
            </div>
        </div>
        ), document.getElementById("portal-root")
    )
}

export default NSICPlayerDisplay;
