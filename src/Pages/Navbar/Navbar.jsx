import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setTheme } from "Redux-Toolkit/Slices/auth";
import { useNavigate } from "react-router-dom";
import FlexBetween from "Components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToogled, setIsMobileMenuToogled] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const primaryLight = theme.palette.primary.light;

  // const fullName = `${user.firstName} ${user.lastName}`;
  const fullName = `Rajdeep Mitra`;
  return (
    <FlexBetween padding={"1rem 6%"} backgroundColor={alt}>
      {/* LEFT NAVBAR STARTS */}
      <FlexBetween gap={"1.75rem"}>
        <Typography
          fontWeight={"bold"}
          fontSize={"clamp(1rem, 2rem, 2.25rem)"}
          color={"primary"}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/home")}
        >
          Sociopedia
        </Typography>
        {/* DESKTOP NAVBAR */}
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius={"9px"}
            gap={"3rem"}
            padding={"0.1rem 1.5rem"}
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* LEFT NAVBAR ENDS */}
      {/* RIGHT NAVBAR STARTS */}
      {/* DESKTOP NAVBAR */}
      {isNonMobileScreens ? (
        <FlexBetween gap={"2rem"}>
          <IconButton onClick={() => dispatch(setTheme())}>
            {theme.palette.mode === "light" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <Message sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <Notifications sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton>
            <Help sx={{ fontSize: "25px" }} />
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "&.MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "&.MuiSelect-Select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToogled(!isMobileMenuToogled)}
        >
          <Menu />
        </IconButton>
      )}
      {/* RIGHT NAVBAR ENDS */}
      {/* MOBILE RIGHT SIDEBAR STARTS */}
      {!isNonMobileScreens && isMobileMenuToogled && (
        <Box
          position={"fixed"}
          right={"0"}
          bottom={"0"}
          height={"100%"}
          zIndex={"10"}
          maxWidth={"500px"}
          minWidth={"300px"}
          backgroundColor={background}
        >
          {/* CLOSE BUTTON */}
          <Box display={"flex"} justifyContent={"flex-end"} p={"1rem"}>
            <IconButton
              onClick={() => setIsMobileMenuToogled(!isMobileMenuToogled)}
            >
              <Close />
            </IconButton>
          </Box>
          <FlexBetween gap={"2rem"} flexDirection={"column"}>
            <IconButton onClick={() => dispatch(setTheme())}>
              {theme.palette.mode === "light" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <Notifications sx={{ fontSize: "25px" }} />
            </IconButton>
            <IconButton>
              <Help sx={{ fontSize: "25px" }} />
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "&.MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "&.MuiSelect-Select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Logout
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
      {/* MOBILE RIGHT SIDEBAR ENDS */}
    </FlexBetween>
  );
};

export default Navbar;
