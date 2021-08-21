import * as React from "react";
import { useState } from "react";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function ThemeSwitcherComponent(props) {
  //const { prompt, useOs, useDark } = props;

  const expandedProps = {
    ...props,
    useOs: props.useOs || false,
    useDark: props.useDark || false,
    darkPrompt: props.darkPrompt || "Use dark mode",
    osPrompt: props.osPrompt || "Use OS preference",
    tooltipText: props.tooltipText || "OS preference: ",
  };

  const [state, setState] = useState(expandedProps);

  const handleCheck = (_e, checked) => {
    setState({ ...state, useOs: checked });
    state.themeChanger(checked ? null : state.useDark);
    console.log(state);
  };

  const handleSwitch = (_e, checked) => {
    setState({ ...state, useDark: checked });
    state.themeChanger(checked);
    console.log(state);
  };

  // Get OS-level preference for dark mode
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      <div className="container justify-content-right align-items-right text-right">
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <div className="mr-auto"></div>
          </div>
          <div className="col-lg-4 col-sm-12">
            <div className="card bg-transparent border-0 ml-auto float-right text-right">
              <div className="card-body">
                <Tooltip
                  title={
                    state.tooltipText + (prefersDarkMode ? " dark" : " light")
                  }
                >
                  <FormControlLabel
                    labelPlacement="end"
                    label={state.osPrompt}
                    control={
                      <Checkbox checked={state.useOs} onChange={handleCheck} />
                    }
                  />
                </Tooltip>

                <FormControlLabel
                  labelPlacement="end"
                  label={state.darkPrompt}
                  control={
                    <Switch
                      checked={state.useOs ? prefersDarkMode : state.useDark}
                      disabled={state.useOs}
                      onChange={handleSwitch}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
