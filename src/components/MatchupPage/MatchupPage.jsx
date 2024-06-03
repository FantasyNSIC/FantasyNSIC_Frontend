import React from "react";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./MatchupPage.less";

const MatchupPage = () => {
    return (
        <div className="matchup-page-main-container">
            <PageHeading />
            <div className="matchup-page-split-bar" />
            <PageSelectionBar />
            <div className="matchup-page-background-container">
                <div className="matchup-page-content-container">Matchup

                </div>
            </div>
            <div className="matchup-page-footer-container" />
        </div>
    )
}

export default MatchupPage;