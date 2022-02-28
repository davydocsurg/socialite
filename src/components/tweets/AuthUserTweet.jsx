import React, { forwardRef, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LikeTweet,
  UnlikeTweet,
  FetchTweetsAction,
  RefreshTweetsAction,
  RefreshAuthUser,
} from "../../redux/actions/TweetActions";

const AuthUserTweet = forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("user-token");
    const [showLikedBtn, setShowLikedBtn] = useState(false);

    useEffect(() => {
      checkLikes();
    }, []);

    const checkLikes = () => {
      const compAuthId = (value, index, array) => {
        value !== authUserId ? setShowLikedBtn(false) : setShowLikedBtn(true);
      };
      let ff = tweepLikeId.filter(compAuthId);
      return ff;
    };

    const viewTweet = () => {
      navigate(`/tweet/${slug}`);
    };

    const handleLikeTweet = () => {
      dispatch(LikeTweet(slug));
      setTimeout(() => {
        setShowLikedBtn(true);
        dispatch(RefreshAuthUser());
      }, 500);
    };

    const handleUnlikeTweet = () => {
      dispatch(UnlikeTweet(slug));
      setTimeout(() => {
        setShowLikedBtn(false);
        dispatch(RefreshAuthUser());
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
