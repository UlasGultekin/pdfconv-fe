import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import HomePage from './pages/HomePage';
import ConvertPage from './pages/ConvertPage';
import LanguageSelector from './components/LanguageSelector';
import NotFoundPage from './pages/NotFoundPage';
import LanguageLayout from './pages/LanguageLayout';
import AdSlot from './components/AdSlot';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import KvkkPage from './pages/KvkkPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#6c47ff', contrastText: '#fff' },
    secondary: { main: '#00b894', contrastText: '#fff' },
    background: { default: '#f4f6fa', paper: '#fff' },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});

const App = () => {
  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Router>
            <AdSlot slot="vertical" />
            <AdSlot slot="vertical-left" />
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/en" replace />} />
              <Route path="/:lang" element={<LanguageLayout />}>
                <Route index element={<HomePage />} />
                <Route path="convert/:conversionType" element={<ConvertPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="kvkk" element={<KvkkPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
