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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const { t, ready } = useTranslation();
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
        <Typography variant="h1" component="h1" sx={{ color: 'primary.main', mb: 1 }}>
          {ready ? t('homepage.title') : ''}
        </Typography>
        <Typography variant="h5" component="h2" sx={{ color: 'text.secondary', mb: 2 }}>
          {ready ? t('homepage.subtitle') : ''}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, mt: 3 }}>
          {t('homepage.desc')}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <b>{t('homepage.howto')}</b>
        </Typography>
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
      <Typography variant="caption" color="text.secondary" sx={{ mt: 4, display: 'block', textAlign: 'center' }}>
        Note: No ads are shown on error or dead-end pages in compliance with AdSense policies.
      </Typography>
      {/* Bilgilendirici içerik ve blog bölümü */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 700, textAlign: 'center' }}>
          {t('homepage.infoTitle')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{t('homepage.info1')}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{t('homepage.info2')}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{t('homepage.info3')}</Typography>
        <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>{t('homepage.guideTitle')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.guide1')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.guide2')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.guide3')}</Typography>
        <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>{t('homepage.securityTitle')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.security1')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.security2')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.security3')}</Typography>
        <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>{t('homepage.benefitsTitle')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.benefit1')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.benefit2')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.benefit3')}</Typography>
        <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'primary.main', fontWeight: 600 }}>{t('homepage.blogTitle')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.blog1')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.blog2')}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{t('homepage.blog3')}</Typography>
      </Box>
      {/* FAQ Section - Accordion */}
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" sx={{ mb: 2, color: 'primary.main', fontWeight: 700, textAlign: 'center' }}>
          {t('faq.title')}
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{t('faq.q1')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{t('faq.a1')}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{t('faq.q2')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{t('faq.a2')}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{t('faq.q3')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{t('faq.a3')}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{t('faq.q4')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{t('faq.a4')}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
} 