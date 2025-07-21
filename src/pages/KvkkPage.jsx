import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';

const KvkkPage = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
        {t('kvkk.title', 'KVKK & Gizlilik Politikası')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {t('kvkk.intro', 'QuickToPDF olarak kullanıcı gizliliğine büyük önem veriyoruz. Kişisel verileriniz hiçbir şekilde saklanmaz, paylaşılmaz veya üçüncü şahıslarla paylaşılmaz.')}
      </Typography>
      <Typography variant="h5" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>{t('kvkk.rulesTitle', 'KVKK Kuralları')}</Typography>
      <List>
        <ListItem><ListItemText primary={t('kvkk.rule1', 'Yüklediğiniz dosyalar yalnızca dönüşüm işlemi için kullanılır ve iş bittikten sonra otomatik olarak silinir.')} /></ListItem>
        <ListItem><ListItemText primary={t('kvkk.rule2', 'Hiçbir dosya veya kişisel veri sunucularımızda kalıcı olarak tutulmaz.')} /></ListItem>
        <ListItem><ListItemText primary={t('kvkk.rule3', 'Tüm veriler 5 dakikada bir sistemden tamamen silinir.')} /></ListItem>
        <ListItem><ListItemText primary={t('kvkk.rule4', 'Kullanıcıya ait hiçbir bilgi üçüncü şahıslarla paylaşılmaz.')} /></ListItem>
      </List>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          {t('kvkk.note', 'Verilerinizin güvenliği için en üst düzeyde önlem alınmaktadır. QuickToPDF ile işlemleriniz tamamen güvenli ve gizlidir.')}
        </Typography>
      </Box>
    </Container>
  );
};

export default KvkkPage; 