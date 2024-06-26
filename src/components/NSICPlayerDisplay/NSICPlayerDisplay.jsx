import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getNSICPlayerInfo } from "../../service/fantasyService";
import { getBigLogoFunction } from "../../images/bigLogos/getBigLogoFunction";
import { getTeamColorMain, getTeamColorSecondary } from "./getTeamColorFunction.js";
import { FiAlertTriangle } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { NSICPlayer } from "../../service/classes/NSICPlayer";
import { NSICTeam } from "../../service/classes/NSICTeam";
import { PlayerStats2023 } from "../../service/classes/PlayerStats2023";
import "./NSICPlayerDisplay.less";

// Main component for displaying player information.
const NSICPlayerDisplay = ({handleClose, player_id}) => {
    if (player_id === 0) { return null; }
    
    // Use state to hold the player information.
    const [playerGeneralInfo, setPlayerGeneralInfo] = useState(NSICPlayer.empty_player());
    const [playerTeamInfo, setPlayerTeamInfo] = useState(NSICTeam.empty());
    const [playerStats2023, setPlayerStats2023] = useState(PlayerStats2023.empty(0));
    const [playerWeeklyStats, setPlayerWeeklyStats] = useState([]);

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

    return ReactDOM.createPortal(
        (
        <div className="nsic-player-display-overlay">
            <div className="nsic-player-display-content" onClick={(e) => e.stopPropagation()}>
                <div className="nsic-player-display-top-info-container">
                    <div className="nsic-player-display-top-info-team-graphic"
                        style={{'--background-color': `${getTeamColorMain(playerGeneralInfo.team_id)}`}}>
                        <div className="nsic-player-display-top-info-diag-overlay">
                            <div className="nsic-player-display-top-indo-diag-alternate"
                                style={{'--background-color': `${getTeamColorSecondary(playerGeneralInfo.team_id)}`}}/>
                        </div>
                        <img className="nsic-player-display-team-big-logo"
                            src={getBigLogoFunction(playerGeneralInfo.team_id)} />
                    </div>
                    <div className="nsic-player-display-top-info-player-general-container">
                        <div className="nsic-player-display-heading-buttons">
                            <div className="nsic-player-display-x-button" onClick={() => handleClose()}>
                                <FiX />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ), document.getElementById("portal-root")
    )
}

export default NSICPlayerDisplay;
