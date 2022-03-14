import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// mui
import { Avatar, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// libs
import FlipMove from "react-flip-move";
import axios from "axios";
import HttpService from "../services/HttpServices";

// mui icons
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import { SuccessSnackBar } from "../utils/SnackBars";

// components
import TweetBox from "./tweets/TweetBox";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Feed = () => {
  // const [openTweetSuccessMessage, set0penTweetSuccessMessage] = useState(false);
  // const [closeTweetSuccessMessage, setCloseTweetSuccessMessage] = useState(false);

  const handleCloseTM = () => {
    setOPenTweetSuccessMessage(false);
  };

  const handleOpenTM = () => {
    setOPenTweetSuccessMessage(true);
  };

  return (
    <div>
      {/* tweet success message */}
      {/* <Snackbar
        open={openTweetSuccessMessage}
        autoHideDuration={6000}
        onClose={closeTweetSuccessMessage}
      >
        <Alert onClose={closeTweetSuccessMessage} severity="success">
          Tweet sent!
        </Alert>
      </Snackbar> */}

      {/* <SuccessSnackBar
        openTweetSuccessMessage={handleOpenTM}
        handleCloseTM={handleCloseTM}
      /> */}

      <TweetBox></TweetBox>
    </div>
  );
};

export default Feed;
