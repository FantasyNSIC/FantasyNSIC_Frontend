import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAvailablePlayers } from "../../service/fantasyService.js";
import { getLogoFunction } from "../../images/getLogoFuncion.js";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./PlayersPage.less";

const PlayersPage = () => {

    // grab URL params
    const [searchParams] = useSearchParams();
    const league_id = searchParams.get("league_id");

    // state to hold the players
    const [resPlayers, setPlayers] = useState([]);

    // fetch the players when the component renders
    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await getAvailablePlayers(league_id);
            setPlayers(response);
        };
        fetchPlayers();
    }, []);

    const PlayerObject = ({player}) => {
        const name = `${player.first_name} ${player.last_name}`
        return (
            <div className="players-page-player-object">
                <img className="players-page-object-team-logo" src={getLogoFunction(player.team_id)} />
                <div className="players-page-player-info"
                style={{'--margin-left': `${15}%`}}>{name}</div>
                <div className="players-page-player-info"
                style={{'--margin-left': `${15}%`}}>{player.pos}</div>
                <div className="players-page-player-info"
                style={{'--margin-left': `${8}%`}}>{player.cls}</div>
                <div className="players-page-player-info"
                style={{'--margin-left': `${8}%`}}>{player.height}</div>
                <div className="players-page-player-info"
                style={{'--margin-left': `${8}%`}}>{player.weight}</div>
                {/* TODO: implement player season fantasy points */}
                <div className="players-page-player-info"
                style={{'--margin-left': `${8}%`}}>{0}</div>
            </div>
        )
    }

    const PlayerObjectList = ({players}) => {
        if (!players || players.length === 0) return (<div></div>);
        return (
            <div className="players-page-player-object-list">
                {players.players.map((player) => {
                    return <PlayerObject key={player.player_id} player={player} />
                })}
            </div>
        )
    };

    return (
        <div className="players-page-main-container">
            <PageHeading />
            <div className="players-page-split-bar" />
            <PageSelectionBar />
            <div className="players-page-background-container">
                <div className="players-page-content-container">
                    <div className="players-page-filter-container">
                        <div className="players-page-available-players-text">Available Players</div>
                        <div className="players-page-filter-selection">
                            <div className="players-page-filter-button">ALL</div>
                            <div className="players-page-filter-button">QB</div>
                            <div className="players-page-filter-button">RB</div>
                            <div className="players-page-filter-button">WR</div>
                            <div className="players-page-filter-button">TE</div>
                            <div className="players-page-filter-button">K</div>
                            <input className="players-page-search-bar" type="text" placeholder="Search" />
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
                        {/* TODO: Add composite 2024 fantsy points */}
                    </div>
                    <div className="players-page-player-object-container">
                        <PlayerObjectList players={resPlayers} />
                    </div>
                </div>
            </div>
            <div className="players-page-footer-container" />
        </div>
    )
}

export default PlayersPage;