import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { KeycloakProvider, useKeycloak } from  '@react-keycloak/web';
import {useContext, useEffect} from "react";
import Loading from "./Loading";

const Private = ({ component: Component, ...rest }) => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized) {
      if (!keycloak.authenticated) {
        keycloak.login();
      }
    }
  }, [initialized]);

  if (!initialized) {
    return <Loading message="Fetching user data..." />;
  }

  if (!keycloak.authenticated) {
    return <Loading message="Authenticating..." />;
  }
  return (
    <Component />
  );
};

export default Private;