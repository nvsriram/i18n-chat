import { Paper, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { FC } from "react";
import { setFn } from "../helpers/types";
import TranslationSwitch from "./TranslationSwitch";

interface INavbar {
  room: string;
  username: string;
  avatar: string;
  shouldTranslate: boolean;
  setShouldTranslate: setFn<boolean>;
}

const Navbar: FC<INavbar> = ({
  room,
  username,
  avatar,
  shouldTranslate,
  setShouldTranslate,
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Paper
      elevation={trigger ? 4 : 2}
      sx={{ bgcolor: "primary.main", width: "100%", color: "#fff" }}
      square
    >
      <Toolbar sx={{ display: "grid", gridTemplateColumns: "1fr 3fr 1fr" }}>
        <Typography component="h5" variant="h5" sx={{ gridColumn: "1/2" }}>
          {room}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={avatar}
            alt={username}
            style={{ height: "3em", width: "3em" }}
          />
          <Typography
            component="h6"
            variant="h6"
            sx={{ gridColumn: "2/3", textAlign: "center" }}
          >
            {username}
          </Typography>
        </div>
        <TranslationSwitch
          shouldTranslate={shouldTranslate}
          setShouldTranslate={setShouldTranslate}
        />
      </Toolbar>
    </Paper>
  );
};

export default Navbar;
