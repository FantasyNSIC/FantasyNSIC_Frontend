import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import EmptyProfile from '../../images/EmptyProfile.png'
import "./MyTeamPage.less";

const MyTeamPage = () => {

    // grab URL params
    const [searchParams] = useSearchParams();
    const league_id = searchParams.get("league_id");
    const user_team_id = searchParams.get("user_team_id");

    // States for keeping track of user-team's display information.
    const [teamProfilePicture, setTeamProfilePicture] = useState(EmptyProfile);
    const [teamName, setTeamName] = useState("--");
    const [teamLeague, setTeamLeague] = useState("--");
    const [teamUserName, setTeamUserName] = useState("--");
    const [teamWins, setTeamWins] = useState("--");
    const [teamLosses, setTeamLosses] = useState("--");
    
    return (
        <div className="my-team-page-main-container">
            <PageHeading />
            <div className="my-team-page-split-bar" />
            <PageSelectionBar />
            <div className="my-team-page-background-container">
                <div className="my-team-page-content-container">
                    <div className="my-team-page-team-info-container">
                        <div className="my-team-page-profile-picture-container">
                            <img className="my-team-page-profile-picture" src={teamProfilePicture} />
                        </div>
                        <div className="my-team-page-profile-picture-divider" />
                        <div className="my-team-page-team-details-container">
                            <div className="my-team-page-team-details-name">
                                <div className="my-team-page-team-details-name-text">{teamName}</div>
                            </div>
                            <div className="my-team-page-team-details-description">
                                <div className="my-team-page-team-details-description-league">{teamLeague}</div>
                                <div className="my-team-page-team-details-description-divider" />
                                <div className="my-team-page-team-details-description-userName">{teamUserName}</div>
                            </div>
                            <div className="my-team-page-team-details-record">
                                <div className="my-team-page-team-details-record-wins">Wins: {teamWins}</div>
                                <div className="my-team-page-team-details-record-losses">Losses: {teamLosses}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-team-page-footer-container" />
        </div>
    )
}

export default MyTeamPage;