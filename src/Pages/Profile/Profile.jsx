import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "Pages/Navbar/Navbar";
import FriendListWidget from "Pages/Widgets/FriendListWidget";
import MyPostWidget from "Pages/Widgets/MyPostWidget";
import PostsWidget from "Pages/Widgets/PostsWidget";
import UserWidget from "Pages/Widgets/UserWidget";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null)
  const {id} = useParams();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
  const { palette } = useTheme();
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/user/${id}`, {
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
  return (
    <Box
      bgcolor={palette.background.default}
      // height={isNonMobileScreen ? "100vh" : "auto"}
    >
      <Navbar />
      <Box
        width={"100%"}
        p={"2rem 6%"}
        display={isNonMobileScreen ? "flex" : "block"}
        gap={"2rem"}
        justifyContent={"center"}
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={id}  picturePath={user.picturePath}/>
          <Box m={"2rem 0"}/>
          <FriendListWidget userId={id}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m={"2rem 0"}/>
          <PostsWidget userId={id} isProfile={true}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
