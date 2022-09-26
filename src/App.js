import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {
  Home, 
  Dashboard, 
  Interview
} from './pages/';
import { CreateInterviewPopup } from './components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path = "/" element={<Home/>}/>
          <Route path="/home" element={<Dashboard/>}/>
          <Route path="/interview/:id" element={<Interview/>}/>
          <Route path = "/popup" element = {<CreateInterviewPopup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
