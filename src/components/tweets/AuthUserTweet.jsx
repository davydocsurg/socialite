import React, { forwardRef, useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LikeTweet,
  UnlikeTweet,
  FetchTweetsAction,
  RefreshTweetsAction,
} from "../../redux/actions/TweetActions";

const AuthUserTweet = forwardRef(
  (
    {
      tweepName,
      username,
      verified,
      text,
      tweetImage,
      avatar,
      tweetTime,
      tweepLikeId,
      likesCount,
    },
    ref
  ) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const token = localStorage.getItem("user-token");
    const [showLikedBtn, setShowLikedBtn] = useState(false);

    useEffect(() => {
      // fetchTweet();
      checkLikes();
    }, []);

    const checkLikes = () => {
      const compAuthId = (value, index, array) => {
        value !== authUserId ? setShowLikedBtn(false) : setShowLikedBtn(true);
      };
      let ff = tweepLikeId.filter(compAuthId);
      return ff;
    };

    const fetchTweet = () => {
      dispatch(fetchTweet());
    };

    const viewTweet = () => {
      history.push(`/tweet/${slug}`);
    };

    const handleLikeTweet = () => {
      dispatch(LikeTweet(slug));
      setTimeout(() => {
        setShowLikedBtn(true);
        dispatch(RefreshTweetsAction());
      }, 500);
    };

    const handleUnlikeTweet = () => {
      dispatch(UnlikeTweet(slug));
      setTimeout(() => {
        setShowLikedBtn(false);
        dispatch(RefreshTweetsAction());
      }, 500);
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} className="shadow-lg" />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText row d-flex">
              <h3 className="col-lg-9 col-md-8">
                {tweepName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                </span>
              </h3>

              <div className="tweet_time col-lg-3 col-md-4">
                <b>{moment(tweetTime).fromNow()}</b>
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
            </div>{" "}
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default AuthUserTweet;
