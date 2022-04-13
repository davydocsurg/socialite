import { Avatar } from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchTweet } from "../../redux/actions/TweetActions";
import { Comment, Like, Retweet } from "../../utils/baseIcons/tweetCompIcons";
import GoBack from "../constants/GoBack";

const TweetDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(FetchTweet());
    // return () => {
    //   dispatch(FetchTweet());
    // };
  }, []);

  const tweetDetails = useSelector((state) => state.tweetReducer.tweetDetails);
  const user = useSelector((state) => state.user);
  const loading = useSelector((state) => state.UI.loading);

  const profilePicsUrl = "http://localhost:8000/profile/photos/";
  const tweetPhotoUrl = "http://localhost:8000/tweets/photos/";

  let avatar = tweetDetails.tweep.profile_picture;
  let tweepName =
    tweetDetails.tweep.first_name + " " + tweetDetails.tweep.last_name;
  let verified = tweetDetails.tweep.verified;
  let handle = tweetDetails.tweep.handle;
  // tweet
  let text = tweetDetails.tweet_text;
  let tweetTime = tweetDetails.created_at;
  let authenticated = user.authenticated;
  let tweetImage = tweetPhotoUrl + tweetDetails.tweet_photo;

  return (
    <div className="singleTweet text-left">
      <div className="singleTweet__header row">
        <div className="col-1">
          <GoBack></GoBack>
        </div>
        <div className="col-4">
          <h2 className="ml-4">Tweet</h2>
        </div>
      </div>

      {loading ? (
        <div className="mb-auto mt-5 text-center mx-auto text-twitter-color">
          <i className="spinner-border spinner-border-md "></i>
        </div>
      ) : (
        <div className="post">
          <div className="post__avatar">
            <Avatar src={profilePicsUrl + avatar} className="shadow-sm" />
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
                    @{handle}
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

            {authenticated && (
              <div className="post__footer">
                {/* <ChatBubbleOutlineIcon fontSize="small" /> */}
                <Comment />
                <Retweet fontSize="small" />
                <div className="">
                  {showLikedBtn ? (
                    <i
                      className="fas fa-heart text-danger"
                      onClick={handleUnlikeTweet}
                    ></i>
                  ) : (
                    <Like fontSize="small" onClick={handleLikeTweet} />
                  )}{" "}
                  {likesCount > 0 && likesCount}
                </div>
                <i className="fas fa-share-alt"></i>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetDetails;
