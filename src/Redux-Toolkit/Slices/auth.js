import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  posts: [],
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updatePost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPost
    },
  },
});

export const {setTheme, setLogin, setLogout, setFriends, setPosts} = authSlice.actions
export default authSlice.reducer