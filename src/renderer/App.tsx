import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import './App.css';
import Start from './components/Start';
import WeekdayApply from './components/WeekdayApply';
import WeekendApply from './components/WeekendApply';
import CheckScore from './components/CheckScore';
import Information from './components/Information';
import FAQ from './components/FAQ';

export default function App() {
  const [PHPSESSID, setPHPSESSID] = useState('');
  const [username, setUsername] = useState('');
  const [memberId, setMemberId] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Start
                PHPSESSID={PHPSESSID}
                setPHPSESSID={setPHPSESSID}
                username={username}
                setUsername={setUsername}
                memberId={memberId}
                setMemberId={setMemberId}
              />
            }
          />
          <Route
            path="/weekdayapply"
            element={
              <WeekdayApply
                PHPSESSID={PHPSESSID}
                username={username}
                memberId={memberId}
              />
            }
          />
          <Route
            path="/weekendapply"
            element={
              <WeekendApply
                PHPSESSID={PHPSESSID}
                username={username}
                memberId={memberId}
              />
            }
          />
          <Route
            path="/checkscore"
            element={
              <CheckScore
                PHPSESSID={PHPSESSID}
                username={username}
                memberId={memberId}
              />
            }
          />
          <Route
            path="/information"
            element={
              <Information
                PHPSESSID={PHPSESSID}
                username={username}
                memberId={memberId}
              />
            }
          />
          <Route
            path="/FAQ"
            element={
              <FAQ
                PHPSESSID={PHPSESSID}
                username={username}
                memberId={memberId}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
