import * as React from "react";
import Routes from "./routes/Routes";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ThemeSwitcherComponent from "./components/ThemeSwitcher";
// import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
// components
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";

function App() {
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
          <Container
            className="m-0"
            component="main"
            className="app"
            maxWidth="xl"
          >
            {!location.pathname.match(`/signin|/signup`) ? (
              <Sidebar></Sidebar>
            ) : null}
            <Routes></Routes>
            {!location.pathname.match(`/signin|/signup`) ? (
              <Widgets></Widgets>
            ) : null}
          </Container>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
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