import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";
import { removeFromStorage } from "../../Utils/localStorage";

interface OverviewAppbarProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OverviewAppbar = (props: OverviewAppbarProps) => {
  const { drawerOpen, setDrawerOpen } = props;

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    removeFromStorage("token");
    removeFromStorage("userId");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#1565c0",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        overflow: "auto",
        marginRight: "280px",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          onClick={() => setDrawerOpen(!drawerOpen)}
          edge="start"
          sx={{ mr: 2 }}
        >
          {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 600, color: "#ffffff" }}
        >
          Kundeklager 360
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon />}
          sx={{ borderRadius: 2, padding: "0.5em", color: "#ffffff" }}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};
