import { Snackbar, MuiAlert } from "@material-ui/core";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorMsg({ openProfErrMsg, tweetErr, errMsg }) {
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
          {ErrMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
