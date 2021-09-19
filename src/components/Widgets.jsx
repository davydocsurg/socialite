import React from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
import AuthUserTweetPhoto from "./tweets/AuthUserTweetPhoto";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import { PropTypes } from "prop-types";
import { useLocation } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const Widgets = ({
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
    },
    authUserTweets,
    authUserTweetsCount,
    tweeps,
    loading,
    authenticated,
  },
}) => {
  const location = useLocation();
  const classes = useStyles();
  const profilePicsUrl = "http://localhost:8000/storage/users/profile/";

  return (
    <div className="widgets mt-2">
      <div className="widgets__input mb-4">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      {location.pathname.match(`/profile`) && authUserTweets && (
        <>
          <div className="container">
            <div className="ml-7">
              <FlipMove className="">
                <div className="card-group cursor-pointer">
                  {authUserTweets.slice(0, 3).map((authUserTweet) => (
                    <div
                      class="card bg-dark text-white"
                      //  style={{ maxWidth: "30rem" }}
                    >
                      <div class="card-img-top">
                        <img
                          class="img-fluid border-bottom-4 border-right-4"
                          loading="lazy"
                          src={
                            "http://localhost:8000/tweets/photos/" +
                            authUserTweet.tweet_photo
                          }
                          alt={handle + " 's media"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card-group cursor-pointer">
                  {authUserTweets.slice(3, 6).map((authUserTweet) => (
                    <div
                      class="card bg-dark text-white"
                      //  style={{ maxWidth: "30rem" }}
                    >
                      <div class="card-img-top">
                        <img
                          class="img-fluid border-bottom-4 border-right-4"
                          loading="lazy"
                          src={
                            "http://localhost:8000/tweets/photos/" +
                            authUserTweet.tweet_photo
                          }
                          alt={handle + " 's media"}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </FlipMove>

              <div className="mt-3">
                <Paper elevation={1}>
                  <div className="container py-3 ">
                    <h4 className="mb-4">You might Like</h4>
                    {tweeps.slice(0, 3).map((tweep) => (
                      <div className="tweeps-suggestions">
                        <div className="row p-2">
                          <div className="col-2">
                            <Avatar
                              src={profilePicsUrl + tweep.profile_picture}
                              className="shadow-sm mr-5 cursor-pointer"
                            />
                          </div>
                          <div className="col-7">
                            <h5>
                              {tweep.first_name} {tweep.last_name}
                            </h5>
                            <em>@{tweep.handle}</em>
                          </div>
                          <div className="col-2">
                            <Button className="followBtn text-white" fullWidth>
                              Follow
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Paper>
              </div>
            </div>
          </div>
        </>
      )}
      {/* {authUserTweets.slice(0, 6).map((authUserTweet) => (
      <AuthUserTweetPhoto
        // key={authUserTweet.slug}
        // tweepName={first_name + " " + last_name}
        username={handle}
        // verified={true}
        // text={authUserTweet.tweet_text}
        // tweetTime={authUserTweet.created_at}
        // avatar={
        //   "http://localhost:8000/storage/users/profile/" + profile_picture
        // }
        tweetImage={
          authUserTweet.tweet_photo
            ? "http://localhost:8000/tweets/photos/" +
              authUserTweet.tweet_photo
            : null
        }
      ></AuthUserTweetPhoto>
    ))} */}{" "}
      <div className="widgets__widgetContainer mt-3">
        <h2 className="mb-2">What's happening</h2>
        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            No one knows when they begin, ideas don&#39;t come out fully formed,
            they only become clearer as you work on them. You just have to get
            started.
          </p>
          &mdash; David Chibueze 👨🏻‍💻 (@davydocsurg){" "}
          <a href="https://twitter.com/davydocsurg/status/1374156837323481092?ref_src=twsrc%5Etfw">
            March 23, 2021
          </a>
        </blockquote>{" "}
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
        <TwitterTimelineEmbed
          sourceType="profile"
          // The preferred screen name goes next:
          screenName="WHO"
          // Style options goes here:
          options={{ height: 600 }}
        />
        <TwitterTweetEmbed tweetId={"1374156837323481092"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="davydocsurg"
          options={{ height: 400 }}
        />
        <TwitterShareButton
          url={"https://facebook.com/davydocsurg"}
          options={{ text: "#reactjs is awesome", via: "davydocsurg" }}
        />
      </div>
    </div>
  );
};

// export default Widgets;
Widgets.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Widgets);
