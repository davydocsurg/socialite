import React, { Fragment } from "react";
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
import { makeStyles } from "@material-ui/core/styles";

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
    // credentials: {
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
    // },
    loading,
    authenticated,
  },
}) => {
  const classes = useStyles();

  return (
    <>
    <div class="card mb-3">
            <div class="card-header position-relative min-vh-25 mb-7">
              <div class="bg-holder rounded-soft rounded-bottom-0" style="background-image:url(../assets/img/generic/4.jpg);"></div>
              <div class="avatar avatar-5xl avatar-profile"><img class="rounded-circle img-thumbnail shadow-sm" src="../assets/img/team/2.jpg" alt="" width="200"></div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-8">
                  <h4 class="mb-1"> Anthony Hopkins<svg class="svg-inline--fa fa-check-circle fa-w-16 text-primary ml-1" data-toggle="tooltip" data-placement="right" title="" data-fa-transform="shrink-4 down-2" aria-labelledby="svg-inline--fa-title-b6Hq7Fvm2tCT" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" style="transform-origin: 0.5em 0.625em;" data-original-title="Verified"><title id="svg-inline--fa-title-b6Hq7Fvm2tCT">Verified</title><g transform="translate(256 256)"><g transform="translate(0, 64)  scale(0.75, 0.75)  rotate(0 0 0)"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" transform="translate(-256 -256)"></path></g></g></svg>
                  {/* <!-- <small class="fas fa-check-circle text-primary ml-1" data-toggle="tooltip" data-placement="right" title="Verified" data-fa-transform="shrink-4 down-2"></small> --> */}
                  </h4>
                  <h5 class="fs-0 font-weight-normal">Senior Software Engineer at Technext Limited</h5>
                  <p class="text-500">New York, USA</p><button class="btn btn-falcon-primary btn-sm px-3" type="button">Following</button><button class="btn btn-falcon-default btn-sm px-3 ml-2" type="button">Message</button>
                  <hr class="border-dashed my-4 d-lg-none">
                </div>
                <div class="col pl-2 pl-lg-3"><a class="media align-items-center mb-2" href="#"><svg class="svg-inline--fa fa-user-circle fa-w-16 fs-4 mr-2 text-700" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg=""><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path></svg>
                {/* <!-- <span class="fas fa-user-circle fs-4 mr-2 text-700"></span> --> */}
                    <div class="media-body">
                      <h6 class="mb-0">See followers (330)</h6>
                    </div>
                  </a><a class="media align-items-center mb-2" href="#"><img class="d-flex align-self-center mr-2" src="../assets/img/logos/g.png" alt="Generic placeholder image" width="30">
                    <div class="media-body">
                      <h6 class="mb-0">Google</h6>
                    </div>
                  </a><a class="media align-items-center mb-2" href="#"><img class="d-flex align-self-center mr-2" src="../assets/img/logos/apple.png" alt="Generic placeholder image" width="30">
                    <div class="media-body">
                      <h6 class="mb-0">Apple</h6>
                    </div>
                  </a><a class="media align-items-center mb-2" href="#"><img class="d-flex align-self-center mr-2" src="../assets/img/logos/hp.png" alt="Generic placeholder image" width="30">
                    <div class="media-body">
                      <h6 class="mb-0">Hewlett Packard</h6>
                    </div>
                  </a></div>
              </div>
            </div>
          </div>
      {/* <div className="profile text-left">
        <div className="profile__header ">
          <h2>Profile</h2>
        </div>
      </div> */}
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
//         <img
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

//       {website && (
//         <Fragment>
//           <LinkIcon>
//             <a href={website} target="_blank" rel="noopener noreferrer">
//               {" "}
//               {website}
//             </a>
//           </LinkIcon>
//         </Fragment>
//       )}

//       <CalendarToday>
//         {" "}
//         <span>Joined {moment(created_at).format("MMM YYY")}</span>
//       </CalendarToday>
//     </Paper>
//   ) : (
//     "login"
//   )
// ) : (
//   <p>loading...</p>
// )}
