import { Avatar } from "@mui/material";
import moment from "moment";
import React from "react";
import {
  Comment,
  Like,
  Retweet,
  Share,
} from "../../utils/baseIcons/tweetCompIcons";

export const AuthUserTweets = ({
  tweepName,
  slug,
  username,
  verified,
  text,
  tweetImage,
  avatar,
  tweetTime,
  tweepLikeId,
  likesCount,
  authUserId,
  authenticated,
}) => {
  return (
    <>
      <div className="post">
        <div className="post__avatar">
          <Avatar src={avatar} className="shadow-sm" />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div
              className="post__headerText row mr-auto justify-content-between"
              // onClick={viewTweet}
            >
              <h3 className="col-lg-9 col-md-6">
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

              <div className="tweet_time col-lg-3 col-md-6">
                <b className="float-end">{moment(tweetTime).fromNow()}</b>
              </div>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          {tweetImage ? (
            <img src={tweetImage} alt="" className="py-2 img-fluid" />
          ) : null}

          {authenticated && (
            <div className="post__footer">
              <Comment />
              <Retweet />
              <Like />
              <Share />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
