import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMyTeamInfo } from "../../service/fantasyService.js";
import * as conFunctions from "./compareRosterWithConstraint.js";
import { getLogoFunction } from "../../images/getLogoFuncion.js";
import { UserRoster } from "../../service/classes/UserRoster.js";
import { LeagueConstraint } from "../../service/classes/LeagueConstraint.js";
import { FiAlertTriangle } from "react-icons/fi";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import EmptyProfile from '../../images/EmptyProfile.png'
import "./MyTeamPage.less";

const MyTeamPage = () => {

    // grab URL params
    const [searchParams] = useSearchParams();
    const user_team_id = searchParams.get("user_team_id");

    // state for displaying general error message, roster erros
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    const [rosterError, setRosterError] = useState("");
    const [rosterErrorShow, setRosterErrorShow] = useState(false);

    // States for keeping track of user-team's display information.
    // TODO: Add functionality for using custom profile pictures.
    const [teamProfilePicture, setTeamProfilePicture] = useState(EmptyProfile);
    const [teamName, setTeamName] = useState("--");
    const [teamLeague, setTeamLeague] = useState("--");
    const [leagueConstraints, setLeagueConstraints] = useState(new LeagueConstraint(0, 0, 0, 0, 0, 0, 0));
    const [teamFullName, setTeamFullName] = useState("--");
    const [teamWins, setTeamWins] = useState("--");
    const [teamLosses, setTeamLosses] = useState("--");
    const [teamRoster, setTeamRoster] = useState(new UserRoster());

    // Fetch the user-team's information and roster when the component renders.
    useEffect(() => {
        const fetchMyTeamInfo = async () => {
            try {
                const response = await getMyTeamInfo(user_team_id);
                // TODO: Set the team profile picture.
                setTeamName(response.teamName);
                setTeamLeague(response.leagueName);
                setLeagueConstraints(LeagueConstraint.fromConstraintsResponse(response.leagueConstraint));
                setTeamFullName(response.fullName);
                setTeamWins(response.wins);
                setTeamLosses(response.losses);
                setTeamRoster(response.roster);
            } catch (exception) {
                setError(exception.message); // Access the message property of the error
                setShowError(true);
            }
        };
        fetchMyTeamInfo();
    }, []);

    // Component for displaying the rostered players of the user-team.
    const RosterObject = ({player, pos}) => {
        if(!player && !pos) return(<div></div>);
        if(!player) return(<div className="my-team-page-roster-object-empty">
            <div className="my-team-page-roster-object-pos-box">{pos}</div>
        </div>);
        const name = `${player.first_name} ${player.last_name}`;
        return (
            <div className="my-team-page-roster-object">
                <div className="my-team-page-roster-object-pos-box">{pos}</div>
                <img className="my-team-page-roster-object-team-logo" src={getLogoFunction(player.team_id)} />
                <div className="my-team-page-roster-object-info">{name}</div>
                <div className="my-team-page-roster-object-info">{player.pos}</div>
                <div className="my-team-page-roster-object-info">{player.cls}</div>
                {/* TODO: Implement player season fantasy points. */}
                <div className="my-team-page-roster-object-info">{0}</div>
                <div className="my-team-page-roster-move-button">Move</div>
            </div>
        );
    }

    // Component for displaying the roster list of the user-team. 
    // Roster is UserRoster object. Constraints is LeagueConstraint object.
    const RosterObjectList = ({roster, constraints}) => {
        if (!constraints || !roster || constraints.getTotalPlayers() === 0) return(<div></div>);

        // Create list of objects for each position to render.
        const activeQB = roster.searchPlayer("QB", "active");
        const objectsQB = conFunctions.compareConstraintQB(activeQB, constraints.getQB());
        if (objectsQB[1] === true) { setRosterError("QB"); setRosterErrorShow(true);}
        const activeRB = roster.searchPlayer("RB", "active");
        const objectsRB = conFunctions.compareConstraintRB(activeRB, constraints.getRB());
        if (objectsRB[1] === true) { setRosterError("RB"); setRosterErrorShow(true);}
        const activeWR = roster.searchPlayer("WR", "active");
        const objectsWR = conFunctions.compareConstraintWR(activeWR, constraints.getWR());
        if (objectsWR[1] === true) { setRosterError("WR"); setRosterErrorShow(true);}
        const activeTE = roster.searchPlayer("TE", "active");
        const objectsTE = conFunctions.compareConstraintTE(activeTE, constraints.getTE());
        if (objectsTE[1] === true) { setRosterError("TE"); setRosterErrorShow(true);}
        const activeK = roster.searchPlayer("K", "active");
        const objectsK = conFunctions.compareConstraintK(activeK, constraints.getK());
        if (objectsK[1] === true) { setRosterError("K"); setRosterErrorShow(true);}
        const bench = roster.searchPlayer("ALL", "bench");
        const benchObjects = conFunctions.compareConstraintBench(bench, constraints.getBench());
        if (benchObjects[1] === true) { setRosterError("Bench"); setRosterErrorShow(true);}
        return (
            <div className="my-team-page-roster-object-list">
                {objectsQB[0].map((object, index) => <RosterObject 
                key={index} player={object[0]} pos={object[1]} />)}
                {objectsRB[0].map((object, index) => <RosterObject 
                key={index} player={object[0]} pos={object[1]} />)}
                {objectsWR[0].map((object, index) => <RosterObject 
                key={index} player={object[0]} pos={object[1]} />)}
                {objectsTE[0].map((object, index) => <RosterObject 
                key={index} player={object[0]} pos={object[1]} />)}
                {objectsK[0].map((object, index) => <RosterObject 
                key={index} player={object[0]} pos={object[1]} />)}
                <div className="my-team-page-roster-object-divider" />
                {benchObjects[0].map((object, index) => <RosterObject
                key={index} player={object[0]} pos={object[1]} />)}
                {/* TODO: Add overflow active roster spot? */}
            </div>
        )
    }
    
    return (
        <div className="my-team-page-main-container">
            <PageHeading />
            <div className="my-team-page-split-bar" />
            <PageSelectionBar />
            <div className="my-team-page-background-container">
                <div className="my-team-page-content-container">
                    <div className="my-team-page-team-info-container">
                        <div className="my-team-page-profile-picture-container">
                            <img className="my-team-page-profile-picture" src={teamProfilePicture} />
                        </div>
                        <div className="my-team-page-profile-picture-divider" />
                        <div className="my-team-page-team-details-container">
                            <div className="my-team-page-team-details">
                                <div className="my-team-page-team-details-name-text">{teamName}</div>
                            </div>
                            <div className="my-team-page-team-details-description">
                                <div className="my-team-page-team-details-description-league">{teamLeague}</div>
                                <div className="my-team-page-team-details-description-divider" />
                                <div className="my-team-page-team-details-description-userName">{teamFullName}</div>
                            </div>
                            <div className="my-team-page-team-details">
                                <div className="my-team-page-team-details-record-wins">Wins: {teamWins}</div>
                                <div className="my-team-page-team-details-record-losses">Losses: {teamLosses}</div>
                            </div>
                        </div>
                        {rosterErrorShow && (<div className="my-team-page-roster-error-message-container">
                            You have too many players in the following positions: {rosterError}. Please contact a developer.
                        </div>)}
                    </div>
                    <div className="my-team-page-roster-headings-container">
                        <div className="my-team-page-roster-header"
                        style={{'--margin-left': `${20}%`}}>Player</div>
                        <div className="my-team-page-roster-header"
                        style={{'--margin-left': `${10}%`}}>Position</div>
                        <div className="my-team-page-roster-header"
                        style={{'--margin-left': `${10}%`}}>Class</div>
                        <div className="my-team-page-roster-header"
                        style={{'--margin-left': `${10}%`}}>Points</div>
                        <div className="my-team-page-roster-header"
                        style={{'--margin-left': `${15}%`}}>Action</div>
                    </div>
                    <div className="my-team-page-roster-container">
                        <RosterObjectList roster={teamRoster} constraints={leagueConstraints} />
                        {showError && (<div className="my-team-page-error-message-container">
                            <div className="my-team-page-error-message-box">
                                <FiAlertTriangle size={64} />{error}, Please try again later.</div>
                            </div>)}
                    </div>
                </div>
            </div>
            <div className="my-team-page-footer-container" />
        </div>
    )
}

export default MyTeamPage;