import React, { forwardRef } from "react";
import { isMoment } from "moment";
import { Avatar } from "@mui/material";

export const Tweet = forwardRef(
  (
    {
      tweepName,
      username,
      verified,
      text,
      tweetImage,
      avatar,
      tweetTime,
      likesCount,
      tweepLikeId,
      authUserId,
      slug,
    },
    ref
  ) => {
    return (
      <>
        <div className="post" ref={ref}>
          <div className="post__avatar">
            <Avatar src={avatar} className="shadow-lg" />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div
                className="post__headerText row d-flex"
                // onClick={viewTweet}
              >
                <h3 className="col-lg-9 col-md-8">
                  {tweepName}{" "}
                  <span className="post__headerSpecial">
                    {verified ? (
                      <small
                        className="fas fa-check-circle text-twitter-color ml-5"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Verified"
                        data-fa-transform="shrink-4 down-2"
                      ></small>
                    ) : null}{" "}
                    @{username}
                  </span>
                </h3>

                <div className="tweet_time col-lg-3 col-md-4">
                  <b>{isMoment(tweetTime).fromNow()}</b>
                </div>
              </div>
              <div className="post__headerDescription">
                <p>{text}</p>
              </div>
            </div>
            {tweetImage ? (
              <img src={tweetImage} alt="" className="py-2 img-fluid" />
            ) : null}

            {/* <ChatBubbleOutlineIcon fontSize="small" /> */}
            {/* {authenticated && (
            <div className="post__footer">
              <i className="far fa-comment"></i>
              <RepeatIcon fontSize="small" />
              <div className="">
                {showLikedBtn ? (
                  <i
                    className="fas fa-heart text-danger"
                    onClick={handleUnlikeTweet}
                  ></i>
                ) : (
                  <FavoriteBorderIcon
                    fontSize="small"
                    onClick={handleLikeTweet}
                  />
                )}{" "}
                {likesCount > 0 && likesCount}
              </div>
              <i className="fas fa-share-alt"></i>
            </div>
          )} */}
          </div>
        </div>
      </>
    );
  }
);
