import React from "react";
import thermostatModel from "models/thermostat";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { green, red, orange } from "@material-ui/core/colors";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CenterDial = styled.div<{ targetIsSelected?: boolean }>`
  background: rgb(34, 34, 34);
  border-radius: 50%;
  padding: 36px 19px;
  position: relative;

  & h4 {
    color: ${(props) => (props.targetIsSelected ? orange[700] : "#e9e9e9")};
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    margin: -3px;
    background: linear-gradient(to right, #616161, #f5f5f5, #9e9e9e);
    border-radius: inherit;
  }
`;

const OrangeSlider = withStyles({
  root: {
    color: orange[700],
  },
  thumb: {
    backgroundColor: "#f1bb56",
    "&:hover, &:active": {
      boxShadow: "0px 0px 0px 14px rgba(158, 112, 43, 0.303)",
    },
  },
})(Slider);

const WhiteSlider = withStyles({
  root: {
    color: "#e9e9e9",
  },
  thumb: {
    backgroundColor: "#ffffff",
    "&:hover, &:active": {
      boxShadow: "0px 0px 0px 14px rgba(177, 177, 177, 0.303)",
    },
  },
})(Slider);

const HeatingFeedback = styled.div`
  margin: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    margin: 10px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    margin: 15px;
  }
`;

const HiveRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 180px;
  & > * {
    margin: 30px;
  }
`;

const SpacedHiveRow = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  & span {
    font-weight: bold;
    color: #cbcbcb;
  }
`;

const StyledTypography = styled(Typography)<{ heatingIsOn: boolean }>`
  & b {
    color: ${(props) => (props.heatingIsOn ? green[400] : red[400])};
  }
`;

const Form = () => {
  const [actual, setActual] = React.useState(15);
  const [target, setTarget] = React.useState(20);
  const [targetIsSelected, setTargetIsSelected] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const heatingIsOn = thermostatModel(actual, target);

  const handleActualSliderChange = (event: any, value: any) => {
    setActual(value);
    setTargetIsSelected(false);
  };

  const handleTargetSliderChange = (event: any, value: any) => {
    setTarget(Math.round(value));
    setTargetIsSelected(true);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = `${
    weekdays[date.getDay()]
  } ${date.getHours()}:${date.getMinutes()}`;

  return (
    <StyledDiv>
      <p>{formattedDate}</p>
      <SpacedHiveRow>
        <span>Target</span>
        <span>Actual</span>
      </SpacedHiveRow>
      <HiveRow>
        <OrangeSlider
          orientation="vertical"
          aria-labelledby="vertical-slider"
          max={30}
          min={10}
          value={target}
          onChange={handleTargetSliderChange}
        />
        <CenterDial targetIsSelected={targetIsSelected}>
          <Typography variant="h4">
            {targetIsSelected ? target : actual}°C
          </Typography>
        </CenterDial>

        <WhiteSlider
          orientation="vertical"
          aria-labelledby="vertical-slider"
          max={30}
          min={10}
          value={actual}
          onChange={handleActualSliderChange}
        />
      </HiveRow>
      <HeatingFeedback>
        {heatingIsOn && (
          <CheckCircleIcon style={{ color: green[400] }} fontSize="large" />
        )}
        {!heatingIsOn && (
          <CancelIcon style={{ color: red[400] }} fontSize="large" />
        )}

        <StyledTypography variant="h5" heatingIsOn={heatingIsOn}>
          The heating is<b>{heatingIsOn ? "on" : "off"}</b>
        </StyledTypography>
      </HeatingFeedback>
    </StyledDiv>
  );
};

export default Form;
