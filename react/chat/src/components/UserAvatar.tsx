import { Avatar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC } from "react";

const UserAvatar: FC<{ username: string; avatar: string; sx: any }> = ({
  username,
  avatar,
  ...props
}) => {
  return (
    <Stack {...props}>
      <Avatar alt={username} src={avatar} />
      <Typography component="p" variant="body2">
        {username}
      </Typography>
    </Stack>
  );
};

export default UserAvatar;
