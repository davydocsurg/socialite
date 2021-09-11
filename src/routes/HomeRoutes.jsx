// import React, { useEffect, useState } from "react";
// import {
//   BrowserRouter as Router,
//   useRouteMatch,
//   useLocation,
//   useParams,
//   Switch,
//   Route,
//   Redirect,
//   useHistory,
// } from "react-router-dom";
// import Notifications from "../components/nests/Notifications";
// import Feed from "../components/Feed";

// const HomeRoutes = () => {
//   let location = useLocation();
//   let history = useHistory();
//   const token = localStorage.getItem("user-token");
//   let { path, url } = useRouteMatch();
//   let { tweetComp } = useParams();

//   return (
//     // <Router>
//     <Switch location={location}>
//       {/* <Route
//           exact
//           path={`${path}/:tweetComp`}
//           component={Notifications}
//         ></Route> */}
//       <Route exact path="/notifications" component={Notifications}></Route>
//     </Switch>
//     // </Router>
//   );
// };

// export default HomeRoutes;
