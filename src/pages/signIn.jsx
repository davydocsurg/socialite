import React, { useState, useEffect } from "react";

// mui
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

// colors
import { deepOrange, green } from "@mui/material/colors";

const SignIn = () => {
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
    showPassword: false,
  });

  // const [pwdVisibility, setPwdVisibility] = useState(false);

  const [errors, setErrors] = useState({
    errorMsg: {
      login: "",
      password: "",
    },
  });

  useEffect(() => {}, [open, showSuccess]);

  // funcs
  const handleClickShowPassword = () => {
    // setPwdVisibility({
    //   ...pwdVisibility,
    //   pwdVisibility: !pwdVisibility,
    // });

    setFields({
      ...fields,
      showPassword: !fields.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

    setOpen(true);
    setSpinner(true);

    console.log("====================================");
    console.log("user");
    console.log("====================================");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ minWidth: 275 }} className="mt-5">
          <>
            <div className={"mb-5"}>
              {/* <Grow
                in={!open}
                style={{ transformOrigin: "0 0 0" }}
                {...(!open ? { timeout: 1000 } : {})}
              > */}
              {/* <Slide direction="up" in={open} mountOnEnter unmountOnExit> */}
              {showSuccess === true ? (
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
                    SignIn success. Redirecting...
                  </Alert>
                </Collapse>
              ) : null}

              {open === true ? (
                <Alert
                  variant="filled"
                  severity="error"
                  className="errors-alert"
                >
                  Something went wrong. <br /> Please check your credentials and
                  try again.
                </Alert>
              ) : null}
              {/* </Slide> */}
              {/* </Grow> */}
            </div>
          </>

          <div className={""}>
            <div className="my-3 mx-auto text-center">
              <Avatar
                sx={{ bgcolor: green[500], width: 56, height: 56 }}
                className={"text-center mx-auto"}
              >
                <AccountCircleIcon sx={{ width: 56, height: 56 }} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </div>
            <Card>
              <CardContent>
                <form className={""} noValidate onSubmit={SignInUser}>
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

                  <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      type={fields.showPassword ? "text" : "password"}
                      value={fields.password}
                      onChange={handleFieldChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {fields.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>

                  {/* <TextField
                    margin="normal"
                    value={fields.password}
                    onChange={handleFieldChange}
                    helperText={errors.errorMsg.password}
                    error={errors.errorMsg.password ? true : false}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    // type={showPassword.showPassword ? "text" : "password"}
                    id="password"
                    endadornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {fields.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    autoComplete="current-password"
                  /> */}
                  <FormControl
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    className="justify-content-center"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="mb-3 justify-content- mx-auto text-center"
                  >
                    <span className="pr-3">Sign In</span>{" "}
                    {spinner ? (
                      <CircularProgress
                        sx={{ ml: 1 }}
                        color="inherit"
                        size={20}
                      />
                    ) : (
                      // <i className="ml-3 spinner-border text-white">
                      //   <span class="sr-only">Loading...</span>
                      // </i>
                      <LoginIcon />
                    )}
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
              </CardContent>
            </Card>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
