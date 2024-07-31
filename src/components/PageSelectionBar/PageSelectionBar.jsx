import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import './PageSelectionBar.less';

const PageSelectionBar = ({userTeamId, leagueId}) => {

    const [playerDropdownOpen, setPlayerDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setPlayerDropdownOpen(!playerDropdownOpen);
    };

    return (
        <div className="page-selection-bar-main-container">
            <div className="page-selection-bar-button-container">
                <Link to={`/myteam?user_team_id=${userTeamId}&league_id=${leagueId}`}
                    className="page-selection-bar-button">My Team</Link>
                <div className="page-selection-bar-divider" />
                <div className="page-selection-bar-dropdown">
                    <div onClick={toggleDropdown} className="page-selection-bar-button-dropdown-main">
                        Players {!playerDropdownOpen ? <TbTriangleInvertedFilled className="page-selection-triangle-indicator" />
                                : <TbTriangleFilled className="page-selection-triangle-indicator" />}
                    </div>
                    {playerDropdownOpen && (
                        <div className="page-selection-dropdown-menu">
                            <Link to={`/players?user_team_id=${userTeamId}&league_id=${leagueId}`}
                                className="page-selection-dropdown-item">Available</Link>
                            <Link to={`/draft?user_team_id=${userTeamId}&league_id=${leagueId}`}
                                className="page-selection-dropdown-item">Draft</Link>
                        </div>
                    )}
                </div>
                <div className="page-selection-bar-divider" />
                <Link to={`/matchup?user_team_id=${userTeamId}&league_id=${leagueId}`}
                    className="page-selection-bar-button">Matchup</Link>
                <div className="page-selection-bar-divider" />
                <Link to={`/scoreboard?user_team_id=${userTeamId}&league_id=${leagueId}`}
                    className="page-selection-bar-button">Scoreboard</Link>
                <div className="page-selection-bar-divider" />
                <Link to={`/league?user_team_id=${userTeamId}&league_id=${leagueId}`}
                    className="page-selection-bar-button">League</Link>
                <div className="page-selection-bar-divider" />
                <Link to={`/standings?user_team_id=${userTeamId}&league_id=${leagueId}`}
                    className="page-selection-bar-button">Standings</Link>
            </div>
        </div>
    );
}

export default PageSelectionBar;