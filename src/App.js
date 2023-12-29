import "normalize.css";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.token);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to={<Login />} />}
          />
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to={<Login />} />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
