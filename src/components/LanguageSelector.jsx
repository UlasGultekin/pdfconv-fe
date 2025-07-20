import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu, MenuItem, IconButton, Box, Typography, ListItemIcon } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const LANGUAGES = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

export default function LanguageSelector({ position = 'absolute', top = 16, right = 24 }) {
  const navigate = useNavigate();
  const { lang = 'en' } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[1];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (code) => {
    if (code !== lang) {
      const path = window.location.pathname.replace(/^\/[a-z]{2}/, '/' + code);
      navigate(path);
    }
    setAnchorEl(null);
  };

  return (
    <Box sx={{ position, top, right, zIndex: 1000 }}>
      <IconButton onClick={handleClick} size="large" sx={{ bgcolor: 'white', border: '1px solid #eee', boxShadow: 1 }}>
        <span style={{ fontSize: 22, marginRight: 6 }}>{current.flag}</span>
        <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>{current.name}</Typography>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {LANGUAGES.map(l => (
          <MenuItem key={l.code} selected={l.code === lang} onClick={() => handleSelect(l.code)}>
            <ListItemIcon><span style={{ fontSize: 22 }}>{l.flag}</span></ListItemIcon>
            <Typography variant="body2">{l.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
} 