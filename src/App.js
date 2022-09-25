import './App.css';
import React from 'react';
import Home from './pages/AdminHome';
import CandidateHome from './pages/CandidateHome';
import HomePage from './pages/HomePage';
import InterviewDetails from './pages/InterviewDetails';
import CreateInterviewPopup from './components/CreateInterviewPopup';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <CandidateHome /> */}
      {/* <HomePage /> */}
      {/* <InterviewDetails /> */}
      <CreateInterviewPopup/>
    </div>
  );
}

export default App;
