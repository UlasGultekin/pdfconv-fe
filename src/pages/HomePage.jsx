import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SeoMeta from '../components/SeoMeta';
import { getSeoMeta } from '../utils/seo';
import LanguageSelector from '../components/LanguageSelector';
import AdSlot from '../components/AdSlot';

const CONVERT_GRID = [
  { type: 'pdf-to-word', icon: <DescriptionIcon fontSize="large" color="primary" /> },
  { type: 'word-to-pdf', icon: <DescriptionIcon fontSize="large" color="primary" /> },
  { type: 'pdf-to-excel', icon: <TableChartIcon fontSize="large" color="secondary" /> },
  { type: 'excel-to-pdf', icon: <TableChartIcon fontSize="large" color="secondary" /> },
  { type: 'pdf-to-text', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
  { type: 'text-to-pdf', icon: <TextFieldsIcon fontSize="large" color="primary" /> },
  { type: 'pdf-to-csv', icon: <TableChartIcon fontSize="large" color="secondary" /> },
  { type: 'csv-to-pdf', icon: <TableChartIcon fontSize="large" color="secondary" /> },
  { type: 'excel-to-csv', icon: <TableChartIcon fontSize="large" color="secondary" /> },
  { type: 'csv-to-excel', icon: <TableChartIcon fontSize="large" color="secondary" /> },
  { type: 'excel-to-word', icon: <DescriptionIcon fontSize="large" color="primary" /> },
  { type: 'word-to-excel', icon: <TableChartIcon fontSize="large" color="secondary" /> },
  { type: 'image-to-text', icon: <ImageIcon fontSize="large" color="secondary" /> },
  { type: 'speech-to-text', icon: <AudiotrackIcon fontSize="large" color="primary" /> },
  { type: 'text-to-speech', icon: <AudiotrackIcon fontSize="large" color="primary" /> },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { lang = 'en' } = useParams();
  const meta = getSeoMeta(null, lang);
  // Dil eşitleme: URL'den lang alınır ve i18n'e uygulanır
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);
  const getLabel = (item) => {
    const [from, to] = item.type.split('-to-');
    return `${t(from)} ${t('to')} ${t(to)}`;
  };
  const handleLangChange = (newLang) => {
    if (newLang !== lang) navigate(`/${newLang}`);
  };
  return (
    <Container>
      <SeoMeta meta={meta} url={`https://pdfconv.example.com/${lang}`} />
      <LanguageSelector position="absolute" top={16} right={24} />
      <AdSlot slot="header" height={90} />
      <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: 8, textAlign: 'center', color: '#6c47ff' }}>PDFConv</h1>
      <h2 style={{ fontWeight: 600, fontSize: '1.3rem', marginBottom: 24, textAlign: 'center', color: '#444' }}>{t('welcome')}</h2>
      <AdSlot slot="grid-top" height={60} />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {CONVERT_GRID.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.type}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 10, background: '#f3f0ff' },
                minHeight: 140
              }}
              onClick={() => navigate(`/${lang}/convert/${item.type}`)}
            >
              {item.icon}
              {/* Kartlarda label'ı dinamik oluştur: */}
              {/* const [from, to] = item.type.split('-to-'); */}
              {/* const label = `${t(from)} ${t('to')} ${t(to)}`; */}
              <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600, textAlign: 'center' }}>{getLabel(item)}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <AdSlot slot="footer" height={90} />
      <Box sx={{ mt: 4, mb: 2, textAlign: 'center', color: '#888', fontSize: 14 }}>
        Bu uygulama, Google AdSense uyumlu, reklam dostu yerleşimlerle geliştirilecektir. Kullanıcıyı rahatsız etmeyecek, ama reklam performansını maksimize edecek yapı hedeflenmektedir.
      </Box>
    </Container>
  );
} 