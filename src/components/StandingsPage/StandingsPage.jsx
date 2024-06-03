import React from "react";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./StandingsPage.less";

const StandingsPage = () => {
    return (
        <div className="standings-page-main-container">
            <PageHeading />
            <div className="standings-page-split-bar" />
            <PageSelectionBar />
            <div className="standings-page-background-container">
                <div className="standings-page-content-container">Standings

                </div>
            </div>
            <div className="standings-page-footer-container" />
        </div>
    )
}

export default StandingsPage;