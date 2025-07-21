import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h1" sx={{ color: 'primary.main', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Oops! Page not found.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Homepage
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage; 