import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { indigo, amber } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import ExamplePage from './pages/ExamplePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import RequireAuth from './helpers/RequireAuth';

// createTheme enables you to customize the look and feel of your app past the default
// in this case, we only change the color scheme
export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
export default function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/example" element={<ExamplePage />} />
          <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
          <Route path="/signup" element={<Signup setAuthToken={setAuthToken}/>} />
          <Route 
          path="/profile" 
          element={
            <RequireAuth token={authToken}>
              <ProfilePage token={authToken} />
            </RequireAuth>
          } 
        />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}