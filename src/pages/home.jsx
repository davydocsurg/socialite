import React from "react";
// mui
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
// mui icons
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Home = () => {
  return (
    <>
      <div className="feed mt-0 text-left">
        {/* <HomeRoutes></HomeRoutes> */}
        <div className="feed__header row overflow-hidden">
          <div className="col-11">
            <h2 className="mr-auto">Home</h2>
          </div>
          <div className="col-1 ml-auto text-right">
            <FlareOutlinedIcon className="active text-right float-right ">
              {" "}
            </FlareOutlinedIcon>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
