import React from "react";
import { Link } from "react-router-dom";
import './PageSelectionBar.less';

const PageSelectionBar = ({userTeamId, leagueId}) => {
    return (
        <div className="page-selection-bar-main-container">
            <div className="page-selection-bar-button-container">
                <Link to={`/myteam?user_team_id=${userTeamId}&league_id=${leagueId}`}
                    className="page-selection-bar-button">My Team</Link>
                <div className="page-selection-bar-divider" />
                <Link to={`/players?user_team_id=${userTeamId}&league_id=${leagueId}`}
                    className="page-selection-bar-button">Players</Link>
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