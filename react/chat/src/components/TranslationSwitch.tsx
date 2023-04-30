import { FormControlLabel, Switch } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

const TranslationSwitch: FC<{
  shouldTranslate: boolean;
  setShouldTranslate: Dispatch<SetStateAction<boolean>>;
}> = ({ shouldTranslate, setShouldTranslate }) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShouldTranslate(e.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={shouldTranslate}
          onChange={handleOnChange}
          color="default"
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label={shouldTranslate ? "Translated" : "Original"}
    />
  );
};

export default TranslationSwitch;
