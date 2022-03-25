import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { useTheme } from '@emotion/react';

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