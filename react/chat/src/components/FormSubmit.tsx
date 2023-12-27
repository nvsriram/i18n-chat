import Button, { ButtonProps } from "@mui/material/Button";
import { FC, useContext } from "react";
import { FormContext } from "../contexts/FormContext";

interface IFormSubmit extends ButtonProps {}

const FormSubmit: FC<IFormSubmit> = ({
  fullWidth,
  color,
  children,
  sx,
  ...props
}) => {
  const formContext = useContext(FormContext);

  return (
    <Button
      type="submit"
      fullWidth={fullWidth}
      color={color}
      disabled={formContext != null && formContext.isValid < 0}
      sx={{ my: 1, ...sx }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
