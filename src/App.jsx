import * as React from "react";
import LiteRoutes from "./routes/LiteRoutes";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ThemeSwitcherComponent from "./components/ThemeSwitcher";
// import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
// components
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
// redux
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

const App = ({}) => {
  // Get OS-level preference for dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // state: boolean ; true == use dark mode
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const themeString = (b) => (b ? "dark" : "light");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: themeString(darkMode),
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = (checked) => {
    if (checked === null) setDarkMode(prefersDarkMode);
    else setDarkMode(checked);
  };

  const location = useLocation();

  let oddLocations = ["/home", "/notifications"];
  // let authRoutes = ["/signin", "/signup"];

  return (
    <>
      <ThemeProvider theme={theme}>
        {!location.pathname.match({ oddLocations }) ? (
          <ThemeSwitcherComponent useOs={true} themeChanger={toggleDarkMode} />
        ) : null}

        <CssBaseline>
          <Container className="m-0" component="main" maxWidth="xl">
            {!location.pathname.match(`/signin|/signup`) ? (
              <Sidebar></Sidebar>
            ) : null}
            <LiteRoutes></LiteRoutes>
            {!location.pathname.match(`/signin|/signup`) ? (
              <Widgets></Widgets>
            ) : null}
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};

export default App;

// App.propTypes = {
//   user: PropTypes.object.isRequired,
//   tweetReducer: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     tweetReducer: state.tweetReducer,
//   };
// };

// export default connect(mapStateToProps)(App);
{
  /* return (
  <React.Fragment>
    <Route
      render={({ location }) =>
        location.pathname !== "/register" && currentUser ? (
          <HeaderLogIn />
        ) : (
          <HeaderLogOut />
        )
      }
    />
    <Switch>
      <Route exact path="/register" component={RegistrationPage} />
      <Route
        exact
        path="/welcome"
        render={() => (currentUser ? <Redirect to="/" /> : <WelcomePage />)}
      />
      ... other routes
    </Switch>
  </React.Fragment>
); */
}
