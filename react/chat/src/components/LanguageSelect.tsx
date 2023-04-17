import { Select, MenuItem, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react"

type language = {
    code: "string",
    name: "string",
    targets: [
    "string"
    ]
}


const LanguageSelect: React.FC<{}> = () => {
    const [languagesList, setLanguagesList] = useState<language[]>([]);
    const [languageKey, setLanguageKey] = useState("en");
    
    const handleLanguageSelect = (e: SelectChangeEvent<string>) => {
        setLanguageKey(e.target.value);
        console.log(e.target.value);
    } 

    useEffect(()=> {
        fetch(`https://libretranslate.de/languages`)
        .then((res) => res.json())
        .then((data) => {
            setLanguagesList(data);
        })
    }, []);

    return (
        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="language-label">Language</InputLabel>
            <Select
                labelId="language-label"
                id="language-select"
                value={languageKey}
                label="Language"
                onChange={handleLanguageSelect}
                >
                {languagesList.map((language) => {
                    return (
                        <MenuItem key={language.code} value={language.code}>
                            {language.name}
                        </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    );
};

export default LanguageSelect;