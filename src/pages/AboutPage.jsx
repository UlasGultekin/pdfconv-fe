import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
        {t('about.title', 'Hakkımızda')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {t('about.intro', 'QuickToPDF, dosyalarınızı hızlı ve güvenli bir şekilde dönüştürmenizi sağlayan tamamen ücretsiz bir platformdur. PDF, Word, Excel, görsel, ses ve metin dosyalarını kolayca birbirine çevirebilirsiniz. Kayıt olmanıza gerek yoktur ve tüm işlemler anında gerçekleşir.')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {t('about.detail1', 'QuickToPDF olarak, kullanıcılarımızın dijital belgelerini en yüksek güvenlik ve gizlilik standartlarında dönüştürmelerini sağlamak için çalışıyoruz. Platformumuzda hiçbir dosya kalıcı olarak saklanmaz; tüm işlemler şeffaf, hızlı ve güvenli şekilde gerçekleşir. Modern bulut altyapımız sayesinde, dosya boyutundan veya türünden bağımsız olarak her kullanıcıya eşit ve yüksek kaliteli hizmet sunuyoruz.')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {t('about.detail2', 'Kullanıcı deneyimini en üst düzeye çıkarmak için sürekli olarak teknolojimizi geliştiriyor, yeni dosya türleri ve dönüştürme seçenekleri ekliyoruz. QuickToPDF, sadece bir araç değil, aynı zamanda dijital belgelerle çalışan herkes için güvenilir bir yardımcıdır. Amacımız, karmaşık işlemleri herkes için kolay ve erişilebilir hale getirmektir.')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {t('about.detail3', 'Vizyonumuz, dünya çapında milyonlarca insanın dijital belgelerini güvenle yönetebileceği, hızlı ve ücretsiz bir platform sunmaktır. Misyonumuz ise, kullanıcılarımızın zamanını ve verilerini koruyarak, onlara en iyi çevrimiçi dosya dönüştürme deneyimini yaşatmaktır.')}
      </Typography>
      <Typography variant="h5" sx={{ mt: 4, mb: 1, fontWeight: 600 }}>{t('about.featuresTitle', 'Neler Yapabilirsiniz?')}</Typography>
      <List>
        <ListItem><ListItemText primary={t('about.feature1', 'PDF ↔ Word, Excel, Görsel, Ses ve Metin dosyalarını dönüştürme')} /></ListItem>
        <ListItem><ListItemText primary={t('about.feature2', 'PDF birleştirme, bölme, sıkıştırma ve düzenleme')} /></ListItem>
        <ListItem><ListItemText primary={t('about.feature3', 'Hiçbir ücret, gizli kısıtlama veya reklam engeli yok')} /></ListItem>
        <ListItem><ListItemText primary={t('about.feature4', 'Kullanıcı dostu ve çok dilli arayüz')} /></ListItem>
      </List>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" color="text.secondary">
          {t('about.freeNote', 'QuickToPDF tamamen ücretsizdir. Hiçbir dosyanız sunucularımızda tutulmaz ve işlemleriniz gizlidir.')}
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage; 