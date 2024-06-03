import React from "react";
import './PageSelectionBar.less';

const PageSelectionBar = () => {
    return (
        <div className="page-selection-bar-main-container">
            <div className="page-selection-bar-button-container">
                <div className="page-selection-bar-button">My Team</div>
                <div className="page-selection-bar-divider" />
                <div className="page-selection-bar-button">Players</div>
                <div className="page-selection-bar-divider" />
                <div className="page-selection-bar-button">Matchup</div>
                <div className="page-selection-bar-divider" />
                <div className="page-selection-bar-button">Scoreboard</div>
                <div className="page-selection-bar-divider" />
                <div className="page-selection-bar-button">League</div>
                <div className="page-selection-bar-divider" />
                <div className="page-selection-bar-button">Standings</div>
            </div>
        </div>
    );
}

export default PageSelectionBar;