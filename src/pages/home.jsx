import React from "react";
import Container from "@material-ui/core/Container";
// import { SignOutAction } from "../redux/actions/AuthActions";
// import { useDispatch } from "react-redux";
import {
  useHistory,
  useParams,
  useRouteMatch,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import Widgets from "../components/Widgets";
// import HomeRoutes from "../routes/HomeRoutes";
import Feed from "../components/Feed";
import Notifications from "../components/nests/Notifications";

const Home = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // let { path, url } = useRouteMatch();
  // let { tweetComp } = useParams();

  return (
    // <Container className="m-0" component="main" className="app" maxWidth="xl">
    <>
      <Feed></Feed>
      {/* </Container> */}
    </>
  );
};

export default Home;
