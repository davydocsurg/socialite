import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessMsg({
  openProfSucMsg,
  closeProfDetUpdateSucMsg,
  sucMsg,
}) {
  return (
    <>
      <Snackbar
        open={openProfSucMsg}
        autoHideDuration={6000}
        onClose={closeProfDetUpdateSucMsg}
      >
        <Alert
          onClose={closeProfDetUpdateSucMsg}
          severity="success"
          sx={{ width: "100%" }}
        >
          {sucMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
