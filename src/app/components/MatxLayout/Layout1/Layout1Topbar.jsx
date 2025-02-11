import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Home,
  Menu,
  Person,
  Settings,
  WebAsset,
  MailOutline,
  StarOutline,
  PowerSettingsNew,
  AccountBalanceWalletOutlined as WalletIcon,
} from "@mui/icons-material";
import Button from "@mui/material/Button";

import useSettings from "app/hooks/useSettings";
import { MatxMenu, MatxSearchBox } from "app/components";
import { Span } from "app/components/Typography";
import { themeShadows } from "app/components/MatxTheme/themeColors";
import { topBarHeight } from "app/utils/constant";
import { useDispatch } from "react-redux";
import { logout } from "app/features/auth/authSlice";

// Styled Components
const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease",
});

const TopbarContainer = styled("div")(({ theme }) => ({
  padding: "8px 18px",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { padding: "8px 16px" },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const UserMenu = styled("div")({
  margin: "0 0 0 16px",
  display: "flex",
  alignItems: "center",
  borderRadius: 24,
  cursor: "pointer",
});

const PriceButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
  borderRadius: 20,
  padding: "6px 12px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Memoized token to prevent unnecessary re-renders
  const token = useMemo(
    () => JSON.parse(localStorage.getItem("loggedInUser") || "{}"),
    []
  );

  const handleSidebarToggle = () => {
    const { layout1Settings } = settings;
    const mode =
      layout1Settings.leftSidebar.mode === "full"
        ? "close"
        : isMdScreen
        ? "mobile"
        : "full";
    updateSettings({
      layout1Settings: { leftSidebar: { mode } },
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle} aria-label="Toggle Sidebar">
            <Menu />
          </StyledIconButton>

          <IconBox>
            <StyledIconButton aria-label="Mail">
              <MailOutline />
            </StyledIconButton>
            <StyledIconButton aria-label="Web">
              <WebAsset />
            </StyledIconButton>
            <StyledIconButton aria-label="Star">
              <StarOutline />
            </StyledIconButton>
          </IconBox>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />

          <Link to="/wallet">
            <PriceButton startIcon={<WalletIcon />}>Rs. 18.80</PriceButton>
          </Link>

          <MatxMenu
            menuButton={
              <UserMenu>
                <Avatar
                  src={token?.avatar || ""}
                  alt="User Avatar"
                  sx={{ cursor: "pointer" }}
                />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Home />
                <Span sx={{ marginInlineStart: 1 }}>Home</Span>
              </Link>
            </StyledItem>
            <StyledItem>
              <Link to="/profile">
                <Person />
                <Span sx={{ marginInlineStart: 1 }}>Profile</Span>
              </Link>
            </StyledItem>
            <StyledItem>
              <Settings />
              <Span sx={{ marginInlineStart: 1 }}>Settings</Span>
            </StyledItem>
            <StyledItem onClick={handleLogout}>
              <PowerSettingsNew />
              <Span sx={{ marginInlineStart: 1 }}>Logout</Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
