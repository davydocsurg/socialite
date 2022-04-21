import { forwardRef } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessMsg({
  openProfSucMsg,
  tweetSuccess,
  closeProfDetUpdateSucMsg,
  handleClose,
  showSuccess,
  sucMsg,
}) {
  return (
    <>
      <Snackbar
        open={openProfSucMsg | showSuccess | tweetSuccess}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {sucMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
