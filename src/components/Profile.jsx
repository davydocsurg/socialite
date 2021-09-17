import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Paper } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const Profile = ({
  user: {
    credentials: {
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
    authUserTweets: [],
    authUserTweetsCount,
    loading,
    authenticated,
  },
}) => {
  const classes = useStyles();
  // const history = useHistory();
  // authorization
  const token = localStorage.getItem("user-token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
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
      <div className="profile">
        <div className="profile text-left">
          <div className="profile__header row">
            <div className="col-1">
              <GoBack></GoBack>
            </div>
            {"  "}
            <div className="col-4">
              <h2 className="ml-4">
                {first_name} {last_name}
              </h2>
              <b className="font-weight-lighter">
                {authUserTweetsCount} Tweets
              </b>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header position-relative min-vh-25 mb-7">
            <div className="bg-holder rounded-soft rounded-bottom-0"></div>
            <div className="avatar avatar-5xl avatar-profile">
              <img
                className="rounded-circle fit-block transform-o img-thumbnail img-fluid shadow-sm"
                src={
                  "http://localhost:8000/storage/users/profile/" +
                  profile_picture
                }
                alt={first_name + last_name + `'s profile picture`}
                width="200"
              />
            </div>
          </div>
          <div className="card-body">
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
              tweepName={
                authUserTweet.tweep.first_name +
                " " +
                authUserTweet.tweep.last_name
              }
              username={authUserTweet.tweep.handle}
              verified={true}
              text={authUserTweet.tweet_text}
              tweetTime={authUserTweet.created_at}
              avatar={
                "http://localhost:8000/storage/users/profile/" +
                authUserTweet.tweep.profile_picture
              }
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
