import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import { IndexContext } from "../contexts/IndexContext";
import Home from "../pages/home";

export const IRoutes = () => {
  const { authenticated, CheckAuthMode } = useContext(IndexContext);

  useEffect(() => {
    // CheckAuthMode();
    // console.log("====================================");
    // console.log(authenticated);
    // console.log("====================================");
  }, [authenticated]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authenticated === true ? (
              <Navigate to="home" />
            ) : (
              <Navigate to="signin" />
            )
          }
        />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </>
  );
};

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(iRoutes);
export default IRoutes;
