import React, {Fragment, useEffect} from 'react';
import { useKeycloak } from '@react-keycloak/web';
import Header from './layout/Header'
import Footer from './layout/Footer'
import Loading from "./Loading";

const Homepage = () => {
  const { keycloak, initialized } = useKeycloak();
  return (
    <div>
        {!initialized && (
        <>
          <Loading message="Please wait..." />;
        </>
      )}
        {initialized && (
            <>
              <Fragment>
                <div className="d-flex flex-column min-vh-100">
                  <Header/>
                  <div
                      className="hero text-white text-center d-flex align-items-center justify-content-center flex-grow-1"
                      style={{
                        backgroundImage: "url('https://cdn.pixabay.com/photo/2020/11/07/01/28/abstract-5719221_1280.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        position: "relative",
                        minHeight: "75vh",
                      }}
                  >
                    <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                        }}
                    ></div>
                    <div className="container position-relative">
                      <h1 className="display-3 fw-bold mb-4">Scratch & Script</h1>
                      <p className="lead mb-4">
                        Your one-stop solution for Online Courses. Welcome on board.
                      </p>
                      {!keycloak.authenticated && (
                         <>

                         <button className="btn-lg btn btn-outline-light me-2" style={{padding: "12px 30px", fontSize: "1.2rem"}} onClick={() => keycloak.register()}>Get Started </button>
                         </>
                     )}
                    </div>
                  </div>
                  <Footer/>
                </div>

              </Fragment>
            </>
        )}
    </div>
  );
};

export default Homepage;