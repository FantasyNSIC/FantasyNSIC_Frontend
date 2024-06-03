import React from "react";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./ScoreboardPage.less";

const ScoreboardPage = () => {
    return (
        <div className="scoreboard-page-main-container">
            <PageHeading />
            <div className="scoreboard-page-split-bar" />
            <PageSelectionBar />
            <div className="scoreboard-page-background-container">
                <div className="scoreboard-page-content-container">Scoreboard

                </div>
            </div>
            <div className="scoreboard-page-footer-container" />
        </div>
    )
}

export default ScoreboardPage;