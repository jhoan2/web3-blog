import React, { useState, useContext } from 'react'
import { ownerAddress } from '../../../config';
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
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'; 
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Link from 'next/link'
import { AccountContext } from '../../../context'

export default function Header({pageProps}) {
    const [toggle, setToggle] = useState(false);
    const { theme, resolvedTheme, setTheme } = useTheme();
    const account = useContext(AccountContext);
    if (pageProps) {
        const { connect } = pageProps
    }

  return (
    <Grid
        container
        alignItems="center"
        justifyContent="space-between"
    >
        <Grid item >
            <React.Fragment>
            <Button onClick={() => setToggle(true)}>
                <MenuIcon />
            </Button>
            <Drawer
                open={toggle}
                onClose={() => setToggle(false)}
            >
                <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={() => setToggle(false)}
                >
                {(account === ownerAddress) ?
                <List>
                    <ListItem disablePadding >
                        <ListItemButton>
                            <ListItemIcon >
                                <HomeIcon />
                            </ListItemIcon>
                            <Link href="/">
                                <ListItemText primary="Home" />
                            </Link>
                        </ListItemButton>
                    </ListItem>    
                    <ListItem disablePadding >
                            <ListItemButton>
                                <ListItemIcon>
                                    <BorderColorIcon />
                                </ListItemIcon>
                                <Link href="/create-post">
                                    <ListItemText primary="Create Post" />
                                </Link>
                            </ListItemButton>
                        </ListItem>                         
                </List> :
                     <List>
                        <ListItem disablePadding >
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <Link href="/">
                                    <ListItemText primary="Home" />
                                </Link>
                            </ListItemButton>
                        </ListItem>      
                    </List>
                }
                </Box>
            </Drawer>
            </React.Fragment>
        </Grid>
        <Grid item>
            <Grid item container direction = 'row'>
            {(account === ownerAddress) ? 
                account :
                <Button onClick={() => connect()}>Connect Wallet</Button>
            }
            <IconButton 
                sx={{ ml: 1 }} 
                onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')} 
                color="inherit"
            >
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Avatar alt="airipfp" src='/airipfp.jpg' />
            </Grid>
        </Grid>
    </Grid>
    
  )
}

