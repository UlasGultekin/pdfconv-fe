import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const KvkkPage = () => {
  const { t } = useTranslation();
  const items = t('kvkk.long', { returnObjects: true });
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
        {t('kvkk.detailedTitle', t('kvkk.title'))}
      </Typography>
      {Array.isArray(items) && items.map((item, idx) => (
        <Box key={idx} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{item.title}</Typography>
          <Typography variant="body2">{item.desc}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default KvkkPage; 