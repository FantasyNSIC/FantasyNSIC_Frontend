import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { getMatchupInfo, getNSICPlayerStatsWeek } from "../../service/fantasyService.js";
import { verify_user, verify_user_team_creds } from "../../service/authService.js";
import { getLogoFunction } from "../../images/smallLogos/getLogoFuncion.js";
import { TeamRecord } from "../../service/classes/TeamRecord.js";
import { UserRoster } from "../../service/classes/UserRoster.js";
import { PlayerStatsWeek } from "../../service/classes/PlayerStatsWeek.js";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import NSICPlayerDisplay from "../NSICPlayerDisplay/NSICPlayerDisplay.jsx";
import EmptyProfile from '../../images/EmptyProfile.png'
import "./MatchupPage.less";

const MatchupPage = () => {

    // Grab URL params
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");

    // State to hold matchup info
    const [current_week, setCurrentWeek] = useState("--");
    const [team_1_name, setTeam1Name] = useState("--");
    const [team_1_full_name, setTeam1FullName] = useState("--");
    const [team_1_record, setTeam1Record] = useState(TeamRecord.empty());
    const [team_1_points, setTeam1Points] = useState(0.0);
    const [team_1_roster, setTeam1Roster] = useState(new UserRoster());
    // TODO: Set this to the actual team profile picture
    const [team_1_picture, setTeam1Picture] = useState(EmptyProfile);
    const [team_2_name, setTeam2Name] = useState("--");
    const [team_2_full_name, setTeam2FullName] = useState("--");
    const [team_2_record, setTeam2Record] = useState(TeamRecord.empty());
    const [team_2_points, setTeam2Points] = useState(0.0);
    const [team_2_roster, setTeam2Roster] = useState(new UserRoster());
    const [team_2_picture, setTeam2Picture] = useState(EmptyProfile);

    // state for displaying player display.
    const [showPlayerDisplay, setShowPlayerDisplay] = useState(false);
    const [playerID, setPlayerID] = useState(0);
    const [playerPos, setPlayerPos] = useState("");

    // state for displaying player stat sheet.
    const [showPlayerStatSheet, setShowPlayerStatSheet] = useState(false);
    const [playerStatSheetName, setPlayerStatSheetName] = useState("");
    const [playerStatSheet, setPlayerStatSheet] = useState(PlayerStatsWeek.empty());
    const [playerStatSheetError, setPlayerStatSheetError] = useState(null);

    // State for displaying error message
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // Fetch the matchup info when the component renders
    useEffect(() => {
        const fetchMatchupInfo = async () => {
            try {
                const user = await verify_user();
                if (!user.data.status || !verify_user_team_creds(user.data.user_teams, user_team_id, league_id)) {
                    navigate("/login");
                    return;
                }
                const response = await getMatchupInfo(user_team_id);
                setCurrentWeek(response.current_week);
                setTeam1Name(response.team_1_name);
                setTeam1FullName(response.team_1_full_name);
                setTeam1Record(response.team_1_record);
                setTeam1Points(response.team_1_points);
                setTeam1Roster(response.team_1_roster);
                setTeam2Name(response.team_2_name);
                setTeam2FullName(response.team_2_full_name);
                setTeam2Record(response.team_2_record);
                setTeam2Points(response.team_2_points);
                setTeam2Roster(response.team_2_roster);
            } catch (exception) {
                setShowError(true);
                setError(exception.message); // Access the message property of the error
            }
        };
        fetchMatchupInfo();
    }, []);

    // function for formatting the week text
    function formatWeekText(week) {
        if (week === "--") return ("--");
        const textList = week.split("_");
        return `Week ${textList[1]}`;
    }

    // Handles closing the player display.
    function closePlayerDisplay() {
        setShowPlayerDisplay(false);
        setPlayerID(0);
        setPlayerPos("");
    }

    // Function for handling displaying pop up when player is clicked.
    function handlePlayerDisplay(player_id, player_pos) {
        setPlayerID(player_id);
        setPlayerPos(player_pos);
        setShowPlayerDisplay(true);
    }

    // Function for handling setting and displaying the player stat sheet.
    async function handlePlayerStatSheet(player_id, player_name) {
        const week = parseInt(current_week.split("_")[1], 10);
        try {
            const response = await getNSICPlayerStatsWeek(player_id, week);
            setPlayerStatSheet(response);
            setPlayerStatSheetName(player_name);
        } catch (exception) {
            setPlayerStatSheetError(exception.message);
        } finally {
            setShowPlayerStatSheet(true);
        }
    }

    // Function for handling the closing of the player stat sheet.
    function handleClosePlayerStatSheet() {
        setPlayerStatSheet(PlayerStatsWeek.empty());
        setPlayerStatSheetName("");
        setPlayerStatSheetError(null);
        setShowPlayerStatSheet(false);
    }


    // Component for displaying the rostered players of any given team.
    const MatchupRosterObject = ({player, pos, isRight = false}) => {
        if(!player && !pos) return(<div></div>);
        if(!player || player.player_id === 0) return(<div
            className={`matchup-page-roster-object-empty-${isRight ? 'right' : ''}`}>
            <div className="matchup-page-roster-object-pos-box">{pos}</div>
        </div>);
        const name = `${player.first_name} ${player.last_name}`;
        return (
            <div className={`matchup-page-roster-object-${isRight ? 'right' : ''}`}>
                <div className="matchup-page-roster-object-pos-box">{pos}</div>
                <div className="matchup-page-roster-object-team-logo-container">
                    <img className="matchup-page-roster-object-team-logo" src={getLogoFunction(player.team_id)} />
                </div>
                <div className="matchup-page-roster-object-name-container">
                    <div className="matchup-page-roster-object-info-name"
                        onClick={() => handlePlayerDisplay(player.player_id, player.pos)}>{name}</div>
                </div>
                <div className="matchup-pahe-roster-object-pos-container">
                    <div className="matchup-page-roster-object-info">{player.pos}</div>
                </div>
                <div className="matchup-page-roster-object-points-container">
                    <div className="matchup-page-roster-object-info-name"
                        onClick={() => handlePlayerStatSheet(player.player_id, name)}>{player.total_points}</div>
                </div>
            </div>
        );
    }

    // Component for displaying the roster list of the user-team. 
    // Roster is UserRoster object.
    const MatchupRosterObjectList = ({roster_team_1, roster_team_2}) => {
        if (!roster_team_1 || !roster_team_2) return(<div></div>);
        return (
            <div className="matchup-page-roster-object-list">
                <div className="matchup-page-roster-object-list-roster">
                    {roster_team_1.QB.map((object, index) => <MatchupRosterObject 
                    key={index} player={object} pos={"QB"} />)}
                    {roster_team_1.RB.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"RB"} />)}
                    {roster_team_1.WR.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"WR"} />)}
                    {roster_team_1.TE.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"TE"} />)}
                    {roster_team_1.K.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"K"} />)}
                    <div className="matchup-page-roster-object-divider" />
                    {roster_team_1.BENCH.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"BENCH"} />)}
                    {/* TODO: Add overflow active roster spot? */}
                </div>
                <div className="matchup-page-roster-object-list-roster">
                    {roster_team_2.QB.map((object, index) => <MatchupRosterObject 
                    key={index} player={object} pos={"QB"} isRight={true} />)}
                    {roster_team_2.RB.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"RB"} isRight={true} />)}
                    {roster_team_2.WR.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"WR"} isRight={true} />)}
                    {roster_team_2.TE.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"TE"} isRight={true} />)}
                    {roster_team_2.K.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"K"} isRight={true} />)}
                    <div className="matchup-page-roster-object-divider" />
                    {roster_team_2.BENCH.map((object, index) => <MatchupRosterObject
                    key={index} player={object} pos={"BENCH"} isRight={true} />)}
                </div>
            </div>
        )
    }

    // Component for displaying individial player point stat sheet calculations.
    const PlayerStatObject = ({player_stats, player_name}) => {
        if (playerStatSheetError !== null) return (<div className="matchup-page-player-stat-object-overlay"
            onClick={() => handleClosePlayerStatSheet()}>
            <div className="matchup-page-player-stat-object-content-error">{playerStatSheetError}</div>
        </div>);
        if (player_stats.player_id === 0 || player_name === "") return (<div></div>);
        const filteredText = player_stats.statsTextFilter();

        // UseEffect for disabling the background scrolling.
        useEffect(() => {
            if (player_stats.player_id !== 0) { document.body.classList.add('no-scroll')}
            else { document.body.classList.remove('no-scroll') }
            return () => { document.body.classList.remove('no-scroll') }
        }, [player_stats]);

        return ReactDOM.createPortal(
            (
            <div className="matchup-page-player-stat-object-overlay">
                <div className="matchup-page-player-stat-object-content">
                    <div className="matchup-page-player-stat-object-header">
                        <div className="matchup-page-player-stat-object-header-text">
                            {formatWeekText(current_week)} Stats for {player_name}</div>
                        <div className="matchup-page-player-stat-object-header-table-top">
                            <div className="matchup-page-player-stat-object-header-table-top-text">Stat</div>
                            <div className="matchup-page-player-stat-object-header-table-top-text">Points Per</div>
                            <div className="matchup-page-player-stat-object-header-table-top-text">#</div>
                            <div className="matchup-page-player-stat-object-header-table-top-text">Total</div>
                        </div>
                    </div>
                    <div className="matchup-page-player-stat-object-body">
                        {filteredText.length === 0 ? (
                            <div className="matchup-page-player-stat-object-body-no-stats-message">No scoring stats available</div>
                        ) : (
                            filteredText.map((stat, index) => (
                                <div key={index} className="matchup-page-player-stat-object-body-row">
                                    {stat.split(" ").map((text, subIndex) => (
                                        <div key={subIndex} className="matchup-page-player-stat-object-body-row-text">{text}</div>
                                    ))}
                                </div>
                            ))
                        )}
                    </div>
                    <div className="matchup-page-player-stat-object-footer">
                        <div className="matchup-page-player-stat-object-footer-button"
                            onClick={() => handleClosePlayerStatSheet()}>Close</div>
                        <div className="matchup-page-player-stat-object-footer-text">TOTAL: {player_stats.week_points}</div>
                    </div>
                </div>
            </div>
            ), document.getElementById("portal-root")
        )
    }

    return (
        <div className="matchup-page-main-container">
            <PageHeading />
            <div className="matchup-page-split-bar" />
            <PageSelectionBar userTeamId={user_team_id} leagueId={league_id}/>
            <div className="matchup-page-background-container">
                <div className="matchup-page-content-container">
                    <div className="matchup-page-current-week-container">
                        <div className="matchup-page-current-week-text">
                            {`${formatWeekText(current_week)} Matchup`}
                        </div>
                    </div>
                    <div className="matchup-page-team-info-container">
                        <div className="matchup-page-team-profile-container">
                            <div className="matchup-page-team-profile-picture-container">
                                <img src={team_1_picture} className="matchup-page-team-profile-picture" />
                            </div>
                            <div className="matchup-page-team-profile-picture-divider" />
                            <div className="matchup-page-name-record-container">
                                <div className="matchup-page-team-name-container">
                                    <div className="matchup-page-team-name-text">{team_1_name}</div>
                                </div>
                                <div className="matchup-page-team-full-name-record-container">
                                    <div className="matchup-page-team-full-name-record-text">{team_1_full_name}</div>
                                    <div className="matchup-page-team-divider" />
                                    <div className="matchup-page-team-full-name-record-text">
                                        {`${team_1_record.wins}-${team_1_record.losses}`}
                                    </div>
                                </div>
                            </div>
                            <div className="matchup-page-team-points-container">
                                <div className="matchup-page-team-points-text">{team_1_points}</div>
                            </div>
                        </div>
                        <div className="matchup-page-team-divider" />
                        <div className="matchup-page-team-profile-container" >
                            <div className="matchup-page-team-points-container">
                                <div className="matchup-page-team-points-text">{team_2_points}</div>
                            </div>
                            <div className="matchup-page-name-record-container">
                                <div className="matchup-page-team-name-container-right">
                                    <div className="matchup-page-team-name-text-right">{team_2_name}</div>
                                </div>
                                <div className="matchup-page-team-full-name-record-container-right">
                                    <div className="matchup-page-team-full-name-record-text">{team_2_full_name}</div>
                                    <div className="matchup-page-team-divider" />
                                    <div className="matchup-page-team-full-name-record-text-right">
                                        {`${team_2_record.wins}-${team_2_record.losses}`}
                                    </div>
                                </div>
                            </div>
                            <div className="matchup-page-team-profile-picture-divider" />
                            <div className="matchup-page-team-profile-picture-container">
                                <img src={team_2_picture} className="matchup-page-team-profile-picture" />
                            </div>
                        </div>
                    </div>
                    <div className="matchup-page-rosters-container">
                        <MatchupRosterObjectList roster_team_1={team_1_roster} roster_team_2={team_2_roster} />
                        {showError && (<div className="matchup-page-error-message-container">
                            <div className="matchup-page-error-message-box">
                                <FiAlertTriangle size={64} />{error}, Please try again later.</div>
                            </div>)}
                    </div>
                    {showPlayerDisplay && <NSICPlayerDisplay
                        handleClose={closePlayerDisplay} player_id={playerID}
                        playerPos={playerPos} actionButton={"none"}/>}
                    {showPlayerStatSheet && <PlayerStatObject
                        player_stats={playerStatSheet} player_name={playerStatSheetName} />}
                </div>
            </div>
            <div className="matchup-page-footer-container" />
        </div>
    )
}

export default MatchupPage;