import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import ConvertPage from './pages/ConvertPage';
import { useSyncLanguage } from './utils/useSyncLanguage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6c47ff', contrastText: '#fff' },
    secondary: { main: '#00b894', contrastText: '#fff' },
    background: { default: 'linear-gradient(135deg, #f4f6fa 0%, #e3e0ff 100%)', paper: '#fff' },
  },
  shape: { borderRadius: 24 },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h1: { fontWeight: 800, fontSize: '2.8rem', letterSpacing: '-1px' },
    h2: { fontWeight: 700, fontSize: '2rem' },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 700, fontSize: '1.1rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: '0 4px 16px rgba(108, 71, 255, 0.10)', padding: '0.85rem 2.2rem', fontSize: '1.1rem' },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: { boxShadow: '0 8px 32px rgba(108, 71, 255, 0.10)', borderRadius: 32, background: '#fff', padding: '3rem 2.5rem', maxWidth: 520, margin: '4rem auto', display: 'flex', flexDirection: 'column', alignItems: 'center' },
      },
    },
  },
});

export default function App() {
  useSyncLanguage();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path=":lang" element={<HomePage />} />
            <Route path=":lang/convert/:convertType" element={<ConvertPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
}
