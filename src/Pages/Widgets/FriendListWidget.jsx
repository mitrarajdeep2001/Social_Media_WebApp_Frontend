import { Box, Typography, useTheme } from "@mui/material";
import Friend from "Components/Friend";
import WidgetWrapper from "Components/WidgetWrapper";
import { setFriends } from "Redux-Toolkit/Slices/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const getFriends = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/user/${userId}/friends`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log(data);
    dispatch(setFriends({ friends: data }));
  };
  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight={500}
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display={"flex"} flexDirection={"column"} gap={"1.5rem"}>
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            subtitle={friend.occupation}
            name={`${friend.firstName} ${friend.lastName}`}
            userPicturepath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
