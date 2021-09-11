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
    credentials: {
      firstName,
      lastName,
      profilePics,
      email,
      handle,
      isVerified,
      createdAt,
      bio,
      website,
      location,
    },
    loading,
    authenticated,
  },
}) => {
  const classes = useStyles();

  let profileMarkUp = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className="profile-pics">
          <img src={profilePics} alt={firstName + "" + lastName} srcset="" />
        </div>
        <div className="profile-details">
          <MUILink
            component={Link}
            to={`/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MUILink>
        </div>
        {location && (
          <Fragment>
            <LocationOn color="primary" />
            {location}
          </Fragment>
        )}

        {bio && <Typography variant="body2">{bio}</Typography>}

        {website && (
          <Fragment>
            <LinkIcon>
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
            </LinkIcon>
          </Fragment>
        )}

        <CalendarToday>
          {" "}
          <span>Joined {moment(createdAt).format("MMM YYY")}</span>
        </CalendarToday>
      </Paper>
    ) : (
      "login"
    )
  ) : (
    <p>loading...</p>
  );

  return <></>;
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
