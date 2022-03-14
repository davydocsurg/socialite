import React, { useState, useEffect, useDispatch, useContext } from "react";
import { useLocation } from "react-router-dom";
import IRoutes from "./routes/IRoutes";
import { IndexContext, IndexContextProvider } from "./contexts/IndexContext";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext";
import SideBar from "./components/SideBar";
import Widgets from "./components/Widgets";
import { Container } from "@mui/material";

function App() {
  // const { getUserData } = useContext(IndexContext);
  // const dispatch = useDispatch;
  const location = useLocation();

  // useEffect(() => {
  //   getUserData;
  // }, [getUserData]);

  return (
    <>
      <IndexContextProvider>
        <Container className={`m-0 app`} component="main" maxWidth="xl">
          {!location.pathname.match(`/signin|/signup`) ? <SideBar /> : null}
          <AuthContextProvider>
            <IRoutes />
          </AuthContextProvider>
          {!location.pathname.match(`/signin|/signup`) ? <Widgets /> : null}
        </Container>
      </IndexContextProvider>
    </>
  );
}

export default App;
