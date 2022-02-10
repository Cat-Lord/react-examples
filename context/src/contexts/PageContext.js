import React from "react";

export const Theme = {
    dark: "dark",
    light: "light"
}

export const PageContext = React.createContext(
    // default value
    { 
        lang: "en",
        theme: Theme.light
    }
);