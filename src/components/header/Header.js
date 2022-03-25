import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useTheme } from "next-themes";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';


export default function Header() {
    const [toggle, setToggle] = useState(false);

    const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <Grid
        container
        alignItems="center"
        justifyContent="space-around"
    >
        <React.Fragment>
          <Button onClick={() => setToggle(true)}>Icon</Button>
          <Drawer
            open={toggle}
            onClose={() => setToggle(false)}
          >
            <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setToggle(false)}
            >
            <List>
                <ListItem button>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>Create Post</ListItemText>
                </ListItem>
            </List>
            </Box>
          </Drawer>
        </React.Fragment>
        <IconButton sx={{ ml: 1 }} onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')} color="inherit">
        {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Avatar alt="airipfp" src='/airipfp.jpg' />
    </Grid>
    
  )
}

