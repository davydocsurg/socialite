import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessMsg({
  openProfSucMsg,
  tweetSuccess,
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
