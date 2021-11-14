import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import { Paper, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import MUILink from "@material-ui/core/Link";
import { Typography, Tooltip } from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import moment from "moment";
import { Avatar } from "@material-ui/core";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import AuthUserTweet from "./tweets/AuthUserTweet";
// import { useHistory } from "react-router-dom";
import GoBack from "./constants/GoBack";
import FlipMove from "react-flip-move";
import HttpService from "../services/HttpServices";
import Modal from "@material-ui/core/Modal";
import { UpdateProfileInfo } from "../redux/actions/ProfileActions";
import { getUserData } from "../redux/actions/AuthActions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// function TransitionRight(props) {
// return <Slide {...props} direction="right" />;
// }

const useStyles = makeStyles((theme) => ({
  large: {
    width: 10.1 + "rem",
    height: 10.1 + "rem",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    // backgroundImage: url("../assets/images/avatar.png"),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // margin: " 10rem  10rem  10rem 30rem",
    // transition: "all 2s ease !important",
  },
}));

const Profile = ({
  UI,
  user: {
    credentials: {
      id,
      first_name,
      last_name,
      profile_picture,
      cover_picture,
      email,
      handle,
      is_verified,
      created_at,
      bio,
      website,
      location,
    },
    authUserTweets,
    authUserTweetsCount,
    loading,
    authenticated,
    tweeps,
  },
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const history = useHistory();
  // authorization
  const token = localStorage.getItem("user-token");
  const [openModal, setOpenModal] = useState(false);
  const [openProfPicsModal, setOpenProfPicsModal] = useState(false);
  const [openCoverPhotoModal, setOpenCoverPhotoModal] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    website: "",
    location: "",
    profile_picture: "",
    cover_picture,
  });

  const [profPics, setProfPics] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [transition, setSetTransition] = useState(undefined);

  const [errors, setErrors] = useState({
    errorMsg: {
      first_name: "",
      last_name: "",
      bio: "",
      website: "",
      location: "",
      profile_picture: "",
      handle: "",
    },
  });

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  const [
    openProfileDetailsUpdateSuccessMessage,
    setOpenProfileDetailsUpdateSuccessMessage,
  ] = useState(false);

  const [
    openProfilePicsUpdateSuccessMessage,
    setOpenProfilePicsUpdateSuccessMessage,
  ] = useState(false);

  const [
    openCoverPhotoUpdateSuccessMessage,
    setOpenCoverPhotoUpdateSuccessMessage,
  ] = useState(false);

  const [openProfileUpdateErrorMessage, setOpenProfileUpdateErrorMessage] =
    useState(false);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const profilePicsUrl = "http://localhost:8000/profile/photos/";
  const coverPicsUrl = "http://localhost:8000/profile/photos/";
  // const coverPicsUrl = "http://localhost:8000/storage/users/profile/";
  let fullName = first_name + " " + last_name + " ";

  const openProfileModal = () => {
    setProfileDetails({
      ...profileDetails,
      first_name: first_name,
      last_name: last_name,
      bio: bio,
      website: website,
      location: location,
      handle: handle,
      profile_picture: profile_picture,
    });
    setOpenModal(true);
  };

  const closeProfileModal = () => {
    setOpenModal(false);
    setProfileDetails({
      ...profileDetails,
    });
  };

  const handleChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.id]: e.target.value,
    });
    clearAllErrors();
  };

  const handleProfFileChange = (e) => {
    setOpenProfPicsModal(true);
    setTimeout(() => {
      document.getElementById("profile_picture").click();

      let file = e.target.files[0];
      let reader = new FileReader();

      let limit = 1024 * 1024 * 2;
      if (file["size"] > limit) {
        setProfPics({
          ...profPics,
          profPics: "",
        });
        alert("File is too large! It must be less than 2MB.");

        return false;
      }

      reader.onloadend = (file) => {
        setProfPics(reader.result);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const handleCoverFileChange = (e) => {
    setOpenCoverPhotoModal(true);
    setTimeout(() => {
      document.getElementById("cover_picture").click();

      let file = e.target.files[0];
      let reader = new FileReader();

      let limit = 1024 * 1024 * 2;
      if (file["size"] > limit) {
        setCoverPhoto({
          ...coverPhoto,
          coverPhoto: "",
        });
        alert("File is too large! It must be less than 2MB.");

        return false;
      }

      reader.onloadend = (file) => {
        setCoverPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const changeProfPics = () => {
    axios
      .post(
        "http://localhost:8000/api/update-profile-picture",
        { profile_picture: profPics },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setOpenProfileUpdateErrorMessage(true);
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          closeProfPicsModal();
          setOpenProfilePicsUpdateSuccessMessage(true);
          dispatch(getUserData());
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeCoverPhoto = () => {
    axios
      .post(
        "http://localhost:8000/api/update-cover-picture",
        { cover_picture: coverPhoto },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setOpenProfileUpdateErrorMessage(true);
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          closeCoverPhotoModal();
          setOpenCoverPhotoUpdateSuccessMessage(true);
          dispatch(getUserData());
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // close profile pics modal
  const closeProfPicsModal = () => {
    setProfPics("");
    setOpenProfPicsModal(false);
  };

  // close cover photo modal
  const closeCoverPhotoModal = () => {
    setCoverPhoto("");
    setOpenCoverPhotoModal(false);
  };

  // open profile pics modal
  const openProfPicsPreviewModal = () => {
    handleProfFileChange();
    // document.getElementById("profile_picture").click();
    // setOpenProfPicsModal(true);
  };

  // open cover photo modal
  const openCoverPhotoPreviewModal = () => {
    handleCoverFileChange();
  };

  const closeProfileDetailsUpdateSuccessMessage = () => {
    setOpenProfileDetailsUpdateSuccessMessage(false);
  };

  const closeProfilePicsUpdateSuccessMessage = () => {
    setOpenProfilePicsUpdateSuccessMessage(false);
  };

  const closeCoverPhotoUpdateSuccessMessage = () => {
    setOpenCoverPhotoUpdateSuccessMessage(false);
  };

  const closeProfileUpdateErrorMessage = () => {
    setOpenProfileUpdateErrorMessage(false);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    // if (UI.errors.length > 1) {
    clearAllErrors();
    // }
    dispatch(UpdateProfileInfo(profileDetails));

    if (UI.errors) {
      setOpenModal(true);
      setOpenProfileUpdateErrorMessage(true);
      setErrors({
        ...errors,
        errorMsg: {
          handle: UI.errors.handle,
          email: UI.errors.email,
          first_name: UI.errors.first_name,
          last_name: UI.errors.last_name,
          bio: UI.errors.bio,
          website: UI.errors.website,
          location: UI.errors.location,
          profile_picture: UI.errors.profile_picture,
        },
      });
    } else if (!UI.errors) {
      // clearAllErrors();
      setOpenModal(false);
      setOpenProfileDetailsUpdateSuccessMessage(true);
    }
    // setOpenModal(false);
  };

  const clearAllErrors = () => {
    setErrors({
      ...errors,
      errorMsg: {},
    });
  };

  // const [authUserTweets, setAuthUserTweets] = useState([]);

  // useEffect(() => {
  //   fetchAuthUserTweets();
  // }, []);

  // const fetchAuthUserTweets = () => {
  //   const http = new HttpService();
  //   let authUserTweetsUrl = "authUserTweets";

  //   return http
  //     .getData(authUserTweetsUrl, {
  //       headers: headers,
  //     })
  //     .then((res) => {
  //       setAuthUserTweets(res);
  //       console.log("====================================");
  //       console.log(res);
  //       console.log("====================================");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <>
      {/* profile details success message */}
      <Snackbar
        open={openProfileDetailsUpdateSuccessMessage}
        autoHideDuration={6000}
        onClose={closeProfileDetailsUpdateSuccessMessage}
      >
        <Alert
          onClose={closeProfileDetailsUpdateSuccessMessage}
          severity="success"
        >
          Profile Updated Successfully!
        </Alert>
      </Snackbar>

      {/* profile pics success message */}
      <Snackbar
        open={openProfilePicsUpdateSuccessMessage}
        autoHideDuration={6000}
        onClose={closeProfilePicsUpdateSuccessMessage}
      >
        <Alert
          onClose={closeProfilePicsUpdateSuccessMessage}
          severity="success"
        >
          Profile Picture Updated Successfully!
        </Alert>
      </Snackbar>

      {/* cover photo success message */}
      <Snackbar
        open={openCoverPhotoUpdateSuccessMessage}
        autoHideDuration={6000}
        onClose={closeCoverPhotoUpdateSuccessMessage}
      >
        <Alert onClose={closeCoverPhotoUpdateSuccessMessage} severity="success">
          Cover Photo Updated Successfully!
        </Alert>
      </Snackbar>

      {/* profile update error message */}
      <Snackbar
        open={openProfileUpdateErrorMessage}
        autoHideDuration={6000}
        onClose={closeProfileUpdateErrorMessage}
        // anchorOrigin={"top right"}
        // key={top right}
        // key={transition ? transition.name : "TransitionRight"}
        // TransitionComponent={transition}
      >
        <Alert onClose={closeProfileUpdateErrorMessage} severity="error">
          Oops, something went wrong. Please, check your credentials and try
          again.
        </Alert>
      </Snackbar>

      <div className="mx-auto">
        <Modal open={openModal} onClose={closeProfileModal} className="">
          <div id="exampleModal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Profile
                  </h5>
                  <button
                    className="close btn btn-twitter"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeProfileModal}
                  >
                    <span className="font-weight-light" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                </div>
                <form onSubmit={handleDetailsSubmit}>
                  <div className="modal-body profile-modal-body">
                    <div className="position-relative min-vh-25 mb-7">
                      {/* cover photo preview modal */}
                      {openCoverPhotoModal && (
                        <Modal
                          open={openCoverPhotoModal}
                          onClose={closeCoverPhotoModal}
                          className="mt-auto"
                        >
                          <div role="dialog">
                            <div
                              className="modal-dialog modal-md"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">
                                    Cover Photo Preview
                                  </h5>
                                  <button
                                    className="close btn btn-twitter"
                                    type="button"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={closeCoverPhotoModal}
                                  >
                                    <span
                                      className="font-weight-light"
                                      aria-hidden="true"
                                    >
                                      &times;
                                    </span>
                                  </button>
                                </div>

                                <img
                                  src={coverPhoto}
                                  alt=""
                                  className="p-5 shadow-sm img-fluid b-radius"
                                />
                                {/* <form onSubmit={changeProfPics}> */}
                                <div className="modal-footer">
                                  <input
                                    id="cover_picture"
                                    onChange={handleCoverFileChange}
                                    className="d-none"
                                    placeholder="Optional: Enter image URL"
                                    type="file"
                                  />

                                  <button
                                    className="px-4 text-white  followBtn"
                                    type="button"
                                    onClick={changeCoverPhoto}
                                  >
                                    Save changes
                                  </button>
                                </div>
                                {/* </form> */}
                              </div>
                            </div>
                          </div>
                        </Modal>
                      )}

                      <Tooltip title="Change Cover Photo" placement="top">
                        <button
                          className="btn shadow-lg mt-4 p-4 position-absolute btn-update-cover ml-lg-7"
                          onClick={openCoverPhotoPreviewModal}
                          type="button"
                        >
                          <i className="fas fa-upload"></i>
                        </button>
                      </Tooltip>

                      <div
                        className="bg-holder rounded-soft rounded-bottom-0"
                        style={{
                          backgroundImage: `url(${
                            coverPicsUrl + cover_picture
                          })`,
                        }}
                      ></div>
                      <div className="avatar avatar-5xl avatar-profile">
                        {/* img preview modal */}
                        {openProfPicsModal && (
                          <Modal
                            open={openProfPicsModal}
                            onClose={closeProfPicsModal}
                            className="mt-auto"
                          >
                            <div role="dialog">
                              <div
                                className="modal-dialog modal-md"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Profile Image Preview
                                    </h5>
                                    <button
                                      className="close btn btn-twitter"
                                      type="button"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                      onClick={closeProfPicsModal}
                                    >
                                      <span
                                        className="font-weight-light"
                                        aria-hidden="true"
                                      >
                                        &times;
                                      </span>
                                    </button>
                                  </div>

                                  <img
                                    src={profPics}
                                    alt=""
                                    className="p-5 shadow-sm img-fluid b-radius"
                                  />
                                  {/* <form onSubmit={changeProfPics}> */}
                                  <div className="modal-footer">
                                    <input
                                      id="profile_picture"
                                      onChange={handleProfFileChange}
                                      className="d-none"
                                      placeholder="Optional: Enter image URL"
                                      type="file"
                                    />

                                    <button
                                      className="px-4 text-white  followBtn"
                                      type="button"
                                      onClick={changeProfPics}
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                  {/* </form> */}
                                </div>
                              </div>
                            </div>
                          </Modal>
                        )}
                        <div className="bg-dark shadow-lg">
                          <Tooltip
                            title="Change Profile Picture"
                            placement="top"
                          >
                            <button
                              className="btn shadow-lg mt-4 p-4 position-absolute btn-update-prof"
                              onClick={openProfPicsPreviewModal}
                              type="button"
                            >
                              <i className="fas fa-upload"></i>
                            </button>
                          </Tooltip>
                        </div>
                        <Avatar
                          alt={fullName}
                          src={profilePicsUrl + profile_picture}
                          className={`rounded-circle  transform-o avatar-img  img-fluid shadow-sm`}
                        ></Avatar>
                      </div>
                    </div>

                    <div className="prof-details-inp">
                      <div className="row">
                        <div className="col-lg-6">
                          <TextField
                            required
                            id="first_name"
                            label="First Name"
                            defaultValue={first_name}
                            // value={profileDetails.first_name}
                            variant="standard"
                            onChange={handleChange}
                            helperText={errors.errorMsg.first_name}
                            error={errors.errorMsg.first_name ? true : false}
                            fullWidth
                          />
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            required
                            id="last_name"
                            label="Last Name"
                            defaultValue={last_name}
                            // value={profileDetails.last_name}
                            variant="standard"
                            onChange={handleChange}
                            helperText={errors.errorMsg.last_name}
                            error={errors.errorMsg.last_name ? true : false}
                            fullWidth
                          />
                        </div>
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="handle"
                          label="Handle"
                          defaultValue={handle && handle}
                          // value={profileDetails.handle}
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg.handle}
                          error={errors.errorMsg.handle ? true : false}
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="email"
                          label="Email"
                          defaultValue={email && email}
                          // value={profileDetails.email}
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg.email}
                          error={errors.errorMsg.email ? true : false}
                        />
                      </div>

                      {/* #TODO: Fix Bio */}
                      <div className="col-12 mt-3">
                        <TextField
                          id="bio"
                          label="Bio"
                          multiline
                          maxRows={4}
                          defaultValue={bio && bio}
                          // value={profileDetails.bio}
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg.bio}
                          error={errors.errorMsg.bio ? true : false}
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="website"
                          label="Website"
                          defaultValue={website && website}
                          // value={profileDetails.website}
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg.website}
                          error={errors.errorMsg.website ? true : false}
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="location"
                          label="Location"
                          defaultValue={location && location}
                          // value={profileDetails.location}
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg.location}
                          error={errors.errorMsg.location ? true : false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    {/* <Button
                    className="btn btn-secondary btn-sm"
                    type="Button"
                    data-dismiss="modal"
                    onClick={closeProfileModal}
                    >
                    Close
                  </Button> */}
                    <Button
                      className="px-4 text-white  followBtn"
                      type="submit"
                    >
                      Save changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <Paper className={classes.paper}>hello</Paper> */}
        </Modal>
      </div>

      <div className="profile">
        <div className="text-left profile__header">
          <div className=" row">
            <div className="col-1">
              <GoBack></GoBack>
            </div>
            {"  "}
            <div className="col-4">
              <h2 className="ml-4">{fullName}</h2>
              <em className="font-weight-lighter">
                {authUserTweetsCount < 1 ? "No" : authUserTweetsCount}{" "}
                {authUserTweetsCount > 1 ? "Tweets" : "Tweet"}
              </em>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header position-relative min-vh-25 mb-7">
            <div
              className={"bg-holder rounded-soft rounded-bottom-0"}
              style={{
                backgroundImage: `url(${coverPicsUrl + cover_picture})`,
              }}
            ></div>
            <div className="avatar avatar-5xl avatar-profile">
              <Avatar
                alt={fullName}
                src={profilePicsUrl + profile_picture}
                className={
                  // classes.large +
                  `rounded-circle  transform-o avatar-img  img-fluid shadow-sm`
                }
              />
              {/* <img
                className="rounded-circle fit-block transform-o img-thumbnail img-fluid shadow-sm"
                src={
                  "http://localhost:8000/storage/users/profile/" +
                  profile_picture
                }
                alt={first_name + last_name + `'s profile picture`}
                width="200"
              /> */}
            </div>
          </div>
          <div className="card-body mt-3">
            <div className="row">
              <div className="col-8">
                <h4 className="mb-1 mt-5">
                  {fullName}
                  {is_verified ? (
                    <small
                      className="fas fa-check-circle text-twitter-color ml-5"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Verified"
                      data-fa-transform="shrink-4 down-2"
                    ></small>
                  ) : null}
                </h4>
                <b className="text-muted">@{handle}</b>
                <br />
              </div>

              <div className="col-4  pl-2 pl-lg-3">
                <div className="row">
                  {id && (
                    <>
                      <div className="col-4"></div>
                      <div className="col-8">
                        <button
                          className="btn btn-falcon-default followBtn text-white btn-sm px-3  ml-auto"
                          type="button"
                          onClick={openProfileModal}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </>
                  )}

                  {!id && (
                    <>
                      <div className="col-6">
                        <button
                          className="btn btn-falcon-default btn-sm px-3 ml-2"
                          type="button"
                        >
                          Message
                        </button>
                      </div>

                      <div className="col-6">
                        <button
                          className="btn btn-falcon-primary btn-sm px-3"
                          type="button"
                        >
                          Following
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <hr className="border-dashed my-4 d-md-none d-lg-none" />
              </div>
              <div className="col-10 my-3">
                {bio && <Typography variant="body2"> {bio}</Typography>}
              </div>
              <div className="row mr-auto">
                {location && (
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <p className="text-500">
                      <Fragment>
                        {/* <LocationOn color="primary" /> */}
                        <i className="fas fa-map-marker-alt profile-icons"> </i>
                        {" " + location}
                      </Fragment>
                    </p>
                  </div>
                )}
                {website && (
                  <div className="col-lg-5 col-md-7 col-sm-6">
                    <Fragment>
                      {/* <LinkIcon></LinkIcon> */}
                      <div className="d-flex">
                        <i className="fas fa-link profile-icons"> </i>
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=""
                        >
                          {" "}
                          {website}
                        </a>
                      </div>
                    </Fragment>
                  </div>
                )}

                <div className="col-lg-4 col-md-6 col-sm-6 text-muted">
                  {/* <CalendarToday className="mb-2"></CalendarToday>{" "} */}
                  <i className="far fa-calendar-alt profile-icons"></i>
                  <b className="mt-">
                    {" "}
                    Joined {moment(created_at).format("MMMM YYYY")}
                  </b>
                </div>
              </div>

              <div className="row mr-auto mt-4">
                <div className="col-3">
                  <p className="text-black">1k following</p>
                </div>

                <div className="col-3">
                  <p className="text-black">230k followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* loading UI */}
        {UI.loading && (
          <div className="mb-auto mt-5 text-center mx-auto text-twitter-color">
            <i className="spinner-border spinner-border-md "></i>
          </div>
        )}

        <FlipMove>
          {authUserTweets.length > 0 ? (
            authUserTweets.map((authUserTweet) => (
              <AuthUserTweet
                key={authUserTweet.slug}
                slug={authUserTweet.slug}
                tweepName={first_name + " " + last_name}
                username={handle}
                verified={true}
                text={authUserTweet.tweet_text}
                tweetTime={authUserTweet.created_at}
                avatar={profilePicsUrl + profile_picture}
                tweetImage={
                  authUserTweet.tweet_photo
                    ? "http://localhost:8000/tweets/photos/" +
                      authUserTweet.tweet_photo
                    : null
                }
                likesCount={authUserTweet.likes.length}
                authUserId={id}
                tweepLikeId={authUserTweet.likes.map((l) => l.user_id)}
              ></AuthUserTweet>
            ))
          ) : (
            <div className="text-center text-black mt-5 mx-auto">
              <h2>No Tweets Found</h2>
            </div>
          )}
        </FlipMove>
      </div>
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
  };
};

export default connect(mapStateToProps)(Profile);

{
  /* {let profileMarkUp = */
}
// {!loading ? (
//   authenticated ? (
//     <Paper className={classes.paper}>
//       <div className="profile-pics">
//         <Avatar
//           src={profile_picture}
//           alt={first_name + "" + last_name}
//           srcset=""
//         />
//       </div>
//       <div className="profile-details">
//         <MUILink
//           component={Link}
//           to={`/${handle}`}
//           color="primary"
//           variant="h5"
//         >
//           @{handle}
//         </MUILink>
//       </div>
//       {location && (
//         <Fragment>
//           <LocationOn color="primary" />
//           {location}
//         </Fragment>
//       )}

//       {bio && <Typography variant="body2">{bio}</Typography>}

// {website && (
//   <Fragment>
//     <LinkIcon>
//       <a href={website} target="_blank" rel="noopener noreferrer">
//         {" "}
//         {website}
//       </a>
//     </LinkIcon>
//   </Fragment>
// )}

// <CalendarToday>
//   {" "}
//   <span>Joined {moment(created_at).format("MMM YYY")}</span>
// </CalendarToday>
//     </Paper>
//   ) : (
//     "login"
//   )
// ) : (
//   <p>loading...</p>
// )}
