import React, { Component } from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/signIn";

export const IRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="signin" />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(iRoutes);
export default IRoutes;
