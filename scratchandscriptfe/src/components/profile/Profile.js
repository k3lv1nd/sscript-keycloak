import React, {Fragment, useEffect, useState} from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import axios from "axios";
import Loading from "../Loading";

const Profile = () => {
  const { keycloak, initialized } = useKeycloak();
  const userInfo = keycloak.tokenParsed;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
      if (keycloak.token) {
          const token = keycloak.token
          const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
          };
        axios.get('http://localhost:8000/api/auth/user', config)
        .then((res) => {
            console.log(res.data)
            setUser(res.data)
        })
        .catch (err => {
             setError("Token is missing.");
        });
      } else {
            setError("Token is missing.");
      }

    }, [initialized]);
        if(!user) {
          return <Loading message="Fetching user data..." />;
      }
  return (
      <Fragment>
          <div className="d-flex flex-column min-vh-100 min-vh-100">
               <Header/>
              <div className="hero text-white text-center d-flex align-items-center justify-content-center flex-grow-1">
                  <div className="col-md-8">
                      <div className="card shadow-lg border-0">
                          <div className="card-body">
                              <div className="text-center">
                                  <img
                                      src={`https://ui-avatars.com/api/?name=${user.username}&background=random&size=128`}
                                      alt="Profile"
                                      className="rounded-circle mb-4"
                                      style={{width: '128px', height: '128px'}}
                                  />
                                  <h3>{user.full_name || user.username}</h3>
                                  <p className="text-muted">{user.email}</p>
                              </div>
                              <hr/>
                              <div>
                                  <p>
                                      Welcome to your profile! This is where you can see details about
                                      your account and personalize your experience.
                                  </p>
                                  <ul className="list-group list-group-flush">
                                      <li className="list-group-item">
                                          <strong>Username:</strong> {user.username}
                                      </li>
                                      <li className="list-group-item">
                                          <strong>Email:</strong> {user.email}
                                      </li>
                                      <li className="list-group-item">
                                          <strong>Joined On:</strong>{' '}
                                          {user.date_joined || 'Date not available'}
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <Footer/>
          </div>

      </Fragment>

  );
};

export default Profile;