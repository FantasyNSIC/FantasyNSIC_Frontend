import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getScroreboardInfo } from "../../service/fantasyService.js";
import { FiAlertTriangle } from "react-icons/fi";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import EmptyProfile from '../../images/EmptyProfile.png'
import "./ScoreboardPage.less";

const ScoreboardPage = () => {

    // Grab URL params
    const [searchParams] = useSearchParams();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");

    // State to hold scoreboard info and matchups.
    const [league_name, setLeagueName] = useState("--");
    const [current_week, setCurrentWeek] = useState("--");
    const [matchups, setMatchups] = useState([]);

    // State for displaying error message
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // Fetch the scoreboard info when the component renders
    useEffect(() => {
        const fetchScoreboardInfo = async () => {
            try {
                const response = await getScroreboardInfo(league_id);
                setLeagueName(response.league_name);
                setCurrentWeek(response.current_week);
                setMatchups(response.matchups);
            } catch (exception) {
                setShowError(true);
                setError(exception.message); // Access the message property of the error
            }
        };
        fetchScoreboardInfo();
    }, []);

    // function for formatting the week text
    function formatWeekText(week) {
        if (week === "--") return ("--");
        const textList = week.split("_");
        return `Week ${textList[1]}`;
    }

    // Component for displaying a given matchup.
    const ScoreboardObject = ({matchup}) => {
        if (!matchup) return(<div></div>);
        return (
            <div className="scroeboard-page-scoreboard-object">
                <div className="scoreboard-page-scoreboard-object-team-general-container">
                    <div className="scoreboard-page-scoreboard-object-profile-picture-container">
                        {/* TODO: Team profile picture */}
                        <img src={EmptyProfile} className="scoreboard-page-scoreboard-object-profile-picture" />
                    </div>
                    <div className="scoreboard-page-scoreboard-object-picture-divider" />
                    <div className="scoreboard-page-scoreboard-object-team-name-container">
                        <div className="scoreboard-page-scoreboard-object-team-name-text">{matchup.team1._team_name}</div>
                    </div>
                    <div className="scoreboard-page-scoreboard-object-points-record-container">
                        <div className="scoreboard-page-scoreboard-object-points-conainer">
                            <div className="scoreboard-page-scoreboard-object-points-text">{matchup.team1Points}</div>
                        </div>
                        <div className="scoreboard-page-scoreboard-object-record-container">
                            <div className="scoreboard-page-scoreboard-object-record-text">{matchup.team1Wins}-{matchup.team1Losses}</div>
                        </div>
                    </div>
                </div>
                <div className="scoreboard-page-scoreboard-object-divider" />
                <div className="scoreboard-page-scoreboard-object-team-general-container">
                    <div className="scoreboard-page-scoreboard-object-points-record-container">
                        <div className="scoreboard-page-scoreboard-object-points-conainer">
                            <div className="scoreboard-page-scoreboard-object-points-text">{matchup.team2Points}</div>
                        </div>
                        <div className="scoreboard-page-scoreboard-object-record-container">
                            <div className="scoreboard-page-scoreboard-object-record-text">{matchup.team2Wins}-{matchup.team2Losses}</div>
                        </div>
                    </div>
                    <div className="scoreboard-page-scoreboard-object-team-name-container">
                        <div className="scoreboard-page-scoreboard-object-team-name-text">{matchup.team2._team_name}</div>
                    </div>
                    <div className="scoreboard-page-scoreboard-object-picture-divider" />
                    <div className="scoreboard-page-scoreboard-object-profile-picture-container">
                        {/* TODO: Team profile picture */}
                        <img src={EmptyProfile} className="scoreboard-page-scoreboard-object-profile-picture" />
                    </div>
                </div>
            </div>
        )
    }

    // Component for displaying matchups in a list.
    // Matchups is an array of WeekMatchup objects.
    const ScoreboardObjectList = ({matchups}) => {
        if (!matchups || matchups.length === 0) return(<div></div>);
        // Create a list of ScoreboardObject components
        return (
            <div className="scoreboard-page-scoreboard-object-list">
                {matchups.map((matchup, index) => {
                    return <ScoreboardObject matchup={matchup} key={index} />
                })}
            </div>
        )
    }

    return (
        <div className="scoreboard-page-main-container">
            <PageHeading />
            <div className="scoreboard-page-split-bar" />
            <PageSelectionBar userTeamId={user_team_id} leagueId={league_id}/>
            <div className="scoreboard-page-background-container">
                <div className="scoreboard-page-content-container">
                    <div className="scoreboard-page-heading-container">
                        <div className="scoreboard-page-heading-league-container">
                            <div className="scoreboard-page-heading-league-text">League: {league_name}</div>
                        </div>
                        <div className="scoreboard-page-heading-week-container">
                            <div className="scoreboard-page-heading-week-text">Scoreboard for {formatWeekText(current_week)}</div>
                            <select className="scoreboard-page-week-dropdown">
                                <option value="1">Week 1</option>
                                <option value="2">Week 2</option>
                                <option value="3">Week 3</option>
                                {/* TODO: Add more options for each week */}
                                {/* TODO: Design custom dropdown */}
                            </select>
                        </div>
                    </div>
                    <div className="scoreboard-page-scoreboard-object-container">
                        <ScoreboardObjectList matchups={matchups} />
                        {showError && (<div className="scoreboard-page-error-message-container">
                            <div className="scoreboard-page-error-message-box">
                                <FiAlertTriangle size={64} />{error}, Please try again later.</div>
                            </div>)}
                    </div>
                </div>
            </div>
            <div className="scoreboard-page-footer-container" />
        </div>
    )
}

export default ScoreboardPage;