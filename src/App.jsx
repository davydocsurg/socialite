import React, { useEffect } from "react";
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
import { useHistory, useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
// components
import Sidebar from "./components/Sidebar";
import Widgets from "./components/Widgets";
// redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { checkAuthState, SignOutAction } from "./redux/actions/AuthActions";
import * as ActionTypes from "./redux/ActionTypes";
import { GetAuthUserService } from "./redux/actions/UserService";
import jwtDecode from "jwt-decode";

const App = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector((state) => state.user.authenticated);
  const token = localStorage.getItem("user-token");

  useEffect(() => {
    dispatch(checkAuthState());
    console.log(authenticated);
    if (authenticated) {
      console.log("authenticated");
      fetchAuthUser();
    }
  }, []);

  // decode token
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(SignOutAction());
      history.push("/signin");
    } else {
      // authenticated = true;
      store.dispatch({
        type: ActionTypes.SET_AUTHENTICATED,
      });
      // axios.defaults.headers.common["Authorization"] = token;
      // store.dispatch(getUserData());
    }
  }

  const fetchAuthUser = async () => {
    console.log("..........");
    try {
      const res = await GetAuthUserService();
      if (res.data.status == 400 && res.data.success === false) {
        console.log(res.data);
      } else if (res.data.status == 200 && res.data.success === true) {
        console.log(res.data);
        dispatch({
          type: ActionTypes.SET_USER,
          payload: res.data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  const Main = () => {
    return (
      <ThemeProvider theme={theme}>
        {!location.pathname.match({ oddLocations }) ? (
          <ThemeSwitcherComponent useOs={true} themeChanger={toggleDarkMode} />
        ) : null}

        <CssBaseline>
          <Container className="m-0 app" component="main" maxWidth="xl">
            {!location.pathname.match(`/signin|/signup`) && <Sidebar></Sidebar>}
            <Routes></Routes>
            {!location.pathname.match(`/signin|/signup`) && <Widgets></Widgets>}
          </Container>
        </CssBaseline>
      </ThemeProvider>
    );
  };

  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
};

export default App;
