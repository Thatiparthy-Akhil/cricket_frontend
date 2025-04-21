import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null); // Clear the token
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Cricket CMS
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {token ? (
          <>
            <Button color="inherit" component={Link} to="/articles">
              Articles
            </Button>
            <Button color="inherit" component={Link} to="/players">
              Players
            </Button>
            <Button color="inherit" component={Link} to="/live-scores">
              Live Scores
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
