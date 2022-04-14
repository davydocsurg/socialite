import { Avatar } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FetchTweet } from "../../redux/actions/TweetActions";
import HttpService from "../../services/HttpServices";
import { Comment, Like, Retweet } from "../../utils/baseIcons/tweetCompIcons";
import GoBack from "../constants/GoBack";

const TweetDetails = () => {
  const http = new HttpService();

  // const dispatch = useDispatch();
  let { slug } = useParams();
  //console.log(slug);
  // const tweetDetails = useSelector((state) => state.tweetReducer.tweetDetails);
  const [showLikedBtn, setShowLikedBtn] = useState(false);
  const [tweetDetails, setTweetDetails] = useState({});

  const user = useSelector((state) => state.user);
  // const loading = useSelector((state) => state.UI.loading);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("tweetDetails");
    FetchTweet();

    // dispatch(FetchTweet(slug));
  }, [slug]);

  const FetchTweet = async () => {
    setLoading(true);
    await axios
      .get(http.url + `/tweet/${slug}`)
      .then((res) => {
        console.log(res.data);
        setTweetDetails(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err, "erroooor");
        setLoading(false);
      });
  };

  const profilePicsUrl = "http://localhost:8000/profile/photos/";
  const tweetPhotoUrl = "http://localhost:8000/tweets/photos/";

  let authenticated = user.authenticated;

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

      {loading && tweetDetails !== null ? (
        <div className="mb-auto mt-5 text-center mx-auto text-twitter-color">
          <i className="spinner-border spinner-border-md "></i>
        </div>
      ) : (
        <div className="post">
          <div className="post__avatar">
            <Avatar
              src={profilePicsUrl + tweetDetails.tweep.profile_picture}
              className="shadow-sm"
            />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div className="post__headerText row d-flex">
                <h3 className="col-lg-9 col-md-8">
                  {tweetDetails.tweep.first_name +
                    " " +
                    tweetDetails.tweep.last_name}{" "}
                  <span className="post__headerSpecial">
                    {tweetDetails.tweep.verified ? (
                      <small
                        className="fas fa-check-circle text-twitter-color ml-5"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Verified"
                        data-fa-transform="shrink-4 down-2"
                      ></small>
                    ) : null}{" "}
                    @{tweetDetails.tweep.handle}
                  </span>
                </h3>

                <div className="tweet_time col-lg-3 col-md-4">
                  <b>{moment(tweetDetails.created_at).fromNow()}</b>
                </div>
              </div>
              <div className="post__headerDescription">
                <p>{tweetDetails.tweet_text}</p>
              </div>
            </div>
            {tweetPhotoUrl + tweetDetails.tweet_photo ? (
              <img
                src={tweetPhotoUrl + tweetDetails.tweet_photo}
                alt=""
                className="py-2 img-fluid"
              />
            ) : null}

            {/* {authenticated && (
              <div className="post__footer">

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
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetDetails;
