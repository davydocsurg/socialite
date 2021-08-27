import React, { useState } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import axios from "axios";
import HttpService from "../services/HttpServices";
// import HomeRoutes from "../routes/HomeRoutes";

function Sidebar() {
  let token = localStorage.getItem("user-token");
  let { path, url } = useRouteMatch();
  const http = new HttpService();
  const history = useHistory();

  const [signOutDet, setSignOutDet] = useState();

  // authorization

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const signOut = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/signout", signOutDet, {
        headers: headers,
      })
      .then(() => {
        localStorage.removeItem("user-token");
        history.push("/signin");
      })
      .catch((err) => {
        console.error(err);
      });
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

      <Link className="side_text" to="/home">
        <SidebarOption active Icon={HomeIcon} text="Home" />
      </Link>
      <SidebarOption Icon={SearchIcon} text="Explore" />
      {token !== null && token !== "" ? (
        <div className="">
          <Link className="side_text" to={`/notifications`}>
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
          </Link>
          <SidebarOption Icon={MailOutlineIcon} text="Messages" />
          <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
          <SidebarOption Icon={ListAltIcon} text="Lists" />
          <SidebarOption Icon={PermIdentityIcon} text="Profile" />
          <SidebarOption Icon={MoreHorizIcon} text="More" />
          {/* Button -> Tweet */}
          <Button variant="outlined" className="sidebar__tweet" fullWidth>
            Tweet
          </Button>

          <Button
            variant="contained"
            startIcon={<ExitToAppOutlinedIcon />}
            className="sidebar__signout"
            fullWidth
            onClick={signOut}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
}

export default Sidebar;
