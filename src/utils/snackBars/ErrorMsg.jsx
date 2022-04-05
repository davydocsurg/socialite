import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorMsg({
  openProfErrMsg,
  closeProfDetUpdateErrMsg,
  errMsg,
}) {
  return (
    <>
      <Snackbar
        open={openProfErrMsg}
        autoHideDuration={6000}
        onClose={closeProfDetUpdateErrMsg}
      >
        <Alert
          onClose={closeProfDetUpdateErrMsg}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
