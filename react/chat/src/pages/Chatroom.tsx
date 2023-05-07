import SendIcon from "@mui/icons-material/Send";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import * as COLORS from "@mui/material/colors";
import { Container } from "@mui/system";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import FormSubmit from "../components/FormSubmit";
import InputForm from "../components/InputForm";
import MessageCard from "../components/MessageCard";
import Navbar from "../components/Navbar";
import TextInput from "../components/TextInput";
import { validateInputs } from "../helpers/ValidateInputs";
import { IAvatar, IFormInputs, IMessage, IRoomEvent } from "../helpers/types";
import useTitle from "../helpers/useTitle";

const Chatroom: FC<{
  room: string;
  username: string;
  lang: string;
  roomEvents: IRoomEvent[];
  messages: IMessage[];
  avatars: IAvatar;
  onButtonClicked: (input: string) => void;
}> = ({
  room,
  username,
  lang,
  roomEvents,
  messages,
  avatars,
  onButtonClicked,
}) => {
  const [shouldTranslate, setShouldTranslate] = useState(false);

  useTitle(room);

  const lastDivRef = useRef<HTMLDivElement>(null);

  const setValue = (input: IFormInputs) => {
    onButtonClicked(input["Message"].value);
  };

  const [background, backgroundSize] = useMemo(() => {
    const totalLangs = new Set([
      ...roomEvents.map((roomEvent) => roomEvent.lang),
    ]).size;
    const backgroundSize = `${(totalLangs + 1) * 200}% ${
      (totalLangs + 1) * 200
    }%`;

    const colors = Object.keys(COLORS).map((color: string) => {
      return Object(COLORS)[color][800];
    });
    let colorStr = "";
    let prefix = "";
    colors.slice(0, totalLangs + 1).forEach((color) => {
      if (!color) return;
      colorStr += prefix + color;
      prefix = ", ";
    });
    return [`linear-gradient(45deg, ${colorStr})`, backgroundSize];
  }, [roomEvents]);

  useEffect(() => {
    lastDivRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomEvents]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navbar
        room={room}
        username={username}
        avatar={avatars[username]}
        shouldTranslate={shouldTranslate}
        setShouldTranslate={setShouldTranslate}
      />
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "100%",
          width: "100%",
          pb: 1,
          borderBottom: "none",
          background,
          backgroundSize,
          animation: "gradient 10s ease infinite",
        }}
        square
      >
        <MessageCard
          roomEvents={roomEvents}
          messages={messages}
          currentUser={username}
          lang={lang}
          avatars={avatars}
          shouldTranslate={shouldTranslate}
        />
        <div ref={lastDivRef} aria-hidden />
      </Paper>
      <InputForm
        onSubmit={setValue}
        validateInputs={validateInputs}
        resetOnSubmit={true}
        sx={{ width: "100%", mx: 2, mt: "auto", mb: 3, px: 2 }}
      >
        <Grid container spacing={0.5} justifyContent="flex-end">
          <Grid
            item
            xs={11}
            sx={{
              width: "100%",
              maxWidth: "90%",
              alignSelf: "flex-end",
              justifySelf: "flex-start",
            }}
          >
            <TextInput
              variant="standard"
              color="primary"
              label=" "
              id="send-message"
              name="Message"
              type="text"
              placeholder="Type a message"
              removeHelperText
              autoFocus
            />
          </Grid>
          <Grid item xs={1}>
            <FormSubmit variant="contained" color="primary">
              <SendIcon sx={{ height: "1em", width: "1em" }} />
            </FormSubmit>
          </Grid>
        </Grid>
      </InputForm>
    </Container>
  );
};

export default Chatroom;
