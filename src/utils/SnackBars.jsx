import * as React from "react";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SuccessSnackBar = ({ openTweetSuccessMessage, handleCloseTM }) => {
  return (
    <>
      <Snackbar
        open={openTweetSuccessMessage}
        autoHideDuration={6000}
        onClose={handleCloseTM}
      >
        <Alert
          onClose={handleCloseTM}
          severity="success"
          sx={{ width: "100%" }}
        >
          Tweet sent!
        </Alert>
      </Snackbar>
    </>
  );
};
