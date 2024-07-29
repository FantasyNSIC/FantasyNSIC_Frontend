import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { getNSICPlayerInfo, getUserTeamRoster } from "../../service/fantasyService";
import { addNSICPlayerToRoster, dropNSICPlayerFromRoster, submitWaiverWireClaim } from "../../service/fantasyService";
import { getBigLogoFunction } from "../../images/bigLogos/getBigLogoFunction";
import { getLogoFunction } from "../../images/smallLogos/getLogoFuncion.js";
import { getTeamColorMain, getTeamColorSecondary } from "./getTeamColorFunction.js";
import { FiAlertTriangle, FiX, FiPlusCircle, FiMinusCircle, FiSlash } from "react-icons/fi";
import { NSICPlayer } from "../../service/classes/NSICPlayer";
import { NSICTeam } from "../../service/classes/NSICTeam";
import { PlayerStats2023 } from "../../service/classes/PlayerStats2023";
import { PlayerStatsWeek } from "../../service/classes/PlayerStatsWeek.js";
import { UserRoster } from "../../service/classes/UserRoster.js";
import { ConfirmationResponse } from "../../service/classes/responses/ConfirmationResponse.js";
import "./NSICPlayerDisplay.less";

// Main component for displaying player information.
const NSICPlayerDisplay = ({handleClose, player_id, playerPos, actionButton = "none"}) => {
    if (player_id === 0) { return null; }

    // grab URL params
    const [searchParams] = useSearchParams();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");
    
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

    // Use state for replace player popup.
    const [showReplacePlayer, setShowReplacePlayer] = useState(false);
    const [teamRoster, setTeamRoster] = useState(new UserRoster());
    const [replacePlayer, setReplacePlayer] = useState(0);

    // Use state for handling action button param switch.
    const [actionButtonState, setActionButtonState] = useState(actionButton);

    // Use state to hold the confirmation popup.
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Use state for triggering a reload of the base page.
    const [reloadBasePage, setReloadBasePage] = useState(false);

    // Use state for the confirmation response.
    const [showConfirmationResponse, setShowConfirmationResponse] = useState(false);
    const [confirmationResponse, setConfirmationResponse] = useState(ConfirmationResponse.createGeneralResponse());
    const [pauseButton, setPauseButton] = useState(false);

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

    // Async function for adding a player to the roster.
    async function addPlayerToRoster(player_id, user_team_id, league_id) {
        try {
            const response = await addNSICPlayerToRoster(player_id, user_team_id, league_id);
            setConfirmationResponse(response);
            setShowConfirmationResponse(true);
        } catch (exception) {
            setShowConfirmationResponse(true);
        } finally {
            setPauseButton(false);
        }
    }

    // Async function for dropping a player from the roster.
    async function dropPlayerFromRoster(player_id, user_team_id, league_id) {
        try {
            const response = await dropNSICPlayerFromRoster(player_id, user_team_id, league_id);
            setConfirmationResponse(response);
            setShowConfirmationResponse(true);
        } catch (exception) {
            setShowConfirmationResponse(true);
        } finally {
            setPauseButton(false);
        }
    }

    // Async function for submitting a waiver wire claim.
    async function submitWaiverWire(league_id, user_team_id, player_add, player_remove) {
        try {
            const response = await submitWaiverWireClaim(league_id, user_team_id, player_add, player_remove);
            setConfirmationResponse(response);
            setShowConfirmationResponse(true);
        } catch (exception) {
            setShowConfirmationResponse(true);
        } finally {
            setPauseButton(false);
        }
    }

    // Function for handling when the waiver button is clicked.
    async function handleWaiverButton() {
        setPauseButton(true);
        setShowReplacePlayer(true);
        try {
            const response = await getUserTeamRoster(league_id, user_team_id);
            setTeamRoster(response);
        } catch (exception) {
            setShowReplacePlayer(false);
            setShowConfirmationResponse(true);
        } finally {
            setPauseButton(false);
        }
    }

    // Function for handling setting the dropped player for waivers.
    function handleFillDropWaiverButton(player_id) {
        setReplacePlayer(player_id);
        setShowConfirmation(true);
    }

    // Function for handling any action from confirming popup.
    function handleActionConfirm(action) {
        return () => {
            setShowConfirmation(false);
            setPauseButton(true);
            if (action === "add") {
                addPlayerToRoster(player_id, user_team_id, league_id);
            } else if (action === "drop") {
                dropPlayerFromRoster(player_id, user_team_id, league_id);
            } else if (action === "waiver") {
                submitWaiverWire(league_id, user_team_id, player_id, replacePlayer);
                setShowReplacePlayer(false);
            }
            setActionButtonState("none");
            setReloadBasePage(true);
        }
    }
    
    // Function for handling cancel popup.
    function handleCancel() {
        setShowConfirmation(false);
    }

    // Function for handling closing the NSIC Player Display.
    function handleXButton() {
        if (reloadBasePage) { handleClose(true); }
        else { handleClose(); }
    }

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

    // Popup for handling replacing players when trying to add/waiver a player.
    const ReplacePlayerPopup = ({ teamRoster }) => {
        if (teamRoster === null) { return null; }
        const rosterBench = teamRoster.getRosterList("BENCH");
        return (
            <div className="nsic-player-display-replace-player-popup-overlay">
                <div className="nsic-player-display-replace-player-popup-content">
                    <div className="nsic-player-display-replace-player-heading-container">
                        <div className="nsic-player-display-replace-player-heading">Select player to replace:</div>
                        <div className="nsic-player-display-replace-player-close-button"
                            onClick={() => { if (!pauseButton) {setShowReplacePlayer(false);}}}><FiX/></div>
                    </div>
                    <div className="nsic-player-display-replace-player-roster-container">
                        {rosterBench.map((player, index) => { if (player.player_id === 0) { return (
                        <div key={index} className="nsic-player-display-replace-player-object-container">
                            <div className="nsic-player-display-replace-player-pos-box">BENCH</div>
                            <div className="nsic-player-display-replace-player-info-empty">
                                <div className="nsic-player-display-replace-player-fill-button-empty"
                                    onClick={() => { if (!pauseButton) handleFillDropWaiverButton(null)}}>Fill</div>
                            </div>
                        </div>) }
                        return (
                            <div key={index} className="nsic-player-display-replace-player-object-container">
                                <div className="nsic-player-display-replace-player-pos-box">BENCH</div>
                                <div className="nsic-player-display-replace-player-info">
                                    <img className="nsic-player-display-replace-player-team-logo" src={getLogoFunction(player.team_id)} />
                                    <div className="nsic-player-display-replace-player-info-general">
                                        {`${player.first_name} ${player.last_name}`}</div>
                                    <div className="nsic-player-display-replace-player-info-general">{player.pos}</div>
                                    <div className="nsic-player-display-replace-player-drop-button"
                                        onClick={() => { if (!pauseButton) handleFillDropWaiverButton(player.player_id)}}>Drop</div>
                                </div>
                            </div>
                        );})}
                    </div>
                </div>
            </div>
        )
    }

    // Confirmation popup for adding or dropping a player.
    const ConfirmationPopup = ({ action, onConfirm, onCancel }) => {
        return (
            <div className="nsic-player-display-confirmation-popup-overlay">
                <div className="nsic-player-display-confirmation-popup-content">
                    <div className="nsic-player-display-confirmation-popup-message-container">
                        <div className="nsic-player-display-confirmation-popup-message">
                            Are you sure you want to {action} this player?</div>
                    </div>
                    <div className="nsic-player-display-confirmation-popup-actions">
                        <div className="nsic-player-display-confirmation-popup-action-button-confirm"
                            onClick={onConfirm(action)}>Confirm</div>
                        <div className="nsic-player-display-confirmation-popup-action-button-cancel"
                            onClick={onCancel}>Cancel</div>
                    </div>
                </div>
            </div>
        )
    }

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
                            <div className="nsic-player-display-x-button"
                                onClick={() => { if (!pauseButton) { handleXButton() }}}><FiX />
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
                    {actionButtonState === "add" && (<div className="nsic-player-display-action-button-add"
                        onClick={() => setShowConfirmation(true)}><FiPlusCircle/>ADD</div>)}
                    {actionButtonState === "drop" && (<div className="nsic-player-display-action-button-drop"
                        onClick={() => setShowConfirmation(true)}><FiMinusCircle/>DROP</div>)}
                    {actionButtonState === "waiver" && (<div className="nsic-player-display-action-button-waiver"
                        onClick={() => handleWaiverButton()}><FiPlusCircle/>CLAIM</div>)}
                    {actionButtonState === "none" && (<div className="nsic-player-display-action-button-none">
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
            {showReplacePlayer && (<ReplacePlayerPopup teamRoster={teamRoster}/>)}
            {showConfirmation && (<ConfirmationPopup action={actionButtonState} onConfirm={handleActionConfirm}
                onCancel={handleCancel}/>)}
            {showConfirmationResponse && (<div className="nsic-player-display-confirmation-response-overlay"
                onClick={() => setShowConfirmationResponse(false)}>
                <div className={`nsic-player-display-confirmation-response-content${confirmationResponse.success ? "-true" : "-false"}`}>
                    <div className="nsic-player-display-confirmation-response-message-container">
                        <div className="nsic-player-display-confirmation-response-message">
                            {confirmationResponse.message}</div>
                    </div>
                </div>
            </div>)}
        </div>
        ), document.getElementById("portal-root")
    )
}

export default NSICPlayerDisplay;
