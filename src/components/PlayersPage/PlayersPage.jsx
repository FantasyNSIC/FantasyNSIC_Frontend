import React from "react";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./PlayersPage.less";

const PlayersPage = () => {
    return (
        <div className="players-page-main-container">
            <PageHeading />
            <div className="players-page-split-bar" />
            <PageSelectionBar />
            <div className="players-page-background-container">
                <div className="players-page-content-container">Players

                </div>
            </div>
            <div className="players-page-footer-container" />
        </div>
    )
}

export default PlayersPage;