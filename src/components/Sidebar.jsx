import React, { useState } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Icon } from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import axios from "axios";
import HttpService from "../services/HttpServices";
import { SignOutAction } from "../redux/actions/AuthActions";
import { useDispatch } from "react-redux";
// import HomeRoutes from "../routes/HomeRoutes";

function Sidebar() {
  let token = localStorage.getItem("user-token");
  let { path, url } = useRouteMatch();
  const http = new HttpService();
  const history = useHistory();
  const dispatch = useDispatch();

  const [signOutDet, setSignOutDet] = useState("");

  // authorization

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const location = useLocation();

  const signOut = (e) => {
    e.preventDefault();

    dispatch(SignOutAction(history));
    // axios
    //   .post("http://localhost:8000/api/signout", {
    //     headers: headers,
    //   })
    //   .then(() => {
    //     localStorage.removeItem("user-token");
    //     history.push("/signin");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const goHome = () => {
    location.href = "/home";
  };

  return (
    <div className="sidebar">
      <TwitterIcon
        className="sidebar__twitterIcon cursor-pointer"
        onClick={goHome}
      />

      <Link
        className={`side_text ${location.pathname.match("/home") && "active"}`}
        to="/home"
      >
        <SidebarOption Icon={HomeIcon} text="Home" />
      </Link>

      <Link
        className={`side_text ${
          location.pathname.match("/explore") && "active"
        }`}
        to={`/explore`}
      >
        <SidebarOption Icon={SearchIcon} text="Explore" />
      </Link>
      {token !== null && token !== "" ? (
        <div className="">
          <Link
            className={`side_text ${
              location.pathname.match("/notifications") && "active"
            }`}
            to={`/notifications`}
          >
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
          </Link>
          <SidebarOption Icon={MailOutlineIcon} text="Messages" />
          <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
          <SidebarOption Icon={ListAltIcon} text="Lists" />
          <Link
            className={`side_text ${
              location.pathname.match("/profile") && "active"
            }`}
            to={`/profile`}
          >
            <SidebarOption Icon={PermIdentityIcon} text="Profile" />
          </Link>
          <SidebarOption Icon={MoreHorizIcon} text="More" />
          {/* Button -> Tweet */}
          <Button
            variant="outlined"
            className="sidebar__tweet d-none d-lg-block px-7"
            // fullWidth
          >
            Tweet
          </Button>

          <Button variant="outlined" className="sidebar__tweet_icon d-lg-none">
            {/* <ExitToAppOutlinedIcon /> */}
            <Icon className="fas fa-feather-alt" color="white"></Icon>
          </Button>

          <Button
            variant="contained"
            startIcon={<ExitToAppOutlinedIcon />}
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
            <ExitToAppOutlinedIcon />
          </Button>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
}

export default Sidebar;
