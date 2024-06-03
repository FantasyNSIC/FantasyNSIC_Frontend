import React from "react";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./LeaguePage.less";

const LeaguePage = () => {
    return (
        <div className="league-page-main-container">
            <PageHeading />
            <div className="league-page-split-bar" />
            <PageSelectionBar />
            <div className="league-page-background-container">
                <div className="league-page-content-container">League

                </div>
            </div>
            <div className="league-page-footer-container" />
        </div>
    )
}

export default LeaguePage;