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
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

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
    loading,
    authenticated,
  },
}) => {
  const location = useLocation();

  return (
    <div className="widgets mt-2">
      <div className="widgets__input mb-4">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      {location.pathname.match(`/profile`) && authUserTweets && (
        <>
          <FlipMove className="container mx-auto">
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
        </>
      )}
      <div className="">
        <Grid container spacing={2}>
          {[lightTheme, darkTheme].map((theme, index) => (
            <Grid item xs={6} key={index}>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "background.default",
                    display: "grid",
                    gridTemplateColumns: { md: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
                    <Item key={elevation} elevation={elevation}>
                      {`elevation=${elevation}`}
                    </Item>
                  ))}
                </Box>
              </ThemeProvider>
            </Grid>
          ))}
        </Grid>
      </div>
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
