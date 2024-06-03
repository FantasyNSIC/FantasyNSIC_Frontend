import React from "react";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import "./MyTeamPage.less";

const MyTeamPage = () => {
    return (
        <div className="my-team-page-main-container">
            <PageHeading />
            <div className="my-team-page-split-bar" />
            <PageSelectionBar />
            <div className="my-team-page-background-container">
                <div className="my-team-page-content-container">My Team

                </div>
            </div>
            <div className="my-team-page-footer-container" />
        </div>
    )
}

export default MyTeamPage;