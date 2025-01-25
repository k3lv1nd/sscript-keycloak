
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage';
import Profile from './components/profile/Profile';
import Private from './components/Private';
import React, { Component } from 'react';
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
      <div>
          <React.Fragment>
              <Routes>
                  <Route path="/" element={<Homepage/>}/>
                  <Route
                      exact
                      path="/profile"
                      element={<Private component={Profile}/>}
                  />
                  <Route
                      exact
                      path="/dashboard"
                      element={<Private component={Dashboard}/>}
                  />
              </Routes>
            </React.Fragment>
      </div>
  );
}


export default App;
