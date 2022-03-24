import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// components
import SideBarOption from "./SideBarOption";

// mui
import { Avatar, Button, Modal, TextField, Icon } from "@mui/material";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";

// context && services
import axios from "axios";
import HttpService from "../services/HttpServices";
import {
  Bookmarks,
  Explore,
  Home,
  Lists,
  Messages,
  Notifications,
  Profile,
} from "../utils/baseIcons/sideBarIcons";

const SideBar = () => {
  const http = new HttpService();
  const navigate = useNavigate();
  const location = useLocation();

  // funcs

  return (
    <>
      <div className="sidebar">
        <TwitterIcon className="sidebar__twitterIcon cursor-pointer" />

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
            // location.pathname.match(`/${handle}`) && "active"
            location.pathname.match(`/profile`) && "active"
          }`}
          // to={`/${handle}`}
          to="/profile"
        >
          <SideBarOption Icon={Profile} text="Profile" />
        </Link>
        <SideBarOption Icon={MoreHorizIcon} text="More" />
      </div>
    </>
  );
};

export default SideBar;
