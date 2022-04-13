import React, { createRef, forwardRef, useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import {
  LikeTweet,
  UnlikeTweet,
  FetchTweetsAction,
  RefreshTweetsAction,
  FetchTweet,
} from "../../redux/actions/TweetActions";

const Tweet = forwardRef(
  ({
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
  }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const token = localStorage.getItem("user-token");
    const [showLikedBtn, setShowLikedBtn] = useState(false);
    const tweetRef = createRef();

    useEffect(() => {
      // fetchTweet();
      checkLikes();
    }, [likesCount]);

    // const user = useSelector((state) => state.user.credentials);
    // const allTweets = useSelector((state) => state.tweetReducer.allTweets);

    const checkLikes = () => {
      if (likesCount < 1) {
        setShowLikedBtn(false);
      }
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
      dispatch(FetchTweet(slug));
      // setTimeout(() => {
      // }, 200);
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
      <div className="post" ref={tweetRef}>
        <div className="post__avatar">
          <Avatar src={avatar} className="shadow-lg" />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText row d-flex">
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
            {/* <Link to={slug}> */}
            <div className="post__headerDescription" onClick={viewTweet}>
              <p>{text}</p>
            </div>
          </div>
          {tweetImage ? (
            <img src={tweetImage} alt="" className="py-2 img-fluid" />
          ) : null}

          {/* </Link> */}
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

export default Tweet;
