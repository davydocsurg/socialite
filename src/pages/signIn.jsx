import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { SignInAction } from "../redux/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";

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
    },
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const authResponse = useSelector((state) => state.userAuth.authResponse);

  const [open, setOpen] = useState({
    open: false,
  });

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
    // setErrors();
  }, []);

  const handleFieldChange = (e) => {
    setFields({
      ...fields,
      [e.target.id]: e.target.value,
    });

    setErrors({
      ...errors,
      errorMsg: {},
    });
  };

  const SignInUser = (e) => {
    e.preventDefault();
    // console.log(fields);
    axios
      .post("http://localhost:8000/api/signin", fields)
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setOpen(true);
          // console.log(res.data.message);
          setErrors({ ...errors, errorMsg: res.data.message });
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          localStorage.setItem("user-token", res.data.access_token);
          history.push("/home");
          // console.log(res.data.message);
          setOpen(false);
          setShowSuccess(true);
        }
        return res;
      })
      .catch((err) => {
        setOpen(true);
        setErrors({ ...errors, errorMsg: err.response.data });
      });
    // dispatch(SignInAction(fields, history));
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
            startIcon={<ExitToAppOutlinedIcon />}
            //                     type="submit"
          >
            Sign In
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
}

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
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
