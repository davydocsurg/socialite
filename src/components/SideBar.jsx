import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// components
import SideBarOption from "./SideBarOption";

// mui
import { Avatar, Button, Modal, TextField, Icon } from "@mui/material";
// import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
// import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
// import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
// import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
// import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Fab from "@mui/material/Fab";

// mui icons
// import TwitterIcon from "@mui/icons-material/Twitter";
// import HomeIcon from "@mui/icons-material/Home";
// import SearchIcon from "@mui/icons-material/Search";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
// context && services
import axios from "axios";
import HttpService from "../services/HttpServices";
import {
  Bookmarks,
  Explore,
  Home,
  Lists,
  Messages,
  More,
  Notifications,
  Profile,
  Right,
  Twitter,
} from "../utils/baseIcons/sideBarIcons";
import { useAuthContext } from "../contexts/AuthContext";
import { TweetModal } from "./tweets/TweetModal";
import { useTweetContext } from "../contexts/TweetContext";

const SideBar = () => {
  const http = new HttpService();
  const navigate = useNavigate();
  const location = useLocation();

  const { SignOut, credentials } = useAuthContext();
  const { closeTweetModal, openTweetModal, handleTweetModal } =
    useTweetContext();

  const SignMeOut = (e) => {
    e.preventDefault();
    SignOut();
  };

  // funcs

  return (
    <>
      <TweetModal
      // openTweetModal={openTweetModal}
      // closeTweetModal={closeTweetModal}
      ></TweetModal>
      <div className="sidebar">
        <Twitter className="sidebar__twitterIcon cursor-pointer" />

        <Link
          className={`side_text ${
            location.pathname.match("/home") && "active"
          }`}
          to="/home"
        >
          <SideBarOption Icon={Home} text="Home" />
        </Link>

        <Link
          className={`side_text ${
            location.pathname.match("/explore") && "active"
          }`}
          to={`/explore`}
        >
          <SideBarOption Icon={Explore} text="Explore" />
        </Link>

        <Link
          className={`side_text ${
            location.pathname.match("/notifications") && "active"
          }`}
          to={`/notifications`}
        >
          <SideBarOption Icon={Notifications} text="Notifications" />
        </Link>

        <SideBarOption Icon={Messages} text="Messages" />
        <SideBarOption Icon={Bookmarks} text="Bookmarks" />
        <SideBarOption Icon={Lists} text="Lists" />

        <Link
          className={`side_text ${
            location.pathname.match(`/${credentials.handle}`) && "active"
          }`}
          to={`/${credentials.handle}`}
        >
          <SideBarOption Icon={Profile} text="Profile" />
        </Link>
        <SideBarOption Icon={More} text="More" />

        <div className="mt-4 mx-auto">
          <Fab
            variant="extended"
            onClick={handleTweetModal}
            // size="medium"
            color="primary"
            // aria-label="add"
          >
            <Icon className="fas fa-feather-alt"></Icon>
            <span className="d-none d-lg-block p-lg-2"> Tweet</span>
          </Fab>
        </div>

        <div className="mt-7 mx-auto" onClick={SignMeOut}>
          <Fab variant="extended">
            <LogoutIcon />
            <span className="d-none d-lg-block p-lg-2"> Sign Out</span>
          </Fab>
        </div>
      </div>
    </>
  );
};

export default SideBar;
