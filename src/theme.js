import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
    palette: {
        primary: { main: '#9147FF'},
        secondary: { main: '#2a48f3'},
        mode: 'light'
    }
})

export const darkTheme = createTheme({
    palette: {
        primary: { main: '#9147FF'},
        secondary: { main: '#2a48f3'},
        mode: 'dark'
    }
})
