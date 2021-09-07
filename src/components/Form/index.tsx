import React from "react";
import thermostatModel from "models/thermostat";
import { TextField, Typography } from "@material-ui/core";
import { overheatThreshold } from "models/thermostat";
import styled from "styled-components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { green, red } from "@material-ui/core/colors";
const StyledTextField = styled(TextField)`
  background-color: rgba(255, 255, 255, 0.24);
  border-radius: 4px;
`;
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

const StyledTypography = styled(Typography)<{ heatingIsOn: boolean }>`
  & b {
    color: ${(props) => (props.heatingIsOn ? green[400] : red[400])};
  }
`;

const Form = () => {
  const [actual, setActual] = React.useState(15);
  const [target, setTarget] = React.useState(20);

  const actualError = actual > overheatThreshold;
  const targetError = target > overheatThreshold;

  const heatingIsOn =
    thermostatModel(actual, target) && !(actualError || targetError);

  const handleActualChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = parseInt(event.target.value);
    setActual(value);
  };

  const handleTargetChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    console.log("target");
    const value = parseInt(event.target.value);
    setTarget(value);
  };

  return (
    <StyledDiv>
      <StyledTextField
        label={actualError ? "Man's living on the sun" : "Actual"}
        onChange={handleActualChange}
        error={actual > overheatThreshold}
        type="number"
        defaultValue={15}
        variant="outlined"
      />
      <StyledTextField
        label={targetError ? "Are you sure?" : "Target"}
        onChange={handleTargetChange}
        error={targetError}
        defaultValue={18}
        type="number"
        variant="outlined"
      />

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
