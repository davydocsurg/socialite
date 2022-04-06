import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/material";

export const TweepPhotos = ({
  authUserTweetsCount,
  authUserTweets,
  authTweepPhotos,
  profilePicsUrl,
  tweepPhotoUrl,
  handle,
}) => {
  return (
    <>
      <Box
        sx={{
          width: 500,
          height: "auto",
          bgcolor: "#e2e2dc",
          overflowY: "scroll",
        }}
      >
        <ImageList variant="masonry" cols={3} gap={2}>
          {authUserTweets.slice(0, 3).map((item) => (
            <ImageListItem key={item.tweet_photo}>
              {item.tweet_photo !== null && (
                <img
                  src={`${
                    tweepPhotoUrl + item.tweet_photo
                  }?w=248&fit=crop&auto=format`}
                  srcSet={`${item.tweet_photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={"@" + handle + " 's media"}
                  loading="lazy"
                />
              )}
            </ImageListItem>
          ))}
          {authUserTweets.slice(3, 6).map((item) => (
            <ImageListItem key={item.tweet_photo}>
              {item.tweet_photo !== null && (
                <img
                  src={`${
                    tweepPhotoUrl + item.tweet_photo
                  }?w=248&fit=crop&auto=format`}
                  srcSet={`${item.tweet_photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={"@" + handle + " 's media"}
                  loading="lazy"
                />
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      {/* <div className="card-group cursor-pointer">
        {authTweepPhotos > 2 && authTweepPhotos !== null
          ? authUserTweets.slice(0, 3).map((authUserTweet) => (
              <div className="card  bg-twitter-bg text-white">
                <div class="card-img-top">
                  {authUserTweet.tweet_photo !== null && (
                    <img
                      className="img-fluid tweepPhoto justify-content-space-between"
                      loading="lazy"
                      src={tweepPhotoUrl + authUserTweet.tweet_photo}
                      alt={"@" + handle + " 's media"}
                    />
                  )}
                </div>
              </div>
            ))
          : authUserTweets.slice(0, 2).map((authUserTweet) => (
              <div className="card  bg-twitter-bg text-white">
                <div class="card-img-top">
                  {authUserTweet.tweet_photo !== null && (
                    <img
                      className="img-fluid tweepPhoto justify-content-space-between"
                      loading="lazy"
                      src={tweepPhotoUrl + authUserTweet.tweet_photo}
                      alt={"@" + handle + " 's media"}
                    />
                  )}
                </div>
              </div>
            ))}
      </div>
      <div className="card-group cursor-pointer">
        {authTweepPhotos > 4 && authTweepPhotos !== null
          ? authUserTweets.slice(3, 6).map((authUserTweet) => (
              <div className="card  bg-twitter-bg text-white">
                <div class="card-img-top">
                  {authUserTweet.tweet_photo !== null && (
                    <img
                      className="img-fluid tweepPhoto justify-content-space-between"
                      loading="lazy"
                      src={tweepPhotoUrl + authUserTweet.tweet_photo}
                      alt={"@" + handle + " 's media"}
                    />
                  )}
                </div>
              </div>
            ))
          : authUserTweets.slice(3, 5).map((authUserTweet) => (
              <div className="card  bg-twitter-bg text-white">
                <div class="card-img-top">
                  {authUserTweet.tweet_photo !== null && (
                    <img
                      className="img-fluid tweepPhoto justify-content-space-between"
                      loading="lazy"
                      src={tweepPhotoUrl + authUserTweet.tweet_photo}
                      alt={"@" + handle + " 's media"}
                    />
                  )}
                </div>
              </div>
            ))}
      </div> */}
    </>
  );
};
