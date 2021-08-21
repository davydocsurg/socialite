import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default: "#fff",
    // }
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default: "#fff",
    // }
  },
});

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export default themes;
