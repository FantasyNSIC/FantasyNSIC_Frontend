import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { getMyTeamInfo, moveNSICPlayersOnRoster } from "../../service/fantasyService.js";
import { getWaiverWireClaims, deleteWaiverWireClaim } from "../../service/fantasyService.js";
import { getLogoFunction } from "../../images/smallLogos/getLogoFuncion.js";
import { UserRoster } from "../../service/classes/UserRoster.js";
import { ConfirmationResponse } from "../../service/classes/responses/ConfirmationResponse.js";
import { WaiverWiresResponse } from "../../service/classes/responses/WaiverWiresResponse.js";
import { FiAlertTriangle, FiX, FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import NSICPlayerDisplay from "../NSICPlayerDisplay/NSICPlayerDisplay.jsx";
import EmptyProfile from '../../images/EmptyProfile.png'
import "./MyTeamPage.less";

const MyTeamPage = () => {

    // grab URL params
    const [searchParams] = useSearchParams();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");

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
    const [teamFullName, setTeamFullName] = useState("--");
    const [teamWins, setTeamWins] = useState("--");
    const [teamLosses, setTeamLosses] = useState("--");
    const [teamRoster, setTeamRoster] = useState(new UserRoster());

    // Use state for the confirmation response.
    const [showConfirmationResponse, setShowConfirmationResponse] = useState(false);
    const [confirmationResponse, setConfirmationResponse] = useState(ConfirmationResponse.createGeneralResponse());

    // state for reloading roster after changes
    const [reloadRoster, setReloadRoster] = useState(false);
    const [pauseButtons, setPauseButtons] = useState(false);

    // state for displaying player display.
    const [showPlayerDisplay, setShowPlayerDisplay] = useState(false);
    const [playerID, setPlayerID] = useState(0);
    const [playerPos, setPlayerPos] = useState("");
    const [actionButton, setActionButton] = useState("none");

    // state for displaying move player pop up.
    const [showMovePlayerPop, setShowMovePlayerPop] = useState(false);
    const [movePlayer, setMovePlayer] = useState(null);
    const [movePlayerPos, setMovePlayerPos] = useState("");

    // state for displaying active waivers.
    const [showWaivers, setShowWaivers] = useState(false);
    const [waivers, setWaivers] = useState(new WaiverWiresResponse([]));

    // state for current day of week for rendering buttons
    const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay());

    // Fetch the user-team's information and roster when the component renders.
    useEffect(() => {
        const fetchMyTeamInfo = async () => {
            try {
                const response = await getMyTeamInfo(user_team_id);
                // TODO: Set the team profile picture.
                setTeamName(response.teamName);
                setTeamLeague(response.leagueName);
                setTeamFullName(response.fullName);
                setTeamWins(response.wins);
                setTeamLosses(response.losses);
                setTeamRoster(response.roster);
                setRosterErrorShow(response.overflowFlag);
                setRosterError(response.overflowPos);
            } catch (exception) {
                setError(exception.message); // Access the message property of the error
                setShowError(true);
            } finally {
                setPauseButtons(false);
            }
        };
        fetchMyTeamInfo();
    }, [reloadRoster]);

    // Async function for handling moving players.
    async function handleMovePlayer(player_id_1, player_id_2) {
        try {
            setPauseButtons(true);
            const response = await moveNSICPlayersOnRoster(user_team_id, league_id, player_id_1, player_id_2);
            if (response.success) {
                setShowMovePlayerPop(false);
                setReloadRoster(!reloadRoster);
            } else {
                setConfirmationResponse(response);
                setShowConfirmationResponse(true);
            }
        } catch (exception) {
            confirmationResponse.message = exception.message;
            setShowConfirmationResponse(true);
        } finally {
            setPauseButtons(false);
        }
    }

    // Async function for fetching the active waivers.
    async function handleFetchWaivers() {
        try {
            setPauseButtons(true);
            setShowWaivers(true);
            const response = await getWaiverWireClaims(user_team_id, league_id);
            setWaivers(response);
        } catch (exception) {
            confirmationResponse.message = exception.message;
            setShowConfirmationResponse(true);
        } finally {
            setPauseButtons(false);
        }
    }

    // Handle deleting a waiver wire claim.
    async function handleDeleteWaiverWireClaim(player_add, player_remove) {
        try {
            setPauseButtons(true);
            const response = await deleteWaiverWireClaim(league_id, user_team_id, player_add, player_remove);
            if (response.success) {
                handleFetchWaivers();
            } else {
                setConfirmationResponse(response);
                setShowConfirmationResponse(true);
            }
        } catch (exception) {
            confirmationResponse.message = exception.message;
            setShowConfirmationResponse(true);
        } finally {
            setPauseButtons(false);
        }
    }

    // Function for handling displaying pop up when player is clicked.
    function handlePlayerDisplay(player_id, player_pos, action = "none") {
        setPlayerID(player_id);
        setPlayerPos(player_pos);
        setActionButton(action);
        setShowPlayerDisplay(true);
    }

    // Handles closing the player display.
    function closePlayerDisplay(reload = false) {
        setShowPlayerDisplay(false);
        setPlayerID(0);
        setPlayerPos("");
        if (reload) {
            setPauseButtons(true);
            setReloadRoster(!reloadRoster);
        }
    }

    // Component for displaying the rostered players of the user-team.
    const RosterObject = ({player, pos}) => {
        if(!player && !pos) return(<div></div>);
        if(!player || player.player_id === 0) return(<div className="my-team-page-roster-object-empty">
            <div className="my-team-page-roster-object-pos-box">{pos}</div>
        </div>);
        const name = `${player.first_name} ${player.last_name}`;
        return (
            <div className="my-team-page-roster-object">
                <div className="my-team-page-roster-object-pos-box">{pos}</div>
                <img className="my-team-page-roster-object-team-logo" src={getLogoFunction(player.team_id)} />
                <div className="my-team-page-roster-object-info-name"
                    onClick={() => { if (!pauseButtons && (dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 6)) {
                        handlePlayerDisplay(player.player_id, player.pos)}
                        else { handlePlayerDisplay(player.player_id, player.pos, "drop") }}}>{name}</div>
                <div className="my-team-page-roster-object-info">{player.pos}</div>
                <div className="my-team-page-roster-object-info">{player.cls}</div>
                <div className="my-team-page-roster-object-info">{player.total_points}</div>
                <div className={`my-team-page-roster-move-button${dayOfWeek === 0 || dayOfWeek === 6 ? "-disabled" : ""}`}
                    onClick={() => { if (!pauseButtons && (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 3 ||
                        dayOfWeek === 4 || dayOfWeek === 5)) { setMovePlayer(player); setMovePlayerPos(pos);
                        setShowMovePlayerPop(true); }}}>Move</div>
            </div>
        );
    }

    // Component for displaying the roster list of the user-team. 
    // Roster is UserRoster object. Constraints is LeagueConstraint object.
    const RosterObjectList = ({roster}) => {
        if (!roster) return(<div></div>);
        return (
            <div className="my-team-page-roster-object-list">
                {roster.QB.map((object, index) => <RosterObject 
                key={index} player={object} pos={"QB"} />)}
                {roster.RB.map((object, index) => <RosterObject
                key={index} player={object} pos={"RB"} />)}
                {roster.WR.map((object, index) => <RosterObject
                key={index} player={object} pos={"WR"} />)}
                {roster.TE.map((object, index) => <RosterObject
                key={index} player={object} pos={"TE"} />)}
                {roster.K.map((object, index) => <RosterObject
                key={index} player={object} pos={"K"} />)}
                <div className="my-team-page-roster-object-divider" />
                {roster.BENCH.map((object, index) => <RosterObject
                key={index} player={object} pos={"BENCH"} />)}
                {/* TODO: Add overflow active roster spot? */}
            </div>
        )
    }

    // Display pop for handling moving players.
    const MovePlayerPopUp = ({player, pos}) => {
        if (player === null || pos === "") return (<div></div>);
        let posRoster = []
        let altPos = ""
        if (pos === "BENCH") { posRoster = teamRoster.getRosterList(player.pos); altPos = player.pos;}
        else { posRoster = teamRoster.getBenchList(player.pos); altPos = "BENCH";}
        const playerName = `${player.first_name} ${player.last_name}`;

        // UseEffect for disabling the background scrolling.
        useEffect(() => {
            if (player !== null) { document.body.classList.add('no-scroll')}
            else { document.body.classList.remove('no-scroll') }
            return () => { document.body.classList.remove('no-scroll') }
        }, [player]);

        return ReactDOM.createPortal(
            (
            <div className="my-team-page-move-player-overlay">
                <div className="my-team-page-move-player-content">
                    <div className="my-team-page-move-player-heading-container">
                        <div className="my-team-page-move-player-heading">Move Player:</div>
                        <div className="my-team-page-move-player-close-button"
                            onClick={() => { if (!pauseButtons) {setShowMovePlayerPop(false);}}}><FiX/></div>
                    </div>
                    <div className="my-team-page-move-player-main-player-container">
                        <div className="my-team-page-roster-object-pos-box">{pos}</div>
                        <div className="my-team-page-move-player-main-player-info">
                            <img className="my-team-page-roster-object-team-logo" src={getLogoFunction(player.team_id)} />
                            <div className="my-team-page-roster-object-info-name"
                                onClick={() => { if (!pauseButtons) {handlePlayerDisplay(player.player_id, player.pos)}}}>{playerName}</div>
                            <div className="my-team-page-roster-object-info">{player.pos}</div>
                            <div className="my-team-page-move-player-here-button-null">Here</div>
                        </div>
                    </div>
                    <div className="my-team-page-move-player-sub-players-container">
                        {posRoster.map((object, index) => { if (object.player_id === 0) { return (
                            <div key={index} className="my-team-page-move-player-sub-player-container">
                                <div className="my-team-page-roster-object-pos-box">{altPos}</div>
                                <div className="my-team-page-move-player-sub-player-info-empty">
                                    <div className="my-team-page-move-player-here-button-empty"
                                        onClick={() => { if (!pauseButtons) handleMovePlayer(player.player_id, null)}}>Here</div>
                                </div>
                            </div>) }
                            return (
                                <div key={index} className="my-team-page-move-player-sub-player-container">
                                    <div className="my-team-page-roster-object-pos-box">{altPos}</div>
                                    <div className="my-team-page-move-player-sub-player-info">
                                        <img className="my-team-page-roster-object-team-logo" src={getLogoFunction(object.team_id)} />
                                        <div className="my-team-page-roster-object-info-name"
                                            onClick={() => { if (!pauseButtons) {handlePlayerDisplay(object.player_id, object.pos)}}}>
                                            {`${object.first_name} ${object.last_name}`}</div>
                                        <div className="my-team-page-roster-object-info">{object.pos}</div>
                                        <div className="my-team-page-move-player-here-button"
                                            onClick={() => { if (!pauseButtons) {handleMovePlayer(player.player_id, object.player_id)}}}>
                                                Here</div>
                                    </div>
                                </div>
                            );})}
                    </div>
                    {showConfirmationResponse && (<div className="my-team-page-confirmation-response-overlay"
                        onClick={() => setShowConfirmationResponse(false)}>
                        <div className="my-team-page-confirmation-response-content-false">
                            <div className="my-team-page-confirmation-response-message-container">
                                <div className="my-team-page-confirmation-response-message">
                                    {confirmationResponse.message}</div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            ), document.getElementById("portal-root")
        )
    }

    // Display pop up for active waivers.
    const WaiverWirePopUp = ({waivers}) => {
        if (waivers === null) return (<div></div>);

        // UseEffect for disabling the background scrolling.
        useEffect(() => {
            if (waivers !== null) { document.body.classList.add('no-scroll')}
            else { document.body.classList.remove('no-scroll') }
            return () => { document.body.classList.remove('no-scroll') }
        }, [waivers]);

        return ReactDOM.createPortal(
            (
            <div className="my-team-page-waiver-wire-overlay">
                <div className="my-team-page-waiver-wire-content">
                    <div className="my-team-page-waiver-wire-heading-container">
                        <div className="my-team-page-waiver-wire-heading">Active Waivers:</div>
                        <div className="my-team-page-waiver-wire-close-button"
                            onClick={() => { if (!pauseButtons) {setShowWaivers(false);}}}><FiX/></div>
                    </div>
                    <div className="my-team-page-waiver-wire-main-container">
                        {waivers.waiverWireClaims.map((claim, index) => {
                            const playerNameAdd = `${claim.addedPlayer.first_name} ${claim.addedPlayer.last_name}`;
                            const playerNameDrop = claim.droppedPlayer === null ? null
                                : `${claim.droppedPlayer.first_name} ${claim.droppedPlayer.last_name}`;
                            return (
                                <div key={index} className="my-team-page-waiver-wire-claim-container">
                                    <div className="my-team-page-waiver-wire-claim-button-container">
                                        <div className="my-team-page-waiver-wire-claim-drop-button"
                                        onClick={() => { if (!pauseButtons) {handleDeleteWaiverWireClaim(
                                            claim.addedPlayer.player_id, claim.droppedPlayer === null ? null : claim.droppedPlayer.player_id
                                        )}}}>Drop Claim</div>
                                    </div>
                                    <div className="my-team-page-waiver-wire-player-info-added">
                                        <FiPlusCircle size={36} />
                                        <img className="my-team-page-roster-object-team-logo" src={
                                            getLogoFunction(claim.addedPlayer.team_id)} />
                                        <div className="my-team-page-roster-object-info-name"
                                            onClick={() => { if (!pauseButtons) {
                                                handlePlayerDisplay(claim.addedPlayer.player_id, claim.addedPlayer.pos)}}}>
                                            {playerNameAdd}</div>
                                        <div className="my-team-page-roster-object-info">{claim.addedPlayer.pos}</div>
                                    </div>
                                    {playerNameDrop !== null ? (
                                        <div className="my-team-page-waiver-wire-player-info-dropped">
                                            <FiMinusCircle size={36} />
                                            <img className="my-team-page-roster-object-team-logo" src={
                                                getLogoFunction(claim.droppedPlayer.team_id)} />
                                            <div className="my-team-page-roster-object-info-name"
                                                onClick={() => { if (!pauseButtons) {
                                                    handlePlayerDisplay(claim.droppedPlayer.player_id, claim.droppedPlayer.pos)}}}>
                                                {playerNameDrop}</div>
                                            <div className="my-team-page-roster-object-info">{claim.droppedPlayer.pos}</div>
                                        </div>
                                    ) : (
                                        <div className="my-team-page-waiver-wire-player-info-dropped">
                                            <div className="my-team-page-roster-object-info-name">None</div>
                                        </div>
                                    )}
                                </div>
                            );})}
                    </div>
                    {showConfirmationResponse && (<div className="my-team-page-confirmation-response-overlay"
                        onClick={() => setShowConfirmationResponse(false)}>
                        <div className="my-team-page-confirmation-response-content-false">
                            <div className="my-team-page-confirmation-response-message-container">
                                <div className="my-team-page-confirmation-response-message">
                                    {confirmationResponse.message}</div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
            ), document.getElementById("portal-root")
        )
    }
    
    return (
        <div className="my-team-page-main-container">
            <PageHeading />
            <div className="my-team-page-split-bar" />
            <PageSelectionBar userTeamId={user_team_id} leagueId={league_id}/>
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
                                <div className="my-team-page-team-details-description-divider" />
                                <div className="my-team-page-team-details-active-waivers"
                                    onClick={() => { if (!pauseButtons) {handleFetchWaivers()}}}>Active Waivers</div>
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
                        <RosterObjectList roster={teamRoster} />
                        {showError && (<div className="my-team-page-error-message-container">
                            <div className="my-team-page-error-message-box">
                                <FiAlertTriangle size={64} />{error}, Please try again later.</div>
                            </div>)}
                    </div>
                    {showPlayerDisplay && <NSICPlayerDisplay
                        handleClose={closePlayerDisplay} player_id={playerID}
                        playerPos={playerPos} actionButton={actionButton}/>}
                    {showMovePlayerPop && <MovePlayerPopUp player={movePlayer} pos={movePlayerPos} />}
                    {showWaivers && <WaiverWirePopUp waivers={waivers} />}
                </div>
            </div>
            <div className="my-team-page-footer-container" />
        </div>
    )
}

export default MyTeamPage;