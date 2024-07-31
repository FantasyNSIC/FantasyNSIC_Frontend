import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import './DraftBoard.less';

const DraftBoard = () => {

    // Grab URL params
    const [searchParams] = useSearchParams();
    const user_team_id = searchParams.get("user_team_id");
    const league_id = searchParams.get("league_id");

    return (
        <div className="draft-board-main-container">
            <PageHeading />
            <div className="draft-board-split-bar" />
            <PageSelectionBar userTeamId={user_team_id} leagueId={league_id}/>
            <div className="draft-board-background-container">
                <div className="draft-board-content-container">
                    DRAFT
                </div>
            </div>
            <div className="draft-board-footer-container" />
        </div>
    )
}

export default DraftBoard;
