import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getStandingsInfo } from "../../service/fantasyService.js";
import { verify_user, verify_user_team_creds } from "../../service/authService.js";
import { FiAlertTriangle } from "react-icons/fi";
import { StandingsInfoResponse } from "../../service/classes/responses/StandingsInfoResponse.js";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./StandingsPage.less";

const StandingsPage = () => {

    // Grab URL params
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");

    // State to hold the list of standings
    const [standings, setStandings] = useState(new StandingsInfoResponse([]));

    // State for displaying error message
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // Fetch the standings when the component renders
    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const user = await verify_user();
                if (!user.data.status || !verify_user_team_creds(user.data.user_teams, user_team_id, league_id)) {
                    navigate("/login");
                    return;
                }
                const response = await getStandingsInfo(league_id);
                setStandings(response);
            } catch (exception) {
                setShowError(true);
                setError(exception.message); // Access the message property of the error
            }
        };
        fetchStandings();
    }, []);

    // Component for displaying a given team's record.
    // teamRecord is a TeamRecord object, place is what place the team is in.
    const StandingsObject =({teamRecord, place}) => {
        if (!teamRecord) return(<div></div>);
        return (
            <div className="standings-page-standings-object">
                <div className="standings-page-standings-object-place-container">
                    <div className="standings-page-standings-object-text">{place}</div>
                </div>
                <div className="standings-page-standings-object-name-container">
                    <div className="standings-page-standings-object-text">{teamRecord.user_team_name}</div>
                </div>
                <div className="standings-page-standings-object-wins-container">
                    <div className="standings-page-standings-object-text">{teamRecord.wins}</div>
                </div>
                <div className="standings-page-standings-object-losses-container">
                    <div className="standings-page-standings-object-text">{teamRecord.losses}</div>
                </div>
                <div className="standings-page-standings-object-points-for-container">
                    <div className="standings-page-standings-object-text">{teamRecord.points_for}</div>
                </div>
                <div className="standings-page-standings-object-points-against-container">
                    <div className="standings-page-standings-object-text">{teamRecord.points_against}</div>
                </div>
            </div>
        )
    }

    // Component for displaying standings in a list.
    // Standings is an array of TeamRecord objects.
    const StandingsObjectList = ({standings}) => {
        if (!standings || standings._records.length === 0) return(<div></div>);
        standings.sortRecords();
        const standingsSorted = standings._records;
        // Create a list of StandingsObject components
        return (
            <div className="standings-page-standings-object-list">
                {standingsSorted.map((teamRecord, index) => {
                    return <StandingsObject teamRecord={teamRecord} place={index + 1} key={index} />
                })}
            </div>
        )
    }

    return (
        <div className="standings-page-main-container">
            <PageHeading />
            <div className="standings-page-split-bar" />
            <PageSelectionBar userTeamId={user_team_id} leagueId={league_id}/>
            <div className="standings-page-background-container">
                <div className="standings-page-content-container">
                    <div className="standings-page-title-container">
                        <div className="standings-page-title-text">League Standings:</div>
                    </div>
                    <div className="standings-page-header-container">
                        <div className="standings-page-header-text"
                        style={{'--margin-left': `${5}%`}}>Place</div>
                        <div className="standings-page-header-text"
                        style={{'--margin-left': `${15}%`}}>Team</div>
                        <div className="standings-page-header-text"
                        style={{'--margin-left': `${15}%`}}>Wins</div>
                        <div className="standings-page-header-text"
                        style={{'--margin-left': `${12}%`}}>Losses</div>
                        <div className="standings-page-header-text"
                        style={{'--margin-left': `${12}%`}}>PF</div>
                        <div className="standings-page-header-text"
                        style={{'--margin-left': `${12}%`}}>PA</div>
                    </div>
                    <div className="standings-page-standings-object-container">
                        <StandingsObjectList standings={standings} />
                        {showError && (<div className="standings-page-error-message-container">
                            <div className="standings-page-error-message-box">
                                <FiAlertTriangle size={64} />{error}, Please try again later.</div>
                            </div>)}
                    </div>
                </div>
            </div>
            <div className="standings-page-footer-container" />
        </div>
    )
}

export default StandingsPage;