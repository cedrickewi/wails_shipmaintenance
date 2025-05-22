import { Outlet } from "react-router-dom"
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, AppBar, Typography, CssBaseline } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HandymanIcon from '@mui/icons-material/Handyman';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';


export default function Layout() {
  const drawerWidth = 210;

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }} >
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            MAINTENANCE LOGS DDLM
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/ships">
            <ListItemIcon><DirectionsBoatIcon /></ListItemIcon>
            <ListItemText primary="Ships" />
          </ListItem>
          <ListItem component={Link} to="/mechanics">
            <ListItemIcon><EngineeringIcon /></ListItemIcon>
            <ListItemText primary="Mechanics" />
          </ListItem>
          <ListItem component={Link} to="/issues">
            <ListItemIcon><HandymanIcon /></ListItemIcon>
            <ListItemText primary="Declare Issues" />
          </ListItem>
          <ListItem component={Link} to="/workorders">
            <ListItemIcon><HandymanIcon /></ListItemIcon>
            <ListItemText primary="Work Order" />
          </ListItem>
          <ListItem component={Link} to="/magazine">
            <ListItemIcon><InventoryIcon /></ListItemIcon>
            <ListItemText primary="Magazine" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "hidden" }}>
        <Toolbar />
        <ToastContainer />
        <Outlet />
      </Box>
    </Box>
  )
}
