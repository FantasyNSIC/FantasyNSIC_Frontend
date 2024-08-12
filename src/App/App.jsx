import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.less';

import LoginPage from '../components/LoginPage/LoginPage.jsx';
import MyTeamPage from '../components/MyTeamPage/MyTeamPage.jsx';
import PlayersPage from '../components/PlayersPage/PlayersPage.jsx';
import MatchupPage from '../components/MatchupPage/MatchupPage.jsx';
import ScoreboardPage from '../components/ScoreboardPage/ScoreboardPage.jsx';
import LeaguePage from '../components/LeaguePage/LeaguePage.jsx';
import StandingsPage from '../components/StandingsPage/StandingsPage.jsx';
import DraftBoard from '../components/DraftBoard/DraftBoard.jsx';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/myteam" element={<MyTeamPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/matchup" element={<MatchupPage />} />
            <Route path="/scoreboard" element={<ScoreboardPage />} />
            <Route path="/league" element={<LeaguePage />} />
            <Route path="/standings" element={<StandingsPage />} />
            <Route path="/draft" element={<DraftBoard />} />
        </Routes>
      </Router>
    );
  }
}