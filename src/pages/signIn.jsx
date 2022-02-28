import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/material/styles";
import Container from "@mui/material/Container";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
// redux
import { SignInAction } from "../redux/actions/AuthActions";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  },

  spinner: {
    width: "10% !important",
    height: "1% !important",
    position: "absolute",
    // zIndex: "10",
    // backgroundColor: "black",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const SignIn = ({ UI }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    open: false,
  });

  const [spinner, setSpinner] = useState(false);

  const [showSuccess, setShowSuccess] = useState({
    showSuccess: false,
  });

  const [fields, setFields] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    errorMsg: {
      login: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setShowPassword({
      ...showPassword,
      showPassword: !showPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    setOpen();
    setShowSuccess();

    // setErrors({
    //   ...errors,
    //   errorMsg: {
    //     UI.errors
    //   },
    // });
  }, []);

  const handleFieldChange = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    });

    // UI.errors = {};
    setSpinner(false);

    setErrors({
      ...errors,
      errorMsg: {},
    });
  };

  const SignInUser = (e) => {
    e.preventDefault();
    setErrors({
      ...errors,
      errorMsg: {},
    });
    dispatch(SignInAction(fields, navigate));
    setSpinner(true);
    if (UI.errors) {
      setOpen(true);
      setErrors({
        ...errors,
        errorMsg: {
          login: UI.errors.login,
          password: UI.errors.password,
        },
      });
    } else if ((UI.errors.length = 0)) {
      setErrors({
        ...errors,
        errorMsg: {},
      });
    }

    // axios
    //   .post("http://localhost:8000/api/signin", fields)
    //   .then((res) => {
    //     if (res.data.hasOwnProperty("success") && res.data.success === false) {
    //       setOpen(true);
    //       // console.log(res.data.message);
    //       setErrors({ ...errors, errorMsg: res.data.message });
    //     } else if (
    //       res.data.hasOwnProperty("success") &&
    //       res.data.success === true
    //     ) {
    //       localStorage.setItem("user-token", res.data.access_token);
    //       navigate("/home");
    //       // console.log(res.data.message);
    //       setOpen(false);
    //       setShowSuccess(true);
    //     }
    //     return res;
    //   })
    //   .catch((err) => {
    //     setOpen(true);
    //     setErrors({ ...errors, errorMsg: err.response.data });
    //   });
    // dispatch(SignInAction(fields, navigate));
    // console.log(authResponse);
  };

  return (
    <Container component="main" maxWidth="xs">
      {showSuccess ? (
        <div className={classes.root}>
          <Collapse in={showSuccess}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setShowSuccess(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="success"
            >
              SignIn success.
            </Alert>
          </Collapse>
        </div>
      ) : null}

      {open ? (
        <div className={classes.root}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="error"
            >
              <AlertTitle>Error!</AlertTitle>
              Please check your credentials and try again.
            </Alert>
          </Collapse>
        </div>
      ) : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={SignInUser}>
          <TextField
            margin="normal"
            value={fields.login}
            onChange={handleFieldChange}
            helperText={errors.errorMsg.login}
            error={errors.errorMsg.login ? true : false}
            required
            fullWidth
            id="login"
            label="Email Address or Handle"
            name="login"
            autoComplete="login"
            autoFocus
          />
          <TextField
            margin="normal"
            value={fields.password}
            onChange={handleFieldChange}
            helperText={errors.errorMsg.password}
            error={errors.errorMsg.password ? true : false}
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword.showPassword ? "text" : "password"}
            id="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {/* {showPassword.showPassword ? ( */}
                  <Visibility />
                  {/* ) : ( */}
                  <VisibilityOff />
                  {/* )} */}
                </IconButton>
              </InputAdornment>
            }
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={!spinner ? <ExitToAppOutlinedIcon /> : null}
            endIcon={spinner ? <CircularProgress color="white" /> : null}
          >
            Sign In{" "}
            {/* {spinner ? (
              <div className={classes.spinner}>
                <CircularProgress color="secondary" />
              </div>
            ) : null} */}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  SignInAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch1: () => {
      dispatch(SignInAction);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

// import React from "react";
// import { makeStyles } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(2),
//       // width: "45ch",
//     },
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

// const SignIn = () => {
//   const classes = useStyles();
//   return (
//     <div className="container mt-5">
//       <h4 className="text-center">Sign In</h4>
//       <div className="row justify-content-center text-center align-items-center">
//         <div className="col-lg-6 col-12">
//           <div className="card">
//             <div className="card-body">
//               <form className={classes.root} noValidate autoComplete="off">
//                 <div className="form-group">
//                   <TextField
//                     id="standard-basic"
//                     label="Email or Handle"
//                     // variant="outlined"
//                     className="form-control"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <TextField
//                     id="standard-password-input"
//                     label="Password"
//                     type="password"
//                     autoComplete="current-password"
//                     // variant="outlined"
//                     className="form-control"
//                   />{" "}
//                 </div>
//                 <div className="form-group">
//                   <Button
//                     variant="contained"
//                     color="default"
//                     className={classes.button}
//                     startIcon={<ExitToAppOutlinedIcon />}
//                     type="submit"
//                   >
//                     Sign In
//                   </Button>
//                 </div>
//               </form>

//               <div className="text-info">
//                 <small className="text-dark">
//                   Don't have an account? <Link to="/signup">Sign Up</Link>
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SignIn;
