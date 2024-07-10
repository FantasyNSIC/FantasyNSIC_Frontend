import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getLeagueInfo } from "../../service/fantasyService.js";
import { LeagueConstraint } from "../../service/classes/LeagueConstraint.js";
import { FiAlertTriangle } from "react-icons/fi";
import EmptyProfile from '../../images/EmptyProfile.png'
import LeagueLogo from '../../images/LeagueLogo.png'
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./LeaguePage.less";

const LeaguePage = () => {

    // Grab URL params
    const [searchParams] = useSearchParams();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");

    // State to hold the league info
    const [leagueName, setLeagueName] = useState("--");
    const [leagueConstraints, setLeagueConstraints] = useState(new LeagueConstraint(0, 0, 0, 0, 0, 0, 0));
    const [numberOfTeams, setNumberOfTeams] = useState(0);
    const [userTeamList, setUserTeamList] = useState([]);

    // State for displaying error message
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // Fetch the league info when the component renders
    useEffect(() => {
        const fetchLeagueInfo = async () => {
            try {
                const response = await getLeagueInfo(league_id);
                setLeagueName(response.league_name);
                setLeagueConstraints(LeagueConstraint.fromConstraintsResponse(response.league_constraint));
                setNumberOfTeams(response.number_of_teams);
                setUserTeamList(response.league_teams);
            } catch (exception) {
                setShowError(true);
                setError(exception.message); // Access the message property of the error
            }
        };
        fetchLeagueInfo();
    }, []);

    const UserTeamObject = ({userTeam}) => {
        if (!userTeam) return(<div></div>);
        return (
            <div className="league-page-user-team-object">
                <div className="league-page-user-team-object-profile-picture-container">
                    {/* TODO: Set up functionality for profile pictures */}
                    <img className="league-page-user-team-object-profile-picture" src={EmptyProfile} />
                </div>
                <div className="league-page-header-logo-divider" />
                <div className="league-page-user-team-object-details-container">
                    <div className="league-page-user-team-object-details">
                        <div className="league-page-user-team-object-details-text">
                            Team Name: {userTeam._team_name}</div>
                    </div>
                    <div className="league-page-user-team-object-details">
                        <div className="league-page-user-team-object-details-text">
                            Owner: {userTeam._full_name}</div>
                    </div>
                </div>
            </div>
        )
    }

    const UserTeamList = ({userTeamList}) => {
        if (!userTeamList || userTeamList.length === 0) return(<div></div>);
        return (
            <div className="league-page-user-teams-list">
                {userTeamList.map((userTeam, index) => (
                    <UserTeamObject key={index} userTeam={userTeam} />
                ))}
            </div>
        )
    }

    return (
        <div className="league-page-main-container">
            <PageHeading />
            <div className="league-page-split-bar" />
            <PageSelectionBar userTeamId={user_team_id} leagueId={league_id}/>
            <div className="league-page-background-container">
                <div className="league-page-content-container">
                    <div className="league-page-header-info-container">
                        <div className="league-page-header-logo-container">
                            <img className="league-page-header-logo" src={LeagueLogo} />
                        </div>
                        <div className="league-page-header-logo-divider" />
                        <div className="league-page-header-details-container">
                            <div className="league-page-header-details">
                                <div className="league-page-header-details-name-text">
                                    League Name: {leagueName}</div>
                            </div>
                            <div className="league-page-header-details">
                                <div className="league-page-header-details-text">
                                    Constraints: {leagueConstraints.toString()}</div>
                            </div>
                            <div className="league-page-header-details">
                                <div className="league-page-header-details-text">
                                    Number of Teams: {numberOfTeams}</div>
                            </div>
                        </div>
                    </div>
                    <div className="league-page-user-teams-container">
                        <UserTeamList userTeamList={userTeamList} />
                        {showError && (<div className="league-page-error-message-container">
                            <div className="league-page-error-message-box">
                                <FiAlertTriangle size={64} />{error}, Please try again later.</div>
                            </div>)}
                    </div>
                </div>
            </div>
            <div className="league-page-footer-container" />
        </div>
    )
}

export default LeaguePage;