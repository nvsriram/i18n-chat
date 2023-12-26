import Box from "@mui/material/Box";
import { Dispatch, FC, SetStateAction } from "react";
import Logo from "../assets/logo.png";
import FormSubmit from "../components/FormSubmit";
import InputForm from "../components/InputForm";
import LanguageSelect from "../components/LanguageSelect";
import TextInput from "../components/TextInput";
import { validateInputs } from "../helpers/ValidateInputs";

type setFn<T> = Dispatch<SetStateAction<T>>;

interface JoinRoomProps {
  setRoomName: setFn<string>;
  setUsername: setFn<string>;
  setLang: setFn<string>;
  setIsLoggedIn: setFn<boolean>;
}

const JoinRoom: FC<JoinRoomProps> = ({
  setRoomName,
  setUsername,
  setLang,
  setIsLoggedIn,
}) => {
  const setValues = (values: { [key: string]: { value: string } }) => {
    setRoomName(values["Room Name"].value);
    setUsername(values["Username"].value);
    setLang(values["Lang"].value);
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
