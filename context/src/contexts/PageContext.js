import React from "react";

export const Theme = {
    dark: "dark",
    light: "light"
}

export const PageSetup = { 
    lang: "en",
    theme: Theme.light
}

export const PageContext = React.createContext(PageSetup);