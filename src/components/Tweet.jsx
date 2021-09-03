import React, { forwardRef } from "react";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import moment from "moment";

const Tweet = forwardRef(
  (
    { tweepName, username, verified, text, tweetImage, avatar, tweetTime },
    ref
  ) => {
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} className="shadow-lg" />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText row d-flex">
              <h3 className="col-lg-10 col-md-8">
                {tweepName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                </span>
              </h3>

              <div className="tweet_time col-lg-2 col-md-4">
                <p>{moment(tweetTime, "YYYYMMDD").fromNow()}</p>
              </div>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          {tweetImage ? (
            <img src={tweetImage} alt="" className="py-2 img-fluid" />
          ) : null}
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Tweet;
