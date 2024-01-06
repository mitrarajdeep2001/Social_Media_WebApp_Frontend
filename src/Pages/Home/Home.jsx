import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "Pages/Navbar/Navbar";
import AdvertisementWidget from "Pages/Widgets/AdvertisementWidget";
import FriendListWidget from "Pages/Widgets/FriendListWidget";
import MyPostWidget from "Pages/Widgets/MyPostWidget";
import PostsWidget from "Pages/Widgets/PostsWidget";
import UserWidget from "Pages/Widgets/UserWidget";
import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();
  return (
    <Box
      bgcolor={palette.background.default}
    >
      <Navbar />
      <Box
        width={"100%"}
        p={"2rem 6%"}
        display={isNonMobileScreen ? "flex" : "block"}
        gap={"0.5rem"}
        justifyContent={"space-between"}
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen && <Box flexBasis={"26%"}>
          <AdvertisementWidget/>
          <Box m={"2rem 0"}/>
          <FriendListWidget userId={_id}/>
        </Box>}
      </Box>
    </Box>
  );
};

export default Home;
