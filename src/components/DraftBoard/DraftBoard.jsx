import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";
import { getDraftBoardInfo } from "../../service/fantasyService.js";
import { UserRoster } from "../../service/classes/UserRoster.js";
import { DraftOrder } from "../../service/classes/DraftOrder.js";
import { getLogoFunction } from "../../images/smallLogos/getLogoFuncion.js";
import PageHeading from "../PageHeading/PageHeading.jsx";
import EmptyProfile from '../../images/EmptyProfile.png';
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import NSICPlayerDisplay from "../NSICPlayerDisplay/NSICPlayerDisplay.jsx";
import './DraftBoard.less';

const DraftBoard = () => {

    // Grab URL params
    const [searchParams] = useSearchParams();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");

    // State to hold draft info
    const [draftOrder, setDraftOrder] = useState([]);
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [userRoster, setUserRoster] = useState(new UserRoster());
    const [draftTaken, setDraftTaken] = useState([]);

    // Stats for holding active filter
    const [activeFilter, setActiveFilter] = useState("ALL");

    // state for displaying player display.
    const [showPlayerDisplay, setShowPlayerDisplay] = useState(false);
    const [playerID, setPlayerID] = useState(0);
    const [playerPos, setPlayerPos] = useState("");

    // stats for holding active pick.
    const [activePick, setActivePick] = useState(new DraftOrder(0, 0, 0, ''));

    // state for handling reload/pausing
    const [reloadDraft, setReloadDraft] = useState(false);
    const [pauseButtons, setPauseButtons] = useState(false);

    // state for holding player display action.
    const [displayAction, setDisplayAction] = useState("none");

    // state for displaying error message
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // Fetch the draft info when the component renders
    useEffect(() => {
        const fetchDraftInfo = async () => {
            try {
                const response = await getDraftBoardInfo(user_team_id, league_id);
                if (response.draft_enable === false) {
                    setError("Your league draft is not enabled");
                    setShowError(true);
                    return;
                }
                const pick = response.draft_order.sort((a, b) => a.draft_pick - b.draft_pick);
                const draftOrder = pick.filter(p => p.player_id === null);
                const draftTaken = pick.filter(p => p.player_id !== null);
                setDraftOrder(draftOrder);
                setAvailablePlayers(response.available_players);
                setUserRoster(response.user_roster);
                setDraftTaken(draftTaken);
                setActivePick(draftOrder[0]);
            } catch (exception) {
                setShowError(true);
                setError(exception.message);
            }
        };
        fetchDraftInfo();
    }, []);

    // Function for handle available player filter change
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    }

    // Function for handling displaying pop up when player is clicked.
    function handlePlayerDisplay(player_id, player_pos, where_click) {
        console.log(activePick);
        if (where_click === "available" && activePick.user_team_id.toString() === user_team_id) {
            setDisplayAction("draft");
        }
        setPlayerID(player_id);
        setPlayerPos(player_pos);
        setShowPlayerDisplay(true);
    }

    // Handles closing the player display.
    function closePlayerDisplay() {
        setShowPlayerDisplay(false);
        setPlayerID(0);
        setPlayerPos("");
        setDisplayAction("none");
    }

    // Filtered available players
    const filteredPlayers = availablePlayers.filter(player => {
        if (activeFilter === "ALL") {
            return availablePlayers;
        } else {
            return player.pos === activeFilter;
        }
    });

    return (
        <div className="draft-board-main-container">
            <PageHeading />
            <div className="draft-board-split-bar" />
            <PageSelectionBar userTeamId={user_team_id} leagueId={league_id}/>
            <div className="draft-board-background-container">
                <div className="draft-board-content-container">
                    <div className="draft-board-order-container">
                        <div className="draft-board-order-heading-container">
                            <div className="draft-board-order-heading-text">Draft Order</div>
                            {activePick.user_team_id.toString() === user_team_id && (
                                <div className="draft-board-order-list-turn-indicator-bar">
                                    <div className="draft-board-order-list-turn-indicator-bar-text">
                                        It is your turn to pick! Select a player from the list below.
                                    </div>
                                </div>)}
                        </div>
                        <div className="draft-board-order-list">
                            {draftOrder.map((team, index) => (
                                <div key={index} className="draft-board-order-list-object">
                                    <div className={`draft-board-order-list-object-wrapper${team.user_team_id.toString() === user_team_id ? "-gray" : ""}`}>
                                        <div className="draft-board-order-list-object-pic-container">
                                            <img src={EmptyProfile} className="draft-board-order-list-object-pic" />
                                        </div>
                                        <div className="draft-board-order-list-object-divider" />
                                        <div className="draft-board-order-list-object-info-container">
                                            <div className="draft-board-order-list-object-text-container">
                                                <div className="draft-board-order-list-object-text">Pick: {team.draft_pick}</div>
                                            </div>
                                            <div className="draft-board-order-list-object-text-container">
                                                <div className="draft-board-order-list-object-text">Team: {team.team_name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="draft-board-body-content-conatiner">
                        <div className="draft-board-team-roster-container">
                            <div className="draft-board-general-heading-container">
                                <div className="draft-board-general-heading-text">Your Roster</div>
                            </div>
                            <div className="draft-board-team-roster-list">
                                {userRoster.QB.map((player, index) => {
                                    const player_name = player.first_name + " " + player.last_name;
                                    return (
                                        <div key={index} className="draft-board-team-roster-list-object">
                                            <div className="draft-board-team-roster-list-object-wrapper">
                                                <div className="draft-board-team-roster-list-object-text-bold">QB: </div>
                                                <div className="draft-board-team-roster-list-object-text-name" onClick={() => { if (!pauseButtons)
                                                    { handlePlayerDisplay(player.player_id, player.pos, "roster") }}}>{player_name}</div>
                                            </div>
                                        </div>);
                                    })}
                                {userRoster.RB.map((player, index) => {
                                    const player_name = player.first_name + " " + player.last_name;
                                    return (
                                        <div key={index} className="draft-board-team-roster-list-object">
                                            <div className="draft-board-team-roster-list-object-wrapper">
                                                <div className="draft-board-team-roster-list-object-text-bold">RB: </div>
                                                <div className="draft-board-team-roster-list-object-text-name" onClick={() => { if (!pauseButtons)
                                                    { handlePlayerDisplay(player.player_id, player.pos, "roster") }}}>{player_name}</div>
                                            </div>
                                        </div>);
                                    })}
                                {userRoster.WR.map((player, index) => {
                                    const player_name = player.first_name + " " + player.last_name;
                                    return (
                                        <div key={index} className="draft-board-team-roster-list-object">
                                            <div className="draft-board-team-roster-list-object-wrapper">
                                                <div className="draft-board-team-roster-list-object-text-bold">WR: </div>
                                                <div className="draft-board-team-roster-list-object-text-name" onClick={() => { if (!pauseButtons)
                                                    { handlePlayerDisplay(player.player_id, player.pos, "roster") }}}>{player_name}</div>
                                            </div>
                                        </div>);
                                    })}
                                {userRoster.TE.map((player, index) => {
                                    const player_name = player.first_name + " " + player.last_name;
                                    return (
                                        <div key={index} className="draft-board-team-roster-list-object">
                                            <div className="draft-board-team-roster-list-object-wrapper">
                                                <div className="draft-board-team-roster-list-object-text-bold">TE: </div>
                                                <div className="draft-board-team-roster-list-object-text-name" onClick={() => { if (!pauseButtons)
                                                    { handlePlayerDisplay(player.player_id, player.pos, "roster") }}}>{player_name}</div>
                                            </div>
                                        </div>);
                                    })}
                                {userRoster.K.map((player, index) => {
                                    const player_name = player.first_name + " " + player.last_name;
                                    return (
                                        <div key={index} className="draft-board-team-roster-list-object">
                                            <div className="draft-board-team-roster-list-object-wrapper">
                                                <div className="draft-board-team-roster-list-object-text-bold">K: </div>
                                                <div className="draft-board-team-roster-list-object-text-name" onClick={() => { if (!pauseButtons)
                                                    { handlePlayerDisplay(player.player_id, player.pos, "roster") }}}>{player_name}</div>
                                            </div>
                                        </div>);
                                    })}
                                {userRoster.BENCH.map((player, index) => {
                                    const player_name = player.first_name + " " + player.last_name;
                                    return (
                                        <div key={index} className="draft-board-team-roster-list-object">
                                            <div className="draft-board-team-roster-list-object-wrapper">
                                                <div className="draft-board-team-roster-list-object-text-bold">BENCH: </div>
                                                <div className="draft-board-team-roster-list-object-text-name" onClick={() => { if (!pauseButtons)
                                                    { handlePlayerDisplay(player.player_id, player.pos, "roster") }}}>{player_name}</div>
                                            </div>
                                        </div>);
                                    })}
                            </div>
                        </div>
                        <div className="draft-board-player-list-container">
                            <div className="draft-board-general-heading-container">
                                <div className="draft-board-general-heading-text">Available Players</div>
                            </div>
                            <div className="draft-board-player-list-filter-container">
                                <div className="draft-board-player-list-filter-button-container">
                                    <div className={`draft-board-player-list-filter-button${activeFilter === "ALL" ? "-active" : ""}`}
                                        onClick={() => handleFilterChange("ALL")}>ALL</div>
                                    <div className={`draft-board-player-list-filter-button${activeFilter === "QB" ? "-active" : ""}`}
                                        onClick={() => handleFilterChange("QB")}>QB</div>
                                    <div className={`draft-board-player-list-filter-button${activeFilter === "RB" ? "-active" : ""}`}
                                        onClick={() => handleFilterChange("RB")}>RB</div>
                                    <div className={`draft-board-player-list-filter-button${activeFilter === "WR" ? "-active" : ""}`}
                                        onClick={() => handleFilterChange("WR")}>WR</div>
                                    <div className={`draft-board-player-list-filter-button${activeFilter === "TE" ? "-active" : ""}`}
                                        onClick={() => handleFilterChange("TE")}>TE</div>
                                    <div className={`draft-board-player-list-filter-button${activeFilter === "K" ? "-active" : ""}`}
                                        onClick={() => handleFilterChange("K")}>K</div>
                                </div>
                            </div>
                            <div className="draft-board-available-player-list">
                                <div className="draft-board-available-player-list-wrapper">
                                    {filteredPlayers.map((player, index) => {
                                        const player_name = player.first_name + " " + player.last_name;
                                        return (
                                            <div key={index} className="draft-board-available-player-list-object" onClick={() => 
                                                { if (!pauseButtons) { handlePlayerDisplay(player.player_id, player.pos, "available") }}}>
                                                <div className="draft-board-available-player-list-object-wrapper">
                                                    <img src={getLogoFunction(player.team_id)} className="draft-board-available-player-list-object-pic" />
                                                    <div className="draft-board-available-player-list-object-text">{player_name}</div>
                                                    <div className="draft-board-available-player-list-object-text">{player.pos}</div>
                                                    <div className="draft-board-available-player-list-object-text">{player.cls}</div>
                                                    <div className="draft-board-available-player-list-object-text">{player.height}</div>
                                                    <div className="draft-board-available-player-list-object-text">{player.weight}</div>
                                                </div>
                                            </div>);
                                    })}
                                    {showError && (<div className="draft-board-error-message-container">
                                        <div className="draft-board-error-message-box">
                                        <FiAlertTriangle size={64} />{error}, Please try again later.</div>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                        <div className="draft-board-activity-container">
                            <div className="draft-board-general-heading-container">
                                <div className="draft-board-general-heading-text">Draft Activity</div>
                            </div>
                            <div className="draft-board-activity-list">
                                {draftTaken.map((pick, index) => {
                                    const player_name = pick.player_id.first_name + " " + pick.player_id.last_name;
                                    return (
                                        <div key={index} className="draft-board-activity-list-object">
                                            <div className="draft-board-activity-list-object-wrapper">
                                                <div className="draft-board-activity-list-object-text-container">
                                                    <div className="draft-board-activity-list-object-text">
                                                        <span className="draft-board-bold">Pick:</span> {pick.draft_pick}</div>
                                                </div>
                                                <div className="draft-board-activity-list-object-text-container">
                                                    <div className="draft-board-activity-list-object-text">
                                                        <span className="draft-board-bold">Team:</span> {pick.team_name}</div>
                                                </div>
                                                <div className="draft-board-activity-list-object-text-container">
                                                    <div className="draft-board-activity-list-object-text">
                                                        <span className="draft-board-bold">Player: </span>
                                                        <span className="draft-board-name-highlight" onClick={() => { if (!pauseButtons)
                                                            { handlePlayerDisplay(pick.player_id.player_id, pick.player_id.pos, "activity") }}}>{player_name}</span></div>
                                                </div>
                                                <div className="draft-board-activity-list-object-text-container">
                                                    <div className="draft-board-activity-list-object-text">
                                                        <span className="draft-board-bold">Position:</span> {pick.player_id.pos}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );})}
                            </div>
                        </div>
                    </div>
                    {showPlayerDisplay && (<NSICPlayerDisplay handleClose={closePlayerDisplay} player_id={playerID}
                        playerPos={playerPos} actionButton={displayAction} draft_pick={activePick.draft_pick}/>)}
                </div>
            </div>
            <div className="draft-board-footer-container" />
        </div>
    )
}

export default DraftBoard;
