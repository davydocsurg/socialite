import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import Tweet from "./Tweet";
import FlipMove from "react-flip-move";
import axios from "axios";
import HttpService from "../services/HttpServices";
import { Link } from "react-router-dom";

function Feed(props) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweetsFromServer = () => {
      const http = new HttpService();
      let tweetsUrl = "tweets";

      return http
        .getData(tweetsUrl)
        .then((res) => {
          setTweets(res);
        })
        .catch((err) => {
          console.error(err);
        });

      // axios
      //   .get("http:localhost:8000/api/tweets")
      //   .then((res) => {
      //     setTweets(res);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    };
    fetchTweetsFromServer();

    return () => {
      fetchTweetsFromServer();
    };
  }, [tweets.tweet_text]);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])

  const token = localStorage.getItem("user-token");

  return (
    <div className="feed mt-0 containe text-left">
      {/* <HomeRoutes></HomeRoutes> */}
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      {token !== null && token !== "" ? (
        <TweetBox></TweetBox>
      ) : (
        <div className="container">
          <div className="card mt-3">
            <div className="card-body">
              <Link to="/signin">
                <h4 className="text-center">Login to tweet</h4>
              </Link>
            </div>
          </div>
        </div>
      )}
      <FlipMove>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.slug}
            tweepName={tweet.tweep.first_name + " " + tweet.tweep.last_name}
            username={tweet.tweep.handle}
            verified={true}
            text={tweet.tweet_text}
            avatar={
              "http://localhost:8000/storage/users/profile/" +
              tweet.tweep.profile_picture
            }
            tweetImage={
              tweet.tweet_photo
                ? "http://localhost:8000/storage/tweets/photos/" +
                  tweet.tweet_photo
                : null
            }
          ></Tweet>
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
