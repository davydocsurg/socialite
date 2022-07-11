import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, connect } from "react-redux";
import { SignUpAction } from "../redux/actions/AuthActions";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import { SignUpService } from "../services/AuthServices";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    let classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [fields, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        handle: "",
        password: "",
        password_confirmation: "",
    });

    // setState()

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

    const [open, setOpen] = useState(false);

    const [showSuccess, setShowSuccess] = useState({
        showSuccess: false,
    });

    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        setOpen();
        setShowSuccess();
        // setErrors();
    }, []);

    const handleFieldChange = (e) => {
        setState({
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

    const RegisterUser = async (e) => {
        e.preventDefault();
        setErrors({
            ...errors,
            errorMsg: {},
        });
        setSpinner(true);
        try {
            const res = await SignUpService(fields);
            if (res.data.status == 400 && res.data.success === false) {
                setErrors({
                    ...errors,
                    errorMsg: {
                        first_name: res.data.message.first_name,
                        last_name: res.data.message.last_name,
                        email: res.data.message.email,
                        handle: res.data.message.handle,
                        password: res.data.message.password,
                        password_confirmation:
                            res.data.message.password_confirmation,
                    },
                });
            } else if (res.data.status == 200 && res.data.success === true) {
                setSpinner(false);
                setShowSuccess(true);
                setTimeout(() => {
                    history.push("/signin");
                }, 1800);
            }
        } catch (error) {
            setErrors({
                ...errors,
                errorMsg: {
                    first_name: errors.first_name,
                    last_name: errors.last_name,
                    email: errors.email,
                    handle: errors.handle,
                    password: errors.password,
                    password_confirmation: errors.password_confirmation,
                },
            });
            console.log(error);
            setSpinner(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={closeSuccess}
            >
                <Alert onClose={closeSuccess} severity="success">
                    SignUp was successful!
                </Alert>
            </Snackbar>

            {open && (
                <Snackbar open={open} autoHideDuration={2000} onClose={!open}>
                    <Alert onClose={!open} severity="error">
                        Something went wrong! Check your credentials and try
                        again.
                    </Alert>
                </Snackbar>
            )}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={RegisterUser}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="first_name"
                                name="first_name"
                                value={fields.first_name}
                                required
                                onChange={handleFieldChange}
                                fullWidth
                                helperText={errors.errorMsg.first_name}
                                error={
                                    errors.errorMsg.first_name ? true : false
                                }
                                id="first_name"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                value={fields.last_name}
                                onChange={handleFieldChange}
                                helperText={errors.errorMsg.last_name}
                                error={errors.errorMsg.last_name ? true : false}
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                name="last_name"
                                autoComplete="last_name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={fields.email}
                                onChange={handleFieldChange}
                                helperText={errors.errorMsg.email}
                                error={errors.errorMsg.email ? true : false}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={fields.handle}
                                onChange={handleFieldChange}
                                helperText={errors.errorMsg.handle}
                                error={errors.errorMsg.handle ? true : false}
                                fullWidth
                                id="handle"
                                label="Handle"
                                name="handle"
                                autoComplete="handle"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={fields.password}
                                onChange={handleFieldChange}
                                helperText={errors.errorMsg.password}
                                error={errors.errorMsg.password ? true : false}
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                value={fields.password_confirmation}
                                onChange={handleFieldChange}
                                helperText={
                                    errors.errorMsg.password_confirmation
                                }
                                error={
                                    errors.errorMsg.password_confirmation
                                        ? true
                                        : false
                                }
                                fullWidth
                                name="password_confirmation"
                                label="Confirm Password"
                                type="password"
                                id="password_confirmation"
                                autoComplete="password_confirmation"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        <span className="pr-3">Sign Up</span>{" "}
                        {spinner && (
                            <CircularProgress
                                sx={{ ml: 3 }}
                                color="inherit"
                                size={20}
                            />
                        )}
                        {/* {spinner ? (
              <CircularProgress sx={{ ml: 1 }} color="inherit" size={20} />
            ) : (
              <EditIcon />
            )} */}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>{/* <Copyright /> */}</Box>
        </Container>
    );
};

export default SignUp;
