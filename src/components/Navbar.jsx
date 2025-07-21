import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { lang = 'en' } = useParams();
  const { t } = useTranslation();
  return (
    <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 2 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h6"
              component={Link}
              to={`/${lang}`}
              sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 700, fontSize: 28 }}
            >
              QuickToPDF
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button component={Link} to={`/${lang}/about`} color="inherit" sx={{ fontWeight: 600 }}>
              {t('nav.about', 'Hakkımızda')}
            </Button>
            <Button component={Link} to={`/${lang}/kvkk`} color="inherit" sx={{ fontWeight: 600 }}>
              {t('nav.kvkk', 'KVKK')}
            </Button>
            <LanguageSelector position="static" sx={{ ml: 2 }} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 