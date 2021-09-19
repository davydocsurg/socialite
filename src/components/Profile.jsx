import React, { Fragment, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { PropTypes } from "prop-types";
import { Paper, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import MUILink from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import moment from "moment";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthUserTweet from "./tweets/AuthUserTweet";
// import { useHistory } from "react-router-dom";
import GoBack from "./constants/GoBack";
import FlipMove from "react-flip-move";
import HttpService from "../services/HttpServices";
import Modal from "@material-ui/core/Modal";
import { UpdateProfileInfo } from "../redux/actions/ProfileActions";

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
  user: {
    credentials: {
      id,
      first_name,
      last_name,
      profile_picture,
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
  const [profileDetails, setProfileDetails] = useState({
    first_name,
    last_name,
    bio,
    website,
    location,
    profile_picture,
    // cover_picture,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const profilePicsUrl = "http://localhost:8000/storage/users/profile/";

  const openProfileModal = () => {
    setOpenModal(true);
  };

  const closeProfileModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setProfileDetails(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateProfileInfo());
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
      <div className="mx-auto">
        <Modal open={openModal} onClose={closeProfileModal} className="">
          <div
            // className="modal modal-xl "
            id="exampleModal"
            // tabindex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Profile
                  </h5>
                  <button
                    className="close"
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
                <div className="modal-body">
                  <div className="position-relative min-vh-25 mb-7">
                    <div className="bg-holder rounded-soft rounded-bottom-0"></div>
                    <div className="avatar avatar-5xl avatar-profile">
                      <Avatar
                        alt="Remy Sharp"
                        src={profilePicsUrl + profile_picture}
                        className={`rounded-circle  transform-o avatar-img  img-fluid shadow-sm`}
                      />
                    </div>
                  </div>

                  <div className="prof-details-inp">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <TextField
                            required
                            id="standard-required"
                            label="First Name"
                            defaultValue={first_name}
                            variant="standard"
                            fullWidth
                          />
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            required
                            id="standard-required"
                            label="Last Name"
                            defaultValue={last_name}
                            variant="standard"
                            fullWidth
                          />
                        </div>
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="standard-multiline-flexible"
                          label="Bio"
                          multiline
                          maxRows={4}
                          value={bio && bio}
                          fullWidth
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="standard-required"
                          label="Website"
                          defaultValue={website && website}
                          variant="standard"
                          fullWidth
                        />
                      </div>
                    </form>
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
                    className="btn btn-primary text-white btn-sm followBtn"
                    type="submit"
                  >
                    Save changes
                  </Button>
                </div>
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
              <h2 className="ml-4">
                {first_name} {last_name}
              </h2>
              <em className="font-weight-lighter">
                {authUserTweetsCount} Tweets
              </em>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header position-relative min-vh-25 mb-7">
            <div className="bg-holder rounded-soft rounded-bottom-0"></div>
            <div className="avatar avatar-5xl avatar-profile">
              <Avatar
                alt="Remy Sharp"
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
                  {first_name} {last_name}{" "}
                  <small
                    className="fas fa-check-circle text-primary ml-5"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Verified"
                    data-fa-transform="shrink-4 down-2"
                  ></small>
                </h4>
                <b className="text-muted">@{handle}</b>
                <br />
                <br />
                <h5 className="fs-0 font-weight-normal">
                  {bio && <Typography variant="body2"> bio</Typography>}
                </h5>
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

                      {/* {openModal && (
                        <div
                          // className="modal fade position-absolute"
                          id="exampleModal"
                          tabindex="-1"
                          role="dialog"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                  Modal Title
                                </h5>
                                <button
                                  className="close"
                                  type="button"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span
                                    className="font-weight-light"
                                    aria-hidden="true"
                                  >
                                    &times;
                                  </span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <p>
                                  Woohoo, you're reading this text in a modal!
                                </p>
                              </div>
                              <div className="modal-footer">
                                <button
                                  className="btn btn-secondary btn-sm"
                                  type="button"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  className="btn btn-primary btn-sm"
                                  type="button"
                                >
                                  Save changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )} */}
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
              <div className="row mr-auto">
                {location && (
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <p className="text-500">
                      <Fragment>
                        <LocationOn color="primary" />
                        {location}
                      </Fragment>
                    </p>
                  </div>
                )}
                {website && (
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <Fragment>
                      <LinkIcon>
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          {website}
                        </a>
                      </LinkIcon>
                    </Fragment>
                  </div>
                )}

                <div className="col-lg-6 col-md-6 col-sm-6 text-muted">
                  <CalendarToday className="mb-2"></CalendarToday>{" "}
                  <b className="mt-4">
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

        <FlipMove>
          {authUserTweets.map((authUserTweet) => (
            <AuthUserTweet
              key={authUserTweet.slug}
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
            ></AuthUserTweet>
          ))}
        </FlipMove>
      </div>
    </>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
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
