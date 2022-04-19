import React, { useState, useEffect } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import {
  Avatar,
  Button,
  Modal,
  TextField,
  Icon,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PhotoOutlinedIcon from "@material-ui/icons/PhotoOutlined";
import GifOutlinedIcon from "@material-ui/icons/GifOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import axios from "axios";
import HttpService from "../services/HttpServices";
import { getUserData, SignOutAction } from "../redux/actions/AuthActions";
import { useDispatch, connect, useSelector } from "react-redux";
import {
  Bookmarks,
  Explore,
  Home,
  Lists,
  Messages,
  More,
  Notifications,
  Profile,
} from "../utils/baseIcons/sideBarIcons";
import { SignOutService } from "../services/AuthServices";
import { Endpoints } from "../api/axios";
import { TweetModal } from "./tweets/TweetModal";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: "55ch",
    },
  },
}));

const Sidebar = () => {
  let { path, url } = useRouteMatch();
  const http = new HttpService();
  const history = useHistory();
  const dispatch = useDispatch();
  const [openTweetModal, setOpenTweetModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const classes = useStyles();

  const user = useSelector((state) => state.user.credentials);
  const authenticated = useSelector((state) => state.user.authenticated);

  const profilePicsUrl = "http://localhost:8000/profile/photos/";

  const location = useLocation();

  const openTweetBox = () => {
    setOpenTweetModal(true);
  };

  const closeTweetBox = () => {
    setOpenTweetModal(false);
    // dispatch(CloseTweetBox());
  };

  const closeSuccess = () => {
    setShowSuccess(false);
  };

  const closeErr = () => {
    setOpenErr(false);
  };

  // ************** tweet box **************
  const [tweets, setTweets] = useState([]);

  // tweet box begins

  // tweets
  const [tweetText, setTweet] = useState("");

  const [tweetImageF, setTweetImage] = useState("");

  const [tweetErrors, setTweetErrors] = useState({
    tweetErrorMsg: {
      tweet_text: "",
      tweet_photo: "",
    },
  });

  const [tweetImageRemover, setTweetImageRemover] = useState(false);

  const handleChange = (e) => {
    setTweet(e.target.value);

    // clear error message
    setTweetErrors({
      ...tweetErrors,
      tweetErrorMsg: {},
    });
  };

  const handleFileInput = () => {
    const fileInp = document.getElementById("tweet_photo");
    fileInp.click();
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    let limit = 1024 * 1024 * 2;
    if (file["size"] > limit) {
      setTweetImage({
        ...tweetImageF,
        tweetImageF: "",
      });
      alert("File is too large! It must be less than 2MB.");

      return false;
    }

    reader.onloadend = (file) => {
      setTweetImage(reader.result);
    };
    reader.readAsDataURL(file);
    setTweetImageRemover(true);
  };

  const goHome = () => {
    location.href = "/home";
  };

  const signOut = async (e) => {
    e.preventDefault();

    setSpinner(true);
    // dispatch(SignOutAction(history));

    try {
      const res = await SignOutService();
      if (res.data.status == 400 && res.data.success === false) {
        setOpen(true);
      } else if (res.data.status == 200 && res.data.success === true) {
        setSpinner(false);
        setShowSuccess(true);
        // setTimeout(() => {
        // }, 1800);
        history.push(Endpoints.signIn);
      }
    } catch (err) {
      console.error(err);
      setSpinner(true);
    }
  };

  return (
    <>
      <TweetModal
        openTweetModal={openTweetModal}
        closeTweetBox={closeTweetBox}
      />

      <div className="sidebar">
        <TwitterIcon
          className="sidebar__twitterIcon cursor-pointer"
          onClick={goHome}
        />

        <Link
          className={`side_text ${
            location.pathname.match("/home") && "active"
          }`}
          to="/home"
        >
          <SidebarOption Icon={Home} text="Home" />
        </Link>

        <Link
          className={`side_text ${
            location.pathname.match("/explore") && "active"
          }`}
          to={`/explore`}
        >
          <SidebarOption Icon={Explore} text="Explore" />
        </Link>
        {authenticated !== null && authenticated !== "" ? (
          <div className="">
            <Link
              className={`side_text ${
                location.pathname.match("/notifications") && "active"
              }`}
              to={`/notifications`}
            >
              <SidebarOption Icon={Notifications} text="Notifications" />
            </Link>
            <SidebarOption Icon={Messages} text="Messages" />
            <SidebarOption Icon={Bookmarks} text="Bookmarks" />
            <SidebarOption Icon={Lists} text="Lists" />
            {/* <Link
            className={`side_text ${
              location.pathname.match(`/${handle}`) && "active"
            }`}
            to={`/${handle}`}
          > */}
            <Link
              className={`side_text ${
                location.pathname.match(`/${user.handle}`) && "active"
              }`}
              to={`/${user.handle}`}
            >
              <SidebarOption Icon={Profile} text="Profile" />
            </Link>
            <SidebarOption Icon={More} text="More" />
            {/* Button -> Tweet */}
            <Button
              variant="outlined"
              className="sidebar__tweet d-none d-lg-block px-7"
              onClick={openTweetBox}
            >
              Tweet
            </Button>

            <Button
              variant="outlined"
              className="sidebar__tweet_icon d-lg-none"
              onClick={openTweetBox}
            >
              {/* <ExitToAppOutlinedIcon /> */}
              <Icon className="fas fa-feather-alt"></Icon>
            </Button>

            <Button
              variant="contained"
              startIcon={
                spinner ? (
                  <CircularProgress sx={{ pl: 3 }} color="inherit" size={20} />
                ) : (
                  <ExitToAppOutlinedIcon />
                )
              }
              className="sidebar__signout d-none d-lg-inline-block"
              // fullWidth
              onClick={signOut}
            >
              Sign Out
            </Button>

            <Button
              variant="contained"
              className="sidebar__signout-md d-lg-none "
              // fullWidth
              onClick={signOut}
            >
              {spinner ? (
                <CircularProgress sx={{ pl: 3 }} color="inherit" size={20} />
              ) : (
                <ExitToAppOutlinedIcon />
              )}
            </Button>
          </div>
        ) : (
          <div className=""></div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
