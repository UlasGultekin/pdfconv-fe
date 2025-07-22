import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
        {t('contact.title')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }} dangerouslySetInnerHTML={{ __html: t('contact.desc') }} />
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
        <TextField
          label={t('contact.name')}
          name="name"
          value={form.name}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          label={t('contact.email')}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          label={t('contact.message')}
          name="message"
          value={form.message}
          onChange={handleChange}
          variant="outlined"
          multiline
          rows={4}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={status === 'sending'}
          startIcon={status === 'sending' ? <CircularProgress size={18} color="inherit" /> : null}
        >
          {status === 'sending' ? t('contact.sending') : t('contact.send')}
        </Button>
        {status === 'sent' && <Alert severity="success">{t('contact.sent')} <br /> <span style={{ fontSize: 12 }}>{t('contact.demo')}</span></Alert>}
      </Box>
    </Container>
  );
};

export default ContactPage; 