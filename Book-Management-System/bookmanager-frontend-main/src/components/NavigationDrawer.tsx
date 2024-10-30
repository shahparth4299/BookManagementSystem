import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BooksList from "./BooksList";
import AuthorsList from "./AuthorsList";

const drawerWidth = 250;

export default function NavigationDrawer() {
    const [activeComponent, setActiveComponent] = useState('BooksList');
    const renderContent = () => {
        switch (activeComponent) {
            case 'Authors':
                return <AuthorsList />;
            default:
                return <BooksList />;
        }
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , backgroundColor: '#039be5'}}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Book Management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: drawerWidth, backgroundColor: '#eeeeee', boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <List>
                    {['Books', 'Authors'].map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => setActiveComponent(text)}>
                                <ListItemText primary={text} sx={{ color: '#000' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {renderContent()}
            </Box>
        </Box>
    );
}
