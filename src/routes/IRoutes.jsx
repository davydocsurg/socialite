import React, { useEffect, useDispatch } from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
// pages
import Home from "../pages/home";
import Explore from "../pages/Explore";
import Messages from "../pages/Messages";
import Bookmarks from "../pages/Bookmarks";
import Notifications from "../pages/Notfications";
import { useAuthContext } from "../contexts/AuthContext";

export const IRoutes = () => {
  const { authenticated } = useAuthContext();

  // const dispatch = useDispatch();
  useEffect(() => {
    console.log("====================================");
    console.log(authenticated);
    console.log("====================================");
  }, [authenticated]);

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            authenticated === true ? (
              <Navigate to="home" />
            ) : (
              <Navigate to="signin" />
            )
          }
        ></Route>
        <Route index path="home" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="messages" element={<Messages />} />
        <Route path="bookmarks" element={<Bookmarks />} />

        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(iRoutes);
export default IRoutes;
