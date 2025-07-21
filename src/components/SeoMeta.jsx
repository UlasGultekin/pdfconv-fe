import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SeoMeta = ({ title, description, keywords }) => {
  const { i18n, t } = useTranslation();
  
  const pageTitle = title || t('seo.title', 'QuickToPDF - Convert Your Files');
  const pageDesc = description || t('seo.description', 'A fast and free online file converter.');
  const pageKeywords = keywords || t('seo.keywords', 'pdf, converter, online, free');

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
    </Helmet>
  );
};

export default SeoMeta; 