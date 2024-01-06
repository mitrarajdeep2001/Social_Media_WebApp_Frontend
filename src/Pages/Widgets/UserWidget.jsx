import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import UserImage from "Components/UserImage";
import WidgetWrapper from "Components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import twitter from "../../Assets/twitter.png";
import linkedin from "../../Assets/linkedin.png";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    picturePath,
  } = user;
  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap={"0.5rem"}
        p={"0.5rem 0 1.2rem"}
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap={"1rem"}>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight={"500"}
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={{ color: main }}/>
      </FlexBetween>
      <Divider />
      {/* SECOND ROW */}
      <Box p={"1rem 0"}>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"} mb={"0.5rem"}>
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
      {/* THIRD ROW */}
      <Box p={"1rem 0"}>
        <FlexBetween mb={"0.5rem"}>
          <Typography color={medium}>Who viewed your profile?</Typography>
          <Typography color={main} fontWeight={500}>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight={500}>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />
      {/* FOURTH ROW */}
      <Box p={"1rem 0"}>
        <Typography fontSize={"1rem"} color={main} fontWeight={500} mb={"1rem"}>
          Social Profiles
        </Typography>
        <FlexBetween mb={"0.5rem"}>
          <FlexBetween gap={"1rem"}>
            <img src={twitter} alt="twitter" />
            <Box>
              <Typography color={main} fontWeight={500}>
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
        <FlexBetween>
          <FlexBetween gap={"1rem"}>
            <img src={linkedin} alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight={500}>
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
