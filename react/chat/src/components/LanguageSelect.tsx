import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useFormContext } from "../helpers/FormContext";
import { LIBRE_BASE_URL } from "../helpers/constants";
import { Language } from "../helpers/types";

const LanguageSelect: FC<{}> = () => {
  const formContext = useFormContext();

  const [languagesList, setLanguagesList] = useState<Language[]>([]);

  useEffect(() => {
    formContext.setInputInitialState("Lang");
  }, [formContext]);

  useEffect(() => {
    fetch(`${LIBRE_BASE_URL}/languages`)
      .then((res) => res.json())
      .then((data) => setLanguagesList(data));
  }, []);

  return (
    <FormControl
      variant="outlined"
      sx={{ m: 1, minWidth: 120 }}
      error={formContext.inputs["Lang"] && formContext.inputs["Lang"].invalid}
    >
      <InputLabel id="language-label">Language</InputLabel>
      <Select
        labelId="language-label"
        id="language-select"
        label="Language"
        name="Lang"
        value={
          "Lang" in formContext.inputs ? formContext.inputs["Lang"].value : ""
        }
        onChange={formContext.onChange}
      >
        {languagesList.map((language) => {
          return (
            <MenuItem key={language.code} value={language.code}>
              {language.name}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>
        {" "}
        {"Lang" in formContext.inputs && formContext.inputs["Lang"].invalid
          ? formContext.inputs["Lang"].invalidMsg
          : " "}
      </FormHelperText>
    </FormControl>
  );
};

export default LanguageSelect;
