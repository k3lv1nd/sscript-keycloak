import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import Footer from "./Footer";
const Header = () => {
  const { keycloak } = useKeycloak();

  const userInfo = keycloak.tokenParsed;

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
              <a className="navbar-brand" href="#">Scratch & Script</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                      data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                      aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                  <div className="d-flex align-items-right ms-auto nav-item">
                     {keycloak.authenticated && (
                         <>
                             <span className="text-white me-3">Welcome {userInfo.preferred_username}</span>
                         </>
                     )}
                  </div>
                  <ul className="navbar-nav">
                      {keycloak.authenticated ? (
                          <>
                              <li className="nav-item">
                                  <Link to="/profile" className="nav-link" style={{color: '#ffffff'}}>My Profile</Link>
                              </li>
                              <li className="nav-item">
                                  <Link to="/dashboard" className="nav-link" style={{color: '#ffffff'}}>Dashboard</Link>
                              </li>

                              <li className="nav-item">
                                  <button className="btn btn-outline-light me-2"
                                          onClick={() => keycloak.logout({redirectUri: window.location.origin})}>Logout
                                  </button>
                              </li>
                          </>
                      ) : (
                          <>
                              <button className="btn btn-outline-light me-2" onClick={() => keycloak.login()}>Login
                              </button>
                          </>
                      )
                      }

                  </ul>
              </div>
          </div>
      </nav>

  );
};

export default Header;