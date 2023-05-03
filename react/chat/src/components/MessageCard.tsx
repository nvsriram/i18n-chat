import { Paper, Typography } from "@mui/material";
import { Component, FC } from "react";
import TimeAgo, { TimeAgoProps } from "timeago-react";
import { IAvatar, IMessage, IRoomEvent, MSG_TYPES } from "../helpers/types";
import MessageText from "./MessageText";
import UserAvatar from "./UserAvatar";

const TimeAgoFixed = TimeAgo as unknown as Component<TimeAgoProps> & {
  new (props: any): Component<TimeAgoProps>;
};

const MessageCard: FC<{
  roomEvents: IRoomEvent[];
  messages: IMessage[];
  currentUser: string | number;
  lang: string;
  avatars: IAvatar;
  shouldTranslate: boolean;
}> = ({
  roomEvents,
  messages,
  currentUser,
  lang,
  avatars,
  shouldTranslate,
}): any => {
  if (messages.length === 0) {
    return (
      <Paper elevation={0} sx={{ marginTop: "auto" }}>
        <Typography
          component="p"
          variant="caption"
          style={{ textAlign: "center" }}
        >
          {"Start messaging! 🎉"}
        </Typography>
      </Paper>
    );
  }

  return roomEvents.map((roomEvent, idx) => {
    const isCurrentUser = currentUser === roomEvent.username;

    if (roomEvent.msg_type === MSG_TYPES.JOINED) {
      return (
        <Typography component="p" variant="body2" key={idx} sx={{ my: 2 }}>
          {roomEvent.username} is in the chat! 🎉
        </Typography>
      );
    }
    return (
      <Paper
        sx={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "flex-start",
          alignItems: "center",
          justifyContent: isCurrentUser ? "flex-end" : "flex-start",
          mx: 2,
          my: 0.2,
          boxShadow: "none",
          ml: isCurrentUser ? "auto" : 2,
        }}
        key={idx}
      >
        <UserAvatar
          username={roomEvent.username}
          avatar={avatars[roomEvent.username]}
          sx={{ order: isCurrentUser ? 1 : 0 }}
        />
        <Paper
          sx={{
            p: 1.5,
            mx: 0.5,
            overflowWrap: "break-word",
            bgcolor: isCurrentUser ? "#2196F3" : "#9E9E9E",
          }}
        >
          <MessageText
            roomEvent={roomEvent}
            lang={lang}
            shouldTranslate={shouldTranslate}
          />
        </Paper>
        <Typography
          component="p"
          variant="caption"
          sx={{ alignSelf: "flex-end", order: isCurrentUser ? -1 : 1, pb: 0.5 }}
        >
          <TimeAgoFixed datetime={roomEvent.timestamp} />
        </Typography>
      </Paper>
    );
  });
};

export default MessageCard;
