import React, { useState, useEffect, useDispatch, useContext } from "react";
import { useLocation } from "react-router-dom";
import IRoutes from "./routes/IRoutes";
import { IndexContext, IndexContextProvider } from "./contexts/IndexContext";
import SideBar from "./components/SideBar";
import Widgets from "./components/Widgets";
import { Container } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import { TweetProvider } from "./contexts/TweetContext";
// import { TweetContextProvider } from "./contexts/TweetContext";

function App() {
  const { getUserData } = useContext(IndexContext);
  // const dispatch = useDispatch;
  const location = useLocation();

  useEffect(() => {
    getUserData;
  }, [getUserData]);

  return (
    <>
      {/* <IndexContextProvider> */}
      <AuthProvider>
        <TweetProvider>
          <Container className={`m-0 app`} component="main" maxWidth="xl">
            {!location.pathname.match(`/signin|/signup`) ? <SideBar /> : null}
            {/*
            <TweetContextProvider> */}
            <IRoutes />
            {/* </TweetContextProvider>
             */}
            {!location.pathname.match(`/signin|/signup`) ? <Widgets /> : null}
          </Container>
        </TweetProvider>
      </AuthProvider>
      {/* </IndexContextProvider> */}
    </>
  );
}

export default App;
