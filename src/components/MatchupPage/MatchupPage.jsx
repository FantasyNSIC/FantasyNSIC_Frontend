import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { getMatchupInfo } from "../../service/fantasyService.js";
import { TeamRecord } from "../../service/classes/TeamRecord.js";
import { UserRoster } from "../../service/classes/UserRoster.js";
import PageHeading from "../PageHeading/PageHeading.jsx";
import PageSelectionBar from "../PageSelectionBar/PageSelectionBar.jsx";
import EmptyProfile from '../../images/EmptyProfile.png'
import "./MatchupPage.less";

const MatchupPage = () => {

    // Grab URL params
    const [searchParams] = useSearchParams();
    const user_team_id = searchParams.get("user_team_id");

    // State to hold matchup info
    const [current_week, setCurrentWeek] = useState("--");
    const [team_1_name, setTeam1Name] = useState("--");
    const [team_1_full_name, setTeam1FullName] = useState("--");
    const [team_1_record, setTeam1Record] = useState(TeamRecord.empty());
    const [team_1_points, setTeam1Points] = useState(0.0);
    const [team_1_roster, setTeam1Roster] = useState(new UserRoster());
    // TODO: Set this to the actual team profile picture
    const [team_1_picture, setTeam1Picture] = useState(EmptyProfile);
    const [team_2_name, setTeam2Name] = useState("--");
    const [team_2_full_name, setTeam2FullName] = useState("--");
    const [team_2_record, setTeam2Record] = useState(TeamRecord.empty());
    const [team_2_points, setTeam2Points] = useState(0.0);
    const [team_2_roster, setTeam2Roster] = useState(new UserRoster());
    const [team_2_picture, setTeam2Picture] = useState(EmptyProfile);

    // State for displaying error message
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    // Fetch the matchup info when the component renders
    useEffect(() => {
        const fetchMatchupInfo = async () => {
            try {
                const response = await getMatchupInfo(user_team_id);
                setCurrentWeek(response.current_week);
                setTeam1Name(response.team_1_name);
                setTeam1FullName(response.team_1_full_name);
                setTeam1Record(response.team_1_record);
                setTeam1Points(response.team_1_points);
                setTeam1Roster(response.team_1_roster);
                setTeam2Name(response.team_2_name);
                setTeam2FullName(response.team_2_full_name);
                setTeam2Record(response.team_2_record);
                setTeam2Points(response.team_2_points);
                setTeam2Roster(response.team_2_roster);
            } catch (exception) {
                setShowError(true);
                setError(exception.message); // Access the message property of the error
            }
        };
        fetchMatchupInfo();
    }, []);

    // function for formatting the week text
    function formatWeekText(week) {
        if (week === "--") return ("--");
        const textList = week.split("_");
        return `Week ${textList[1]}`;
    }

    return (
        <div className="matchup-page-main-container">
            <PageHeading />
            <div className="matchup-page-split-bar" />
            <PageSelectionBar />
            <div className="matchup-page-background-container">
                <div className="matchup-page-content-container">
                    <div className="matchup-page-current-week-container">
                        <div className="matchup-page-current-week-text">
                            {`${formatWeekText(current_week)} Matchup`}
                        </div>
                    </div>
                    <div className="matchup-page-matchup-main-container">
                        <div className="matchup-page-team-info-container">
                            <div className="matchup-page-team-profile-container">
                                <div className="matchup-page-team-profile-picture-container">
                                    <img src={team_1_picture} className="matchup-page-team-profile-picture" />
                                </div>
                                <div className="matchup-page-team-profile-picture-divider" />
                                <div className="matchup-page-name-record-container">
                                    <div className="matchup-page-team-name-container">
                                        <div className="matchup-page-team-name-text">{team_1_name}</div>
                                    </div>
                                    <div className="matchup-page-team-full-name-record-container">
                                        <div className="matchup-page-team-full-name-record-text">{team_1_full_name}</div>
                                        <div className="matchup-page-team-divider" />
                                        <div className="matchup-page-team-full-name-record-text">
                                            {`${team_1_record.wins}-${team_1_record.losses}`}
                                        </div>
                                    </div>
                                </div>
                                <div className="matchup-page-team-points-container">
                                    <div className="matchup-page-team-points-text">{team_1_points}</div>
                                </div>
                            </div>
                            <div className="matchup-page-team-divider" />
                            <div className="matchup-page-team-profile-container" >
                                <div className="matchup-page-team-points-container">
                                    <div className="matchup-page-team-points-text">{team_2_points}</div>
                                </div>
                                <div className="matchup-page-name-record-container">
                                    <div className="matchup-page-team-name-container-right">
                                        <div className="matchup-page-team-name-text-right">{team_2_name}</div>
                                    </div>
                                    <div className="matchup-page-team-full-name-record-container-right">
                                        <div className="matchup-page-team-full-name-record-text">{team_2_full_name}</div>
                                        <div className="matchup-page-team-divider" />
                                        <div className="matchup-page-team-full-name-record-text-right">
                                            {`${team_2_record.wins}-${team_2_record.losses}`}
                                        </div>
                                    </div>
                                </div>
                                <div className="matchup-page-team-profile-picture-divider" />
                                <div className="matchup-page-team-profile-picture-container">
                                    <img src={team_2_picture} className="matchup-page-team-profile-picture" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="matchup-page-footer-container" />
        </div>
    )
}

export default MatchupPage;