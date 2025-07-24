import React, { useState, useLayoutEffect, useEffect } from 'react';
import { useParams, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Box, Typography, Button, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SeoMeta from '../components/SeoMeta';
import { SEO_META } from '../utils/seo';
import { renderAsync } from 'docx-preview';
import '../assets/docx-preview.css';
import * as XLSX from 'xlsx';
import AdSlot from '../components/AdSlot';

export default function ConvertPage() {
  const { lang = 'en', conversionType } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. If the URL parameter hasn't loaded, show a loader.
  // This prevents the "uncontrolled input" warning.
  if (!conversionType) {
    return <CircularProgress />;
  }

  // 2. If the parameter is invalid, navigate to the 404 page.
  if (!SEO_META[conversionType]) {
    return <Navigate to="/not-found" replace />;
  }
  
  const meta = SEO_META[conversionType][lang] || SEO_META[conversionType]['en'];
  
  const CONVERT_OPTIONS = Object.keys(SEO_META).map(key => ({
      value: key,
      label: SEO_META[key][lang]?.label || SEO_META[key]['en'].label,
      accept: key.includes('image') ? 'image/*' : key.includes('audio') ? 'audio/*' : '.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt'
  }));

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [textPreview, setTextPreview] = useState('');
  const [wordPreviewHtml, setWordPreviewHtml] = useState('');
  const [wordArrayBuffer, setWordArrayBuffer] = useState(null);
  const [excelPreview, setExcelPreview] = useState(null);
  const wordPreviewRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    navigate(`/${lang}/convert/${newType}`);
  };
  const selectedOption = CONVERT_OPTIONS.find(opt => opt.value === conversionType) || CONVERT_OPTIONS[0];
  const MAX_SIZE = 20 * 1024 * 1024;
  const isFileTypeValid = (file) => {
    if (!file) return false;
    if (selectedOption.accept === 'image/*') return file.type.startsWith('image/');
    if (selectedOption.accept === 'audio/*') return file.type.startsWith('audio/');
    return selectedOption.accept.split(',').some(ext => file.name.toLowerCase().endsWith(ext.trim()));
  };
  const handleFileChange = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!isFileTypeValid(f)) {
      setError(i18n.language === 'tr' ? 'Dosya türü geçersiz.' : 'Invalid file type.');
      setFile(null); setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      return;
    }
    if (f.size > MAX_SIZE) {
      setError(i18n.language === 'tr' ? 'Dosya çok büyük (max 20MB).' : 'File too large (max 20MB).');
      setFile(null); setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      return;
    }
    setFile(f); setError(''); setDownloadUrl('');
    if (f.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(f)); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
    } else if (f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || f.name.endsWith('.docx')) {
      setPreviewUrl(''); setTextPreview(''); setExcelPreview(null);
      const reader = new FileReader();
      reader.onload = function(e) {
        setWordArrayBuffer(new Uint8Array(e.target.result));
      };
      reader.readAsArrayBuffer(f);
    } else if (
      f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      f.type === 'application/vnd.ms-excel' ||
      f.name.endsWith('.xlsx') || f.name.endsWith('.xls')
    ) {
      setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null);
      const reader = new FileReader();
      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelPreview(json.slice(0, 10));
      };
      reader.readAsArrayBuffer(f);
    } else if (f.type.startsWith('text/') || f.name.endsWith('.csv')) {
      setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      const reader = new FileReader();
      reader.onload = function(e) {
        setTextPreview(e.target.result.split('\n').slice(0, 10).join('\n'));
      };
      reader.readAsText(f);
    } else {
      setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
    }
  };

  // useEffect ile wordArrayBuffer ve ref hazırsa docx-preview render et
  useLayoutEffect(() => {
    if (wordArrayBuffer && wordPreviewRef.current) {
      wordPreviewRef.current.innerHTML = '';
      renderAsync(wordArrayBuffer, wordPreviewRef.current, undefined, { inWrapper: false }).then(() => {
        setWordPreviewHtml('rendered');
      });
    }
  }, [wordArrayBuffer]);

  // Dil eşitleme: URL'den lang alınır ve i18n'e uygulanır
  // This hook is removed as it's handled globally
  // useEffect(() => {
  //   if (lang && i18n.language !== lang) {
  //     i18n.changeLanguage(lang);
  //   }
  // }, [lang, i18n]);

  const handleDrop = async (e) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      if (!isFileTypeValid(f)) {
        setError(i18n.language === 'tr' ? 'Dosya türü geçersiz.' : 'Invalid file type.');
        setFile(null); setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
        return;
      }
      if (f.size > MAX_SIZE) {
        setError(i18n.language === 'tr' ? 'Dosya çok büyük (max 20MB).' : 'File too large (max 20MB).');
        setFile(null); setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
        return;
      }
      setFile(f); setError(''); setDownloadUrl('');
      if (f.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(f)); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      } else if (f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || f.name.endsWith('.docx')) {
        setPreviewUrl(''); setTextPreview(''); setExcelPreview(null);
        const reader = new FileReader();
        reader.onload = function(e) {
          setWordArrayBuffer(new Uint8Array(e.target.result));
        };
        reader.readAsArrayBuffer(f);
      } else if (
        f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        f.type === 'application/vnd.ms-excel' ||
        f.name.endsWith('.xlsx') || f.name.endsWith('.xls')
      ) {
        setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null);
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setExcelPreview(json.slice(0, 10));
        };
        reader.readAsArrayBuffer(f);
      } else if (f.type.startsWith('text/') || f.name.endsWith('.csv')) {
        setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
        const reader = new FileReader();
        reader.onload = function(e) {
          setTextPreview(e.target.result.split('\n').slice(0, 10).join('\n'));
        };
        reader.readAsText(f);
      } else {
        setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      }
    }
  };
  const handleRemoveFile = () => {
    setFile(null); setDownloadUrl(''); setError(''); setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
    if (wordPreviewRef.current) wordPreviewRef.current.innerHTML = '';
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };
  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDownloadUrl('');
    if (!file) {
      setError(i18n.language === 'tr' ? 'Lütfen bir dosya seçin.' : 'Please select a file.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch(`${API_BASE}/convert/${conversionType}`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error(i18n.language === 'tr' ? 'Dönüştürme başarısız.' : 'Conversion failed.');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  function getDownloadName(originalName, convertType) {
    if (!originalName) return '';
    const extMap = {
      'pdf-to-word': '.docx',
      'word-to-pdf': '.pdf',
      'pdf-to-excel': '.xlsx',
      'excel-to-pdf': '.pdf',
      'pdf-to-text': '.txt',
      'text-to-pdf': '.pdf',
      'pdf-to-csv': '.csv',
      'csv-to-pdf': '.pdf',
      'excel-to-csv': '.csv',
      'csv-to-excel': '.xlsx',
      'excel-to-word': '.docx',
      'word-to-excel': '.xlsx',
      'image-to-text': '.txt',
      'speech-to-text': '.txt',
      'text-to-speech': '.mp3',
    };
    const ext = extMap[convertType] || '';
    const base = originalName.replace(/\.[^/.]+$/, '');
    return base + ext;
  }
  return (
    <Container maxWidth="md" sx={{ py: 6, position: 'relative' }}>
      {/* Dikey reklamlar sadece masaüstünde görünür */}
      <AdSlot key={location.pathname + '-left'} slot="vertical-left" />
      <AdSlot key={location.pathname + '-right'} slot="vertical" />
      <SeoMeta {...meta} />
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700, mb: 2 }}>
          {meta.label}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Convert your files quickly and securely. All files are deleted automatically after conversion. No registration required.
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <b>How to use?</b> Select your file, click convert, and download the result instantly. Your privacy is our priority.
        </Typography>
      </Box>
      
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>{t('convertType')}</InputLabel>
        <Select
            value={conversionType}
            label={t('convertType')}
            onChange={(e) => navigate(`/${lang}/convert/${e.target.value}`)}
        >
          {CONVERT_OPTIONS.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper 
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: { xs: 2, sm: 4 }, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <Box
          sx={{
            border: dragActive ? '2px solid #6c47ff' : '2px dashed #bdbdbd',
            borderRadius: 4,
            p: 4,
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
            background: dragActive ? '#f3f0ff' : '#fafbfc',
            cursor: 'pointer',
            transition: 'border 0.2s, background 0.2s',
            mb: 2
          }}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          tabIndex={0}
          role="button"
          aria-label={i18n.language === 'tr' ? 'Dosya seç' : 'Select file'}
        >
          {!file ? (
            <>
              <CloudUploadIcon sx={{ fontSize: 48, color: '#6c47ff', mb: 1 }} />
              <Typography sx={{ color: '#888', mb: 1 }}>
                {t('dragDrop')}
              </Typography>
              <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                hidden
                accept={selectedOption.accept}
                onChange={handleFileChange}
                aria-label={i18n.language === 'tr' ? 'Dosya seç' : 'Select file'}
              />
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {previewUrl ? (
                <img src={previewUrl} alt="preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8, marginBottom: 8 }} />
              ) : (
                <InsertDriveFileIcon sx={{ fontSize: 40, color: '#6c47ff' }} />
              )}
              <Typography sx={{ mt: 1, fontWeight: 600 }}>{file.name}</Typography>
              <Button onClick={handleRemoveFile} size="small" color="secondary" sx={{ mt: 1 }}>
                {i18n.language === 'tr' ? 'Kaldır' : 'Remove'}
              </Button>
            </Box>
          )}
        </Box>
        {/* Önizleme kutusu */}
        {file && (
          <Box sx={{
            border: '1px solid #e0e0e0',
            borderRadius: 3,
            p: 2,
            mb: 2,
            width: '100%',
            maxWidth: 400,
            background: '#fafbfc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {previewUrl && (
              <img src={previewUrl} alt="preview" style={{ maxWidth: 180, maxHeight: 180, borderRadius: 8, marginBottom: 8 }} />
            )}
            {wordPreviewHtml && (
              <Box ref={wordPreviewRef} className="docx-wrapper" sx={{ width: '100%', minHeight: 120, maxHeight: 320, overflow: 'auto', background: '#f4f6fa', borderRadius: 2, p: 1, mb: 1, border: '1px solid #e0e0e0' }} />
            )}
            {excelPreview && (
              <Box sx={{ width: '100%', maxWidth: 400, overflow: 'auto', background: '#f4f6fa', borderRadius: 2, p: 1, mb: 1, border: '1px solid #e0e0e0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <tbody>
                    {excelPreview.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ border: '1px solid #ccc', padding: 4 }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            )}
            {textPreview && (
              <Box sx={{ width: '100%', maxHeight: 120, overflow: 'auto', background: '#f4f6fa', borderRadius: 2, p: 1, mb: 1 }}>
                <pre style={{ margin: 0, fontSize: 13, color: '#333' }}>{textPreview}</pre>
              </Box>
            )}
            {!previewUrl && !wordPreviewHtml && !excelPreview && !textPreview && (
              <InsertDriveFileIcon sx={{ fontSize: 40, color: '#6c47ff', mb: 1 }} />
            )}
            <Typography sx={{ fontWeight: 600 }}>{file.name}</Typography>
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary" disabled={loading || !file} sx={{ width: 220, fontSize: '1.1rem' }} aria-busy={loading} aria-label={t('convert')}>
          {loading ? <CircularProgress size={24} /> : t('convert')}
        </Button>
        {error && <Alert severity="error" sx={{ width: '100%', maxWidth: 400 }}>{error}</Alert>}
        {loading && !error && <Alert severity="info" sx={{ width: '100%', maxWidth: 400 }}>{i18n.language === 'tr' ? 'Dönüştürülüyor...' : 'Converting...'}</Alert>}
        {downloadUrl && (
          <Button href={downloadUrl} download={getDownloadName(file?.name, conversionType)} target="_blank" variant="contained" color="success" startIcon={<CheckCircleIcon />} sx={{ width: 220, fontSize: '1.1rem' }}>
            {t('downloadResult')}
          </Button>
        )}
      </Paper>
      <AdSlot slot="footer" height={90} />
    </Container>
  );
} 