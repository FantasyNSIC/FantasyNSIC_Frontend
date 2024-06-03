import React from "react";
import { Link } from "react-router-dom";
import './PageSelectionBar.less';

const PageSelectionBar = () => {
    return (
        <div className="page-selection-bar-main-container">
            <div className="page-selection-bar-button-container">
                <Link to="/myteam" className="page-selection-bar-button">My Team</Link>
                <div className="page-selection-bar-divider" />
                <Link to="/players" className="page-selection-bar-button">Players</Link>
                <div className="page-selection-bar-divider" />
                <Link to="/matchup" className="page-selection-bar-button">Matchup</Link>
                <div className="page-selection-bar-divider" />
                <Link to="/scoreboard" className="page-selection-bar-button">Scoreboard</Link>
                <div className="page-selection-bar-divider" />
                <Link to="/league" className="page-selection-bar-button">League</Link>
                <div className="page-selection-bar-divider" />
                <Link to="/standings" className="page-selection-bar-button">Standings</Link>
            </div>
        </div>
    );
}

export default PageSelectionBar;