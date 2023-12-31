import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "Components/FlexBetween";
import Friend from "Components/Friend";
import WidgetWrapper from "Components/WidgetWrapper";
import { updatePost } from "Redux-Toolkit/Slices/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likesCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/post/${postId}/like`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(updatePost({ post: updatedPost }));
  };
  return (
    <WidgetWrapper margin={"2rem 0"}>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturepath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width={"100%"}
          height={"auto"}
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
          alt="post_pic"
        />
      )}
      <FlexBetween mt={"0.5rem"}>
        <FlexBetween gap={"1rem"}>
          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography color={main}>{likesCount}</Typography>
          </FlexBetween>
          <FlexBetween gap={"0.3rem"}>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography color={main}>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt={"0.5rem"}>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          {comments.length === 0 && (
            <Box mt={"0.5rem"}>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                No comment found
              </Typography>
            </Box>
          )}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
