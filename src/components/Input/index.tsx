import Button from "@material-ui/core/Button";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React from "react";

interface Props {
  submit?: boolean;
  labelText?: string;
}

const Index: React.FC<Props & TextFieldProps> = ({
  submit,
  labelText,
  ...props
}) => {
  let component: React.ReactElement = <TextField {...props} type="number" />;

  if (submit) {
    component = <Button type="submit">Submit</Button>;
  }

  return component;
};
export default Index;
