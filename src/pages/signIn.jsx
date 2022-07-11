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
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
// redux
import { SetAuthToken, SignInAction } from "../redux/actions/AuthActions";
import PropTypes from "prop-types";
import { SignInService } from "../services/AuthServices";
import { Snackbar } from "@material-ui/core";

// services
import * as ActionTypes from "../redux/ActionTypes";
import axios from "axios";

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
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignIn = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [openErr, setOpenErr] = useState(false);

    const [spinner, setSpinner] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

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

    const handleFieldChange = (e) => {
        setFields({
            ...fields,
            [e.target.id]: e.target.value,
        });

        setSpinner(false);

        setErrors({
            ...errors,
            errorMsg: {},
        });
    };

    const closeSuccess = () => {
        setShowSuccess(false);
    };

    const closeErr = () => {
        setOpenErr(false);
    };

    const SignInUser = async (e) => {
        e.preventDefault();

        setErrors({
            ...errors,
            errorMsg: {},
        });
        setSpinner(true);
        try {
            const res = await SignInService(fields);
            if (res.data.status == 400 && res.data.success === false) {
                setOpenErr(true);
                setErrors({
                    ...errors,
                    errorMsg: {
                        login: res.data.message.login,
                        password: res.data.message.password,
                    },
                });
                setSpinner(false);
            } else if (res.data.status == 200 && res.data.success === true) {
                setErrors({
                    ...errors,
                    errorMsg: {},
                });
                // dispatch(SetAuthToken(res.data.access_token));
                SetAuthToken(res.data.access_token);
                dispatch({ type: ActionTypes.SET_AUTHENTICATED });
                setSpinner(false);
                setShowSuccess(true);
                setTimeout(() => {
                    history.push("/home");
                }, 1000);
            }
        } catch (err) {
            console.error(err);
            setSpinner(false);
        }
    };

    const SetAuthToken = (token) => {
        const authToken = `Bearer ${token}`;
        localStorage.setItem("user-token", authToken);
        axios.defaults.headers.common["Authorization"] = authToken;
    };

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={closeSuccess}
            >
                <Alert onClose={closeSuccess} severity="success">
                    Signed In!
                </Alert>
            </Snackbar>

            <Snackbar open={openErr} autoHideDuration={6000} onClose={closeErr}>
                <Alert onClose={closeErr} severity="error">
                    <AlertTitle>Invalid Credentials!</AlertTitle>
                    Please check your credentials and try again.
                </Alert>
            </Snackbar>

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
                        endadornment={
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
                    >
                        <span className="mr-3">Sign In</span>{" "}
                        {spinner && (
                            <CircularProgress
                                sx={{ pl: 3 }}
                                color="inherit"
                                size={20}
                            />
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
            </div>
        </Container>
    );
};

export default SignIn;
