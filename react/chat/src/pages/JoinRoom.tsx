import Box from "@mui/material/Box";
import { FC } from "react";
import Logo from "../assets/logo.png";
import FormSubmit from "../components/FormSubmit";
import InputForm from "../components/InputForm";
import LanguageSelect from "../components/LanguageSelect";
import TextInput from "../components/TextInput";
import { validateInputs } from "../helpers/ValidateInputs";
import { IFormInputs, setFn } from "../types";

interface IJoinRoom {
  setRoomName: setFn<string>;
  setUsername: setFn<string>;
  setLang: setFn<string>;
  setIsLoggedIn: setFn<boolean>;
}

const JoinRoom: FC<IJoinRoom> = ({
  setRoomName,
  setUsername,
  setLang,
  setIsLoggedIn,
}) => {
  const setValues = (inputs: IFormInputs) => {
    setRoomName(inputs["Room Name"].value);
    setUsername(inputs["Username"].value);
    setLang(inputs["Lang"].value);
    setIsLoggedIn(true);
  };

  return (
    <Box
      sx={{
        paddingTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={Logo}
        alt="logo"
        height={125}
        style={{ marginBottom: "1rem" }}
      />
      <InputForm onSubmit={setValues} validateInputs={validateInputs}>
        <TextInput
          variant="outlined"
          id="room-name"
          label="Room Name"
          name="Room Name"
          type="text"
          placeholder="My_Custom_Room"
          autoFocus
        />
        <TextInput
          variant="outlined"
          id="username"
          label="Username"
          name="Username"
          type="text"
          placeholder="Bob"
        />
        <LanguageSelect />
        <FormSubmit variant="contained" color="success" fullWidth>
          Join Room
        </FormSubmit>
      </InputForm>
    </Box>
  );
};

export default JoinRoom;
