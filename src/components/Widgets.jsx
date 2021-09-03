import React from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
// import "../css/widget.css";

function Widgets() {
  return (
    <div className="widgets mt-2">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer mt-3">
        <h2 className="mb-2">What's happening</h2>
        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            No one knows when they begin, ideas don&#39;t come out fully formed,
            they only become clearer as you work on them. You just have to get
            started.
          </p>
          &mdash; David Chibueze 👨🏻‍💻 (@davydocsurg){" "}
          <a href="https://twitter.com/davydocsurg/status/1374156837323481092?ref_src=twsrc%5Etfw">
            March 23, 2021
          </a>
        </blockquote>{" "}
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        ></script>
        <TwitterTimelineEmbed
          sourceType="profile"
          // The preferred screen name goes next:
          screenName="WHO"
          // Style options goes here:
          options={{ height: 600 }}
        />
        <TwitterTweetEmbed tweetId={"1374156837323481092"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="davydocsurg"
          options={{ height: 400 }}
        />
        <TwitterShareButton
          url={"https://facebook.com/davydocsurg"}
          options={{ text: "#reactjs is awesome", via: "davydocsurg" }}
        />
      </div>
    </div>
  );
}

export default Widgets;
