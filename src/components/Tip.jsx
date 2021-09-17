import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";

function LightBulbIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(6, 0, 3),
      //fontFamily: "'Open Sans', Arial, sans-serif",
      //letterSpacing: 'normal'
    },
    lightBulb: {
      verticalAlign: "middle",
      marginRight: theme.spacing(1),
    },
    strong: {
      fontWeight: "bold",
      color: theme.palette.secondary.main,
    },
  })
);

export function ProTip() {
  const classes = useStyles({});
  return (
    <Typography className={classes.root} color="textSecondary">
      <LightBulbIcon className={classes.lightBulb} />
      Pro tip: See more{" "}
      <Link href="https://material-ui.com/getting-started/templates/">
        templates
      </Link>{" "}
      on the Material-UI documentation.
    </Typography>
  );
}

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Material UI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
      {/* <svg
                    className="svg-inline--fa fa-check-circle fa-w-16 text-primary ml-1"
                    data-toggle="tooltip"
                    data-placement="right"
                    title=""
                    data-fa-transform="shrink-4 down-2"
                    aria-labelledby="svg-inline--fa-title-b6Hq7Fvm2tCT"
                    data-prefix="fas"
                    data-icon="check-circle"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    data-fa-i2svg=""
                    data-original-title="Verified"
                  >
                    <title id="svg-inline--fa-title-b6Hq7Fvm2tCT">
                      Verified
                    </title>
                    <g transform="translate(256 256)">
                      <g transform="translate(0, 64)  scale(0.75, 0.75)  rotate(0 0 0)">
                        <path
                          fill="currentColor"
                          d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                          transform="translate(-256 -256)"
                        ></path>
                      </g>
                    </g>
                  </svg> */}
    </Typography>
  );
}
