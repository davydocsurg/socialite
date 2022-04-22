import { forwardRef } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorMsg({ visible, closeSnackBar, errMsg }) {
  return (
    <>
      <Snackbar open={visible} autoHideDuration={6000} onClose={closeSnackBar}>
        <Alert onClose={closeSnackBar} severity="error" sx={{ width: "100%" }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
