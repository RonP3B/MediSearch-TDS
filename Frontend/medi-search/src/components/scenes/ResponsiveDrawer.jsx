import { useState, useContext, useEffect } from "react";
import ColorModeContext from "../contexts/ColorModeContext";
import PropTypes from "prop-types";
import useAuth from "../../hooks/persistence/useAuth";
import useLogout from "../../hooks/persistence/useLogout";
import ScrollBar from "../custom/Scrollbar/ScrollBar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/images/Logo.png";
import Avatar from "@mui/material/Avatar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ASSETS = import.meta.env.VITE_MEDISEARCH;

const drawerWidth = 280;

const ResponsiveDrawer = (props) => {
  const { window, main, nav, settings } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const colorMode = useContext(ColorModeContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { auth } = useAuth();
  const logoutUser = useLogout();
  const location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleToggleColorMode = () => colorMode.toggleColorMode();

  const drawer = (
    <ScrollBar>
      <Toolbar>
        <Box
          component="img"
          src={Logo}
          alt="MediSearch Logo"
          sx={{
            width: 35,
            height: 35,
            objectFit: "cover",
          }}
        />
      </Toolbar>
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
          padding: 2,
          margin: 2,
        }}
      >
        <Avatar
          alt="Foto del usuario"
          src={`${ASSETS}${auth.payload.UrlImage}`}
          sx={{ marginRight: 1 }}
        />
        <Typography sx={{ fontWeight: "bold" }}>{auth.payload.sub}</Typography>
      </Paper>
      <List>
        {nav.map(({ item, icon, to }) => {
          if (auth.payload.RoleType === "Farmacia" && item === "Farmacias") {
            return null;
          }

          if (
            auth.payload.RoleType === "Laboratorio" &&
            (item === "Laboratorios" || item === "Provisiones")
          ) {
            return null;
          }

          if (
            auth.payload.roles !== "SuperAdmin" &&
            (item === "Crear Usuario" || item === "Mi empresa")
          ) {
            return null;
          }

          return (
            <ListItem key={item} disablePadding>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </ScrollBar>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          backgroundColor:
            colorMode.mode === "light"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(18, 18, 18, 0.2)",
          backdropFilter: "blur(8px)",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon
              style={{
                color: colorMode.mode === "light" ? "#637381" : undefined,
              }}
            />
          </IconButton>

          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <IconButton onClick={handleToggleColorMode} color="inherit">
              {colorMode.mode === "light" ? (
                <Brightness4Icon style={{ color: "#637381" }} />
              ) : (
                <Brightness7Icon />
              )}
            </IconButton>

            <>
              <Tooltip title="Abrir opciones">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Foto del usuario"
                    src={`${ASSETS}${auth.payload.UrlImage}`}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                  <Typography variant="subtitle2" noWrap>
                    {auth.payload.sub}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {auth.payload.email}
                  </Typography>
                </Box>
                <Divider sx={{ borderStyle: "dashed" }} />
                {settings.map(({ option, route }) => (
                  <MenuItem
                    key={option}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={route}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">{option}</Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={logoutUser}>
                  <Typography textAlign="center">Cerrar sesión</Typography>
                </MenuItem>
              </Menu>
            </>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{ marginTop: "94px", flexGrow: 1 }}>{main}</Box>
    </Box>
  );
};

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  main: PropTypes.any,
  nav: PropTypes.array.isRequired,
  settings: PropTypes.array.isRequired,
};

export default ResponsiveDrawer;
