import React, { useState, useEffect, useContext } from "react";

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

//
import { useNavigate } from "react-router-dom";
import HttpService from "../services/HttpServices";
import axios from "axios";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

// colors
import { deepOrange, green } from "@mui/material/colors";

// context

const SignUp = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState({
    open: false,
  });

  const [spinner, setSpinner] = useState(false);

  const [showSuccess, setShowSuccess] = useState({
    showSuccess: false,
  });

  const [fields, setFields] = useState({
    first_name: "",
    last_name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: "",
    showPassword: false,
  });

  // errors
  const [errors, setErrors] = useState({
    errorMsg: {
      first_name: "",
      last_name: "",
      email: "",
      handle: "",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {}, [open, showSuccess]);

  // funcs
  const handleClickShowPassword = () => {
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
    setOpen(false);
    // UI.errors = {};
    setSpinner(false);

    // errors
    setErrors({
      ...errors,
      errorMsg: {
        first_name: "",
        last_name: "",
        email: "",
        handle: "",
        password: "",
        password_confirmation: "",
      },
    });
  };

  const RegisterUser = (e) => {
    e.preventDefault();
    const http = new HttpService();

    axios
      .post(http.url + "/signup", fields)
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setOpen(true);
          console.log(res.data.message);
          setErrors({
            ...errors,
            errorMsg: {
              first_name: res.data.message.first_name,
              last_name: res.data.message.last_name,
              email: res.data.message.email,
              handle: res.data.message.handle,
              password: res.data.message.password,
              // password_confirmation: res.data.message.password_confirmation,
            },
          });
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          setShowSuccess(true);

          navigate("/signin");
        }
      })
      .catch((err) => {
        setOpen(true);
        setErrors({
          ...errors,
          errorMsg: {
            first_name: err.errors.first_name,
            last_name: err.errors.last_name,
            email: err.errors.email,
            handle: err.errors.handle,
            password: err.errors.password,
            // password_confirmation: err.errors.password_confirmation,
          },
        });
      });
    // };
    setSpinner(true);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box sx={{ minWidth: 275 }} className="mt-5">
          <>
            <div className={"mb-2"}>
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
                    SignUp success. Redirecting...
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
                Sign Up
              </Typography>
            </div>
            <Card>
              <CardContent>
                <form className={""} noValidate onSubmit={RegisterUser}>
                  <TextField
                    margin="normal"
                    value={fields.first_name}
                    onChange={handleFieldChange}
                    helperText={errors.errorMsg.first_name}
                    error={errors.errorMsg.first_name ? true : false}
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    autoComplete="first_name"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    value={fields.last_name}
                    onChange={handleFieldChange}
                    helperText={errors.errorMsg.last_name}
                    error={errors.errorMsg.last_name ? true : false}
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="last_name"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    value={fields.email}
                    onChange={handleFieldChange}
                    helperText={errors.errorMsg.email}
                    error={errors.errorMsg.email ? true : false}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    value={fields.handle}
                    onChange={handleFieldChange}
                    helperText={errors.errorMsg.handle}
                    error={errors.errorMsg.handle ? true : false}
                    required
                    fullWidth
                    id="handle"
                    label="Handle"
                    name="handle"
                    autoComplete="handle"
                    autoFocus
                  />

                  <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      type={fields.showPassword ? "text" : "password"}
                      error={errors.errorMsg.password ? true : false}
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
                    {errors.errorMsg.password ? (
                      <small className="text-danger">
                        {errors.errorMsg.password}
                      </small>
                    ) : null}
                  </FormControl>

                  <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
                    <InputLabel htmlFor="password_confirmation">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="password_confirmation"
                      type={fields.showPassword ? "text" : "password"}
                      value={fields.password_confirmation}
                      onChange={handleFieldChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password_confirmation visibility"
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
                      label="Confirm Password"
                    />
                  </FormControl>

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
                    <span className="pr-3">Sign Up</span>{" "}
                    {spinner ? (
                      <CircularProgress
                        sx={{ ml: 1 }}
                        color="inherit"
                        size={20}
                      />
                    ) : (
                      <EditIcon />
                    )}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to="/signin" variant="body2">
                        {"Already have an account? Sign In"}
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

export default SignUp;
