import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAvailablePlayers } from "../../service/fantasyService.js";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./PlayersPage.less";

const PlayersPage = () => {

    // grab URL params
    const [searchParams] = useSearchParams();
    const league_id = searchParams.get("league_id");

    // state to hold the players
    const [players, setPlayers] = useState([]);

    // fetch the players when the component renders
    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await getAvailablePlayers(league_id);
            setPlayers(response.data);
        };
        fetchPlayers();
    }, []);

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
                </div>
            </div>
            <div className="players-page-footer-container" />
        </div>
    )
}

export default PlayersPage;