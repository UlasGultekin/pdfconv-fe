import React from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';

const SUPPORTED_LANGUAGES = ['en', 'tr', 'es', 'fr', 'de'];

const LanguageLayout = () => {
  const { lang } = useParams();

  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return <Navigate to="/not-found" replace />;
  }

  // Renders the nested route (HomePage or ConvertPage)
  return <Outlet />; 
};

export default LanguageLayout; 