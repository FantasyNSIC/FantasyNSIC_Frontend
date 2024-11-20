import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getLeagueInfo, getUserTeamInfo } from "../../service/fantasyService.js";
import { verify_user, verify_user_team_creds } from "../../service/authService.js";
import { LeagueConstraint } from "../../service/classes/LeagueConstraint.js";
import { FiAlertTriangle } from "react-icons/fi";
import { MyTeamInfoResponse } from "../../service/classes/responses/MyTeamInfoResponse.js";
import EmptyProfile from '../../images/EmptyProfile.png'
import LeagueLogo from '../../images/LeagueLogo.png'
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./LeaguePage.less";

const LeaguePage = () => {

    // Grab URL params
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");

    // State to hold the league info
    const [leagueName, setLeagueName] = useState("--");
    const [leagueConstraints, setLeagueConstraints] = useState(new LeagueConstraint(0, 0, 0, 0, 0, 0, 0));
    const [numberOfTeams, setNumberOfTeams] = useState(0);
    const [userTeamList, setUserTeamList] = useState([]);

    // State for user team information display
    const [showUserTeamObject, setShowUserTeamObject] = useState(false);
    const [userTeamObject, setUserTeamObject] = useState(MyTeamInfoResponse.empty());
    const [userTeamObjectError, setUserTeamObjectError] = useState(null);

    // State for displaying error message
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // Fetch the league info when the component renders
    useEffect(() => {
        const fetchLeagueInfo = async () => {
            try {
                const user = await verify_user();
                if (!user.data.status || !verify_user_team_creds(user.data.user_teams, user_team_id, league_id)) {
                    navigate("/login");
                    return;
                }
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

    // Function for fetching user team information
    async function handleUserTeamInfo(user_team_id) {
        try {
            const response = await getUserTeamInfo(user_team_id);
            setUserTeamObject(response);
        } catch (exception) {
            setUserTeamObjectError(exception.message);
        } finally {
            setShowUserTeamObject(true);
        }
    }

    // Function for closing the user team object
    function closeUserTeamInfo() {
        setShowUserTeamObject(false);
        setUserTeamObject(MyTeamInfoResponse.empty());
        setUserTeamObjectError(null);
    }

    // User Team Object component
    const UserTeamInfoObject = ({userTeamInfo}) => {
        if (userTeamObjectError !== null) return(<div className="league-page-user-team-info-object-overlay">
            <div className="league-page-user-team-info-object-content-error">{userTeamObjectError}</div>
        </div>);
        if (userTeamInfo.teamName === "") return(<div></div>);

        // UseEffect for disabling the background scrolling.
        useEffect(() => {
            if (userTeamInfo.teamName !== "") { document.body.classList.add('no-scroll')}
            else { document.body.classList.remove('no-scroll') }
            return () => { document.body.classList.remove('no-scroll') }
        }, [userTeamInfo]);

        return ReactDOM.createPortal(
            (
                <div className="league-page-user-team-info-object-overlay">
                    <div className="league-page-user-team-info-object-content">
                        <div className="league-page-user-team-info-object-header">
                            <div className="league-page-user-team-info-object-close-button"
                                onClick={() => closeUserTeamInfo()}>X</div>
                            <div className="league-page-user-team-info-object-header-text">
                                Team Info - {userTeamInfo.leagueName}</div>
                        </div>
                        <div className="league-page-user-team-info-object-info-container">
                            <div className="league-page-user-team-info-object-info-pic-container">
                                <img className="league-page-user-team-info-object-info-pic" src={EmptyProfile} />
                            </div>
                            <div className="league-page-user-team-info-object-info-divider" />
                            <div className="league-page-user-team-info-object-details-container">
                                <div className="league-page-user-team-info-object-details-bottom">
                                    <div className="league-page-user-team-info-object-details-text-big">
                                        {userTeamInfo.teamName}</div>
                                </div>
                                <div className="league-page-user-team-info-object-details">
                                    <div className="league-page-user-team-info-object-details-text">
                                        {userTeamInfo.fullName} | Wins: {userTeamInfo.wins} Losses: {userTeamInfo.losses}</div>
                                </div>
                            </div>
                        </div>
                        <div className="league-page-user-team-info-object-roster-heading">
                            <div className="league-page-user-team-info-object-roster-heading-text">Name</div>
                            <div className="league-page-user-team-info-object-roster-heading-text">Pos</div>
                            <div className="league-page-user-team-info-object-roster-heading-text">Class</div>
                            <div className="league-page-user-team-info-object-roster-heading-text">Points</div>
                        </div>
                        <div className="league-page-user-team-info-object-roster-container">

                        </div>
                    </div>
                </div>
            ), document.getElementById('portal-root')
        )
    };

    const UserTeamObject = ({userTeam}) => {
        if (!userTeam) return(<div></div>);
        return (
            <div className="league-page-user-team-object"
                onClick={() => handleUserTeamInfo(userTeam._user_team_id)}>
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
                    {showUserTeamObject && (<UserTeamInfoObject userTeamInfo={userTeamObject} />)}
                </div>
            </div>
            <div className="league-page-footer-container" />
        </div>
    )
}

export default LeaguePage;