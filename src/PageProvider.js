import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "@mui/material";
import { useTheme } from 'next-themes';
import { darkTheme, lightTheme } from "./theme";

const PageProvider = ({ children }) => {
    const { resolvedTheme } = useTheme();
    const [currentTheme, setCurrentTheme ] = useState(darkTheme);
    
    useEffect(() => {
        resolvedTheme === 'light' ?
            setCurrentTheme(lightTheme) :
            setCurrentTheme(darkTheme);
    }, [resolvedTheme]);

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};
export default PageProvider;