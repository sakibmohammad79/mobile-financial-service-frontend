import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AuthButton from "../../components/UI/AuthButton";
import { useNavigate } from "react-router-dom";
import { getuserInfo } from "../../services/authService";

const pages = ["Service", "About", "Blog"];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const { role } = getuserInfo();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      service: `/${role}`,
      about: "/about",
      blog: "/blog",
    };

    const path = routes[page.toLowerCase()];
    if (path) {
      navigate(path);
    }
  };

  return (
    <AppBar position="static" sx={{ background: "#E2136E" }}>
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
            <img
              height={40}
              width={40}
              src="../../../public/saving.png"
              alt="Saving"
            />
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
              letterSpacing: { xs: ".1rem", sm: ".2rem", md: ".3rem" },
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TRANSACTEASE
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      fontWeight: 600,
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img
              height={30}
              width={30}
              src="../../../public/saving.png"
              alt="Saving"
            />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TRANSACTEASE
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={() => handleNavigate(page)}>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "0.9rem", sm: "1.1rem" },
                    fontWeight: 600,
                  }}
                >
                  {page}
                </Typography>
              </MenuItem>
            ))}
          </Box>

          {/* Authentication Button */}
          <Box sx={{ flexGrow: 0 }}>
            <AuthButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
