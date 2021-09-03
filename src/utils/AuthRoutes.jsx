import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoutes = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? (
        <Redirect to="/home"></Redirect>
      ) : (
        <Component {...props} />
      )
    }
  ></Route>
);

AuthRoutes.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.userAuth.authenticated,
  };
};
// export default AuthRoutes;
export default connect(mapStateToProps)(AuthRoutes);
