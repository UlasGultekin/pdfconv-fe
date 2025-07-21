import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const useSyncLanguage = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentLang = i18n.language.split('-')[0];
    const targetLang = lang || 'en';

    if (currentLang !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    const onLanguageChanged = (lng) => {
      const currentPath = location.pathname;
      const currentLang = currentPath.split('/')[1];
      const newLang = lng.split('-')[0];
      
      if (currentLang !== newLang) {
        const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);
        if (newPath !== currentPath) {
          navigate(newPath);
        }
      }
    };

    i18n.on('languageChanged', onLanguageChanged);

    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, [i18n, location.pathname, navigate]);
};

export default useSyncLanguage; 