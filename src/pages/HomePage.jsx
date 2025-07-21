import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SeoMeta from '../components/SeoMeta';
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
  const { t } = useTranslation();
  const { lang } = useParams();

  const getLabel = (item) => {
    const [from, to] = item.type.split('-to-');
    const fromText = t(from, from.charAt(0).toUpperCase() + from.slice(1));
    const toText = t(to, to.charAt(0).toUpperCase() + to.slice(1));
    return `${fromText} ${t('to', '→')} ${toText}`;
  };

  return (
    <Container maxWidth="md">
      <SeoMeta pageKey="home" />
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <AdSlot slot="header" height={90} />
        <Typography variant="h1" component="h1" sx={{ color: 'primary.main', mb: 1 }}>
          PDFConv
        </Typography>
        <Typography variant="h5" component="h2" sx={{ color: 'text.secondary', mb: 3 }}>
          {t('homepage.subtitle')}
        </Typography>
        <AdSlot slot="grid-top" height={60} />
      </Box>
      <Grid container spacing={3}>
        {CONVERT_GRID.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.type}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'box-shadow 0.3s, transform 0.3s',
                '&:hover': { boxShadow: 6, transform: 'translateY(-5px)' },
                minHeight: 150
              }}
              onClick={() => navigate(`/${lang}/convert/${item.type}`)}
            >
              {item.icon}
              <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600, textAlign: 'center' }}>
                {getLabel(item)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <AdSlot slot="footer" height={90} />
    </Container>
  );
} 