import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PermMediaOutlinedIcon from "@material-ui/icons/PermMediaOutlined";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { LogOutAction } from "../redux/actions/AuthActions";

import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const authResponse = useSelector((state) => state.userAuth.authResponse);

  // routing...
  const signOut = () => {
    dispatch(LogOutAction());
    history.push("/signin");
  };
  const signIn = () => {
    history.push("/signin");
  };
  const signUp = () => {
    history.push("/signup");
  };

  const token = localStorage.getItem("user-token");

  useEffect(() => {
    if (authResponse !== "" && authResponse.success === true) {
      alert(authResponse.message);
      localStorage.removeItem("user-token");
    }
    return () => {};
  }, [authResponse]);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className="bg-white">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <PermMediaOutlinedIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Socialite
          </Typography>
          <Router>
            {token !== null && token !== "" ? (
              <Button color="inherit" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              // <Link to='/signin'>Sign In</Link>
              // <Button color="inherit" component={Link} to="/signin">
              //   Sign In
              // </Button>
              <Button color="inherit" onClick={signIn}>
                Sign In
              </Button>
            )}
            <Button color="inherit" onClick={signUp}>
              Sign Up
            </Button>
          </Router>
        </Toolbar>
      </AppBar>
    </div>
  );
}
