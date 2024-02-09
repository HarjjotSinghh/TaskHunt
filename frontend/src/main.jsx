import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes
} from "react-router-dom";
import "./index.css";
import IndexPage from "./App";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import '@mantine/core/styles.css';
import { MantineProvider, createTheme, rem } from '@mantine/core';
import MainLayout from "./layout";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/profile-page";

const purpleTheme = [
  '#f5ecff',
  '#e5d4fa',
  '#c8a6f3',
  '#aa75ed',
  '#904be7',
  '#7f32e4',
  '#7725e4',
  '#6618ca',
  '#5a14b6',
  '#4e0da0'
];

const theme = createTheme({
  primaryColor: 'purple',
  defaultRadius: 'md',
  colors: {
    purple: purpleTheme,
  },
  fontSizes: {
    xs: rem(10),
    sm: rem(11),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65',
  },
});


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" >
    <Route path="/" element={<MainLayout />}>
      <Route index element={<IndexPage />} />
      <Route path="/profile" element={<ProfilePage/>}/>
    </Route>
    <Route path="/login" element={<LoginPage />}></Route>
    <Route path="/register" element={<RegisterPage />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </MantineProvider>
  </React.StrictMode>
);