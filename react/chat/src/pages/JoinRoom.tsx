import Box from "@mui/material/Box";
import { FC } from "react";

import Logo from "@/assets/logo.png";
import { FormSubmit, InputForm, LanguageSelect, TextInput } from "@/components";
import { validateInputs } from "@/helpers";
import { IFormInputs, setFn } from "@/types";

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
        alt="logo"
        height={125}
        src={Logo}
        style={{ marginBottom: "1rem" }}
      />
      <InputForm validateInputs={validateInputs} onSubmit={setValues}>
        <TextInput
          autoFocus
          id="room-name"
          label="Room Name"
          name="Room Name"
          placeholder="My_Custom_Room"
          type="text"
          variant="outlined"
        />
        <TextInput
          id="username"
          label="Username"
          name="Username"
          placeholder="Bob"
          type="text"
          variant="outlined"
        />
        <LanguageSelect />
        <FormSubmit fullWidth color="success" variant="contained">
          Join Room
        </FormSubmit>
      </InputForm>
    </Box>
  );
};

export default JoinRoom;
