import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMyTeamInfo } from "../../service/fantasyService.js";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import EmptyProfile from '../../images/EmptyProfile.png'
import "./MyTeamPage.less";

const MyTeamPage = () => {

    // grab URL params
    const [searchParams] = useSearchParams();
    const user_team_id = searchParams.get("user_team_id");

    // States for keeping track of user-team's display information.
    // TODO: Add functionality for using custom profile pictures.
    const [teamProfilePicture, setTeamProfilePicture] = useState(EmptyProfile);
    const [teamName, setTeamName] = useState("--");
    const [teamLeague, setTeamLeague] = useState("--");
    const [teamFullName, setTeamFullName] = useState("--");
    const [teamWins, setTeamWins] = useState("--");
    const [teamLosses, setTeamLosses] = useState("--");

    // Fetch the user-team's information and roster when the component renders.
    useEffect(() => {
        const fetchMyTeamInfo = async () => {
            try {
                const response = await getMyTeamInfo(user_team_id);
                // TODO: Set the team profile picture.
                console.log(response);
                setTeamName(response.teamName);
                setTeamLeague(response.leagueName);
                setTeamFullName(response.fullName);
                setTeamWins(response.wins);
                setTeamLosses(response.losses);
            } catch (exception) {
                console.log(exception);
            }
        };
        fetchMyTeamInfo();
    }, []);
    
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
                                <div className="my-team-page-team-details-description-userName">{teamFullName}</div>
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