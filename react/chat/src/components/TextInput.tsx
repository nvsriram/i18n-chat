import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect } from "react";
import { useFormContext } from "../hooks";

type ITextInput = TextFieldProps & {
  name: string;
  removeHelperText?: boolean;
};

const TextInput = ({ name, removeHelperText, sx, ...props }: ITextInput) => {
  const formContext = useFormContext();

  useEffect(() => {
    formContext.setInputInitialState(name);
  }, [formContext, name]);

  return (
    <TextField
      margin="normal"
      fullWidth
      required={!removeHelperText}
      name={name}
      error={
        !removeHelperText &&
        formContext.inputs[name] &&
        formContext.inputs[name].invalid
      }
      helperText={
        removeHelperText!
          ? ""
          : name in formContext.inputs && formContext.inputs[name].invalid
          ? formContext.inputs[name].invalidMsg
          : " "
      }
      value={name in formContext.inputs ? formContext.inputs[name].value : ""}
      onChange={formContext.onChange}
      sx={{ mt: 0, ...sx }}
      {...props}
    />
  );
};

export default TextInput;
