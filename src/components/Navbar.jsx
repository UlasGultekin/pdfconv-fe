import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const CONVERT_GRID = [
  { type: 'pdf-to-word', icon: <DescriptionIcon fontSize="small" color="primary" /> },
  { type: 'word-to-pdf', icon: <DescriptionIcon fontSize="small" color="primary" /> },
  { type: 'pdf-to-excel', icon: <TableChartIcon fontSize="small" color="secondary" /> },
  { type: 'excel-to-pdf', icon: <TableChartIcon fontSize="small" color="secondary" /> },
  { type: 'pdf-to-text', icon: <TextFieldsIcon fontSize="small" color="primary" /> },
  { type: 'text-to-pdf', icon: <TextFieldsIcon fontSize="small" color="primary" /> },
  { type: 'pdf-to-csv', icon: <TableChartIcon fontSize="small" color="secondary" /> },
  { type: 'csv-to-pdf', icon: <TableChartIcon fontSize="small" color="secondary" /> },
  { type: 'excel-to-csv', icon: <TableChartIcon fontSize="small" color="secondary" /> },
  { type: 'csv-to-excel', icon: <TableChartIcon fontSize="small" color="secondary" /> },
  { type: 'excel-to-word', icon: <DescriptionIcon fontSize="small" color="primary" /> },
  { type: 'word-to-excel', icon: <TableChartIcon fontSize="small" color="secondary" /> },
  { type: 'image-to-text', icon: <ImageIcon fontSize="small" color="secondary" /> },
  { type: 'speech-to-text', icon: <AudiotrackIcon fontSize="small" color="primary" /> },
  { type: 'text-to-speech', icon: <AudiotrackIcon fontSize="small" color="primary" /> },
];

const Navbar = () => {
  const { lang = 'en' } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const getLabel = (item) => {
    const [from, to] = item.type.split('-to-');
    const fromText = t(from, from.charAt(0).toUpperCase() + from.slice(1));
    const toText = t(to, to.charAt(0).toUpperCase() + to.slice(1));
    return `${fromText} ${t('to', '→')} ${toText}`;
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (type) => {
    navigate(`/${lang}/convert/${type}`);
    setAnchorEl(null);
  };

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
            <Button
              color="inherit"
              sx={{ fontWeight: 600, ml: 2 }}
              onClick={handleMenu}
            >
              {t('nav.tools', 'İşlemler')}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {CONVERT_GRID.map(item => (
                <MenuItem key={item.type} onClick={() => handleSelect(item.type)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {getLabel(item)}
                </MenuItem>
              ))}
            </Menu>
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