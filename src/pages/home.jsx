import React from "react";
import Container from "@material-ui/core/Container";
// import { SignOutAction } from "../redux/actions/AuthActions";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Home = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  let BaseApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
  });
  const token = localStorage.getItem("user-token");

  const signOut = (e) => {
    e.preventDefault();
    let Api = function () {
      // let token = localStorage.getItem("token");

      if (token) {
        BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      return BaseApi;
    };

    Api()
      .post("/signout")
      .then(() => {
        localStorage.removeItem("user-token");
        history.push("/");
      })
      .catch((err) => {});
    // dispatch(SignOutAction());
  };

  return (
    <Container component="main" maxWidth="xl">
      <h1 className="">Home</h1>
      {token !== null && token !== "" ? (
        <div className="">logged in</div>
      ) : (
        <div className="">logged out</div>
      )}

      <button className="btn btn-dark" onClick={signOut}>
        Sign Out
      </button>
    </Container>
  );
};

export default Home;
