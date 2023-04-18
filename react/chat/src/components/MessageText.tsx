import { Typography } from "@mui/material";
import { IRoomEvent } from "../helpers/types";
import { useEffect, useState } from "react";

const MessageText: React.FC<{
    roomEvent: IRoomEvent;
    lang: string;
    shouldTranslate: boolean;
}> = ({ roomEvent, lang, shouldTranslate }): any => {
    const [text, setText] = useState(roomEvent.message);

    const translateText = async (roomEvent: IRoomEvent) => {
        const data = await fetch(`https://libretranslate.de/translate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                q: roomEvent.message,
                source: roomEvent.lang,
                target: lang
            })
        }).then(res => res.json())
        .then(data => data);
        return data.translatedText;
     }

     useEffect(() => {
        if (!shouldTranslate) {
            setText(roomEvent.message);
            return;
        }
        if (roomEvent.lang != lang) {
            translateText(roomEvent).then((data) => {
                setText(data);
            });
        }
     }, [roomEvent, lang, shouldTranslate])

    return (
        <Typography component="p" variant="body1">{text}</Typography>
    );
}

export default MessageText;