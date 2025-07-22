import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, createTheme, CssBaseline, Box, Container, Typography, Link as MuiLink } from '@mui/material';
import HomePage from './pages/HomePage';
import ConvertPage from './pages/ConvertPage';
import LanguageSelector from './components/LanguageSelector';
import NotFoundPage from './pages/NotFoundPage';
import LanguageLayout from './pages/LanguageLayout';
import AdSlot from './components/AdSlot';
import Navbar from './components/Navbar';
import AboutPage from './pages/AboutPage';
import KvkkPage from './pages/KvkkPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import { useTranslation } from 'react-i18next';

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

function ForceLangSync() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  React.useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);
  return null;
}

const Footer = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  return (
    <Box component="footer" sx={{ mt: 8, py: 4, bgcolor: 'background.paper', borderTop: '1px solid #eee' }}>
      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1 }}>
          <MuiLink href={`/${lang}/about`} underline="hover">About</MuiLink>
          <MuiLink href={`/${lang}/kvkk`} underline="hover">Privacy Policy</MuiLink>
          <MuiLink href={`/${lang}/terms`} underline="hover">Terms</MuiLink>
          <MuiLink href={`/${lang}/contact`} underline="hover">Contact</MuiLink>
        </Box>
        <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} QuickToPDF</Typography>
      </Container>
    </Box>
  );
};

const App = () => {
  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Router>
            <AdSlot slot="vertical" />
            <AdSlot slot="vertical-left" />
            <ForceLangSync />
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/en" replace />} />
              <Route path="/:lang" element={<LanguageLayout />}>
                <Route index element={<HomePage />} />
                <Route path="convert/:conversionType" element={<ConvertPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="kvkk" element={<KvkkPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="terms" element={<TermsPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
