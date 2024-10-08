import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAvailablePlayers } from "../../service/fantasyService.js";
import { verify_user, verify_user_team_creds } from "../../service/authService.js";
import { getLogoFunction } from "../../images/smallLogos/getLogoFuncion.js";
import { FiAlertTriangle } from "react-icons/fi";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import NSICPlayerDisplay from "../NSICPlayerDisplay/NSICPlayerDisplay.jsx";
import "./PlayersPage.less";

const PlayersPage = () => {

    // grab URL params
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");

    // state to hold the players
    const [resPlayers, setPlayers] = useState([]);

    // state for triggering reload of players
    const [reloadPlayers, setReloadPlayers] = useState(false);
    const [pauseButtons, setPauseButtons] = useState(false);

    // state to hold active filter
    const [activeFilter, setActiveFilter] = useState("ALL");

    // state to hold search bar input
    const [searchInput, setSearchInput] = useState("");

    // state for displaying player display.
    const [showPlayerDisplay, setShowPlayerDisplay] = useState(false);
    const [playerID, setPlayerID] = useState(0);
    const [playerPos, setPlayerPos] = useState("");

    // state for displaying error message
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // state for current day of week for rendering buttons
    const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay());

    // fetch the players when the component renders
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const user = await verify_user();
                if (!user.data.status || !verify_user_team_creds(user.data.user_teams, user_team_id, league_id)) {
                    navigate("/login");
                    return;
                }
                const response = await getAvailablePlayers(league_id);
                setPlayers(response);
            } catch (exception) {
                setShowError(true);
                setError(exception.message); // Access the message property of the error
            } finally {
                setPauseButtons(false);
            }
        };
        fetchPlayers();
    }, [reloadPlayers]);

    // keeps track of the day of the week
    useEffect(() => {
        const updateDay = () => {
            setDayOfWeek(new Date().getDay());
        };
        const interval = setInterval(updateDay, 60000);
        return () => clearInterval(interval);
    }, []);

    // handle filter change
    function handleFilterChange(filter) {
        setActiveFilter(filter);
    }

    // Function for handling displaying pop up when player is clicked.
    function handlePlayerDisplay(player_id, player_pos) {
        setPlayerID(player_id);
        setPlayerPos(player_pos);
        setShowPlayerDisplay(true);
    }

    // Handles closing the player display.
    function closePlayerDisplay(reload = false) {
        setShowPlayerDisplay(false);
        setPlayerID(0);
        setPlayerPos("");
        if (reload) {
            setPauseButtons(true);
            setReloadPlayers(!reloadPlayers);
        }
    }

    const PlayerObject = ({player}) => {
        const name = `${player.first_name} ${player.last_name}`
        return (
            <div className="players-page-player-object" onClick={() => 
                    { if (!pauseButtons) { handlePlayerDisplay(player.player_id, player.pos) }}}>
                <img className="players-page-object-team-logo" src={getLogoFunction(player.team_id)} />
                <div className="players-page-player-info">{name}</div>
                <div className="players-page-player-info">{player.pos}</div>
                <div className="players-page-player-info">{player.cls}</div>
                <div className="players-page-player-info">{player.height}</div>
                <div className="players-page-player-info">{player.weight}</div>
                <div className="players-page-player-info">{player.total_points}</div>
            </div>
        )
    }

    const PlayerObjectList = ({players, filter}) => {
        if (!players || players.length === 0) return (<div></div>);
        if (filter !== "ALL") {
            players = players.players.filter((player) => player.pos === filter);}
        else {players = players.players;}

        // filter by search input name
        const nameFilteredPlayers = players.filter((player) => {
            const name = `${player.first_name} ${player.last_name}`;
            return name.toLowerCase().includes(searchInput.toLowerCase());
        });
        return (
            <div className="players-page-player-object-list">
                {nameFilteredPlayers.map((player) => {
                    return <PlayerObject key={player.player_id} player={player} />
                })}
            </div>
        )
    };

    return (
        <div className="players-page-main-container">
            <PageHeading />
            <div className="players-page-split-bar" />
            <PageSelectionBar userTeamId={user_team_id} leagueId={league_id}/>
            <div className="players-page-background-container">
                <div className="players-page-content-container">
                    <div className="players-page-filter-container">
                        <div className="players-page-available-players-text">Available Players</div>
                        <div className="players-page-filter-selection">
                            <div className={`players-page-filter-button${activeFilter === "ALL" ? "-active" : ""}`}
                                onClick={() => handleFilterChange("ALL")}>ALL</div>
                            <div className={`players-page-filter-button${activeFilter === "QB" ? "-active" : ""}`}
                                onClick={() => handleFilterChange("QB")}>QB</div>
                            <div className={`players-page-filter-button${activeFilter === "RB" ? "-active" : ""}`}
                                onClick={() => handleFilterChange("RB")}>RB</div>
                            <div className={`players-page-filter-button${activeFilter === "WR" ? "-active" : ""}`}
                                onClick={() => handleFilterChange("WR")}>WR</div>
                            <div className={`players-page-filter-button${activeFilter === "TE" ? "-active" : ""}`}
                                onClick={() => handleFilterChange("TE")}>TE</div>
                            <div className={`players-page-filter-button${activeFilter === "K" ? "-active" : ""}`}
                                onClick={() => handleFilterChange("K")}>K</div>
                            <input
                                className="players-page-search-bar"
                                type="text"
                                placeholder="Search"
                                onChange={event => setSearchInput(event.target.value)} />
                        </div>
                    </div>
                    <div className="players-page-player-info-headers">
                        <div className="players-page-player-info-header"
                        style={{'--margin-left': `${15}%`}}>Player</div>
                        <div className="players-page-player-info-header"
                        style={{'--margin-left': `${15}%`}}>Position</div>
                        <div className="players-page-player-info-header"
                        style={{'--margin-left': `${8}%`}}>Class</div>
                        <div className="players-page-player-info-header"
                        style={{'--margin-left': `${8}%`}}>Height</div>
                        <div className="players-page-player-info-header"
                        style={{'--margin-left': `${8}%`}}>Weight</div>
                        <div className="players-page-player-info-header"
                        style={{'--margin-left': `${8}%`}}>Points</div>
                    </div>
                    <div className="players-page-player-object-container">
                        <PlayerObjectList players={resPlayers} filter={activeFilter} />
                        {showError && (<div className="players-page-error-message-container">
                            <div className="players-page-error-message-box">
                                <FiAlertTriangle size={64} />{error}, Please try again later.</div>
                            </div>)}
                    </div>
                    {showPlayerDisplay && (dayOfWeek === 4 || dayOfWeek === 5) && (<NSICPlayerDisplay
                        handleClose={closePlayerDisplay} player_id={playerID}
                        playerPos={playerPos} actionButton={"add"}/>)}
                    {showPlayerDisplay && (dayOfWeek === 1 || dayOfWeek === 2) && (<NSICPlayerDisplay
                        handleClose={closePlayerDisplay} player_id={playerID}
                        playerPos={playerPos} actionButton={"waiver"}/>)}
                    {showPlayerDisplay && (dayOfWeek === 0 || dayOfWeek === 3 || dayOfWeek === 6) &&
                        (<NSICPlayerDisplay handleClose={closePlayerDisplay} player_id={playerID}
                        playerPos={playerPos} actionButton={"none"}/>)}
                </div>
            </div>
            <div className="players-page-footer-container" />
        </div>
    )
}

export default PlayersPage;