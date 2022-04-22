import { forwardRef } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessMsg({ visible, closeSnackBar, sucMsg }) {
  return (
    <>
      <Snackbar open={visible} autoHideDuration={6000} onClose={closeSnackBar}>
        <Alert
          onClose={closeSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {sucMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
