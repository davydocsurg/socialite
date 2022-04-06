import React, { useState, useEffect, useDispatch, useContext } from "react";
import { useLocation } from "react-router-dom";
import IRoutes from "./routes/IRoutes";
import SideBar from "./components/SideBar";
import Widgets from "./components/Widgets";
import { Container } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import { TweetProvider, useTweetContext } from "./contexts/TweetContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// import { TweetContextProvider } from "./contexts/TweetContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { openTSM, closeTSM, setCloseTSM } = useTweetContext();
  // const dispatch = useDispatch;
  const location = useLocation();
  useEffect(() => {
    console.log(openTSM);
  }, [openTSM]);

  const closeTweetSM = (e) => {
    e.preventDefault();
    setCloseTSM(true);
  };

  return (
    <>
      {/* <IndexContextProvider> */}
      <AuthProvider>
        <TweetProvider>
          <Container className={`m-0 app`} component="main" maxWidth="xl">
            <Snackbar
              open={openTSM}
              autoHideDuration={6000}
              onClose={closeTweetSM}
            >
              <Alert
                onClose={closeTweetSM}
                severity="success"
                sx={{ width: "100%" }}
              >
                Tweet sent!
              </Alert>
            </Snackbar>
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
