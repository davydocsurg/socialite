import React, { forwardRef, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PublishIcon from "@mui/icons-material/Publish";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import {
  LikeTweet,
  UnlikeTweet,
  FetchTweetsAction,
  RefreshTweetsAction,
} from "../../redux/actions/TweetActions";

const Tweet = forwardRef(
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
    const navigate = useNavigate();
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

      if (likesCount < 1) {
        setShowLikedBtn(false);
      }
      return ff;
    };

    const fetchTweet = () => {
      dispatch(fetchTweet());
    };

    const viewTweet = () => {
      navigate(`/tweet/${slug}`);
    };

    const handleLikeTweet = () => {
      dispatch(LikeTweet(slug));
      setTimeout(() => {
        setShowLikedBtn(true);
        checkLikes();
        dispatch(RefreshTweetsAction());
      }, 500);
    };

    const handleUnlikeTweet = () => {
      dispatch(UnlikeTweet(slug));
      setTimeout(() => {
        setShowLikedBtn(false);
        checkLikes();
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
            <div className="post__headerText row d-flex" onClick={viewTweet}>
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

          {token && (
            <div className="post__footer">
              {/* <ChatBubbleOutlineIcon fontSize="small" /> */}
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
          )}
        </div>
      </div>
    );
  }
);

Tweet.prototypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Tweet);
