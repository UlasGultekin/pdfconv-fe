import React, { useState, useLayoutEffect, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Box, Typography, Button, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SeoMeta from '../components/SeoMeta';
import { getSeoMeta, SEO_META } from '../utils/seo';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { renderAsync } from 'docx-preview';
import '../assets/docx-preview.css';
import * as XLSX from 'xlsx';
import LanguageSelector from '../components/LanguageSelector';
import AdSlot from '../components/AdSlot';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

export default function ConvertPage() {
  const { lang = 'en', convertType = 'pdf-to-word' } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const CONVERT_OPTIONS = Object.keys(SEO_META).map(key => {
    const [from, to] = key.split('-to-');
    return {
      value: key,
      label: `${t(from)} ${t('to')} ${t(to)}`,
      accept: key.includes('image') ? 'image/*' : key.includes('audio') ? 'audio/*' : '.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt'
    };
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('');
  const [textPreview, setTextPreview] = useState('');
  const [wordPreviewHtml, setWordPreviewHtml] = useState('');
  const [wordArrayBuffer, setWordArrayBuffer] = useState(null);
  const [excelPreview, setExcelPreview] = useState(null);
  const wordPreviewRef = React.useRef(null);
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    navigate(`/${lang}/convert/${newType}`);
  };
  const selectedOption = CONVERT_OPTIONS.find(opt => opt.value === convertType) || CONVERT_OPTIONS[0];
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
      setFile(null); setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      return;
    }
    if (f.size > MAX_SIZE) {
      setError(i18n.language === 'tr' ? 'Dosya çok büyük (max 20MB).' : 'File too large (max 20MB).');
      setFile(null); setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      return;
    }
    setFile(f); setError(''); setDownloadUrl('');
    if (f.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(f)); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
    } else if (f.type === 'application/pdf') {
      setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      const fileReader = new FileReader();
      fileReader.onload = async function() {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        setPdfPreviewUrl(canvas.toDataURL());
      };
      fileReader.readAsArrayBuffer(f);
    } else if (f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || f.name.endsWith('.docx')) {
      setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setExcelPreview(null);
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
      setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null);
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
      setPreviewUrl(''); setPdfPreviewUrl(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      const reader = new FileReader();
      reader.onload = function(e) {
        setTextPreview(e.target.result.split('\n').slice(0, 10).join('\n'));
      };
      reader.readAsText(f);
    } else {
      setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
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
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const handleDrop = async (e) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      if (!isFileTypeValid(f)) {
        setError(i18n.language === 'tr' ? 'Dosya türü geçersiz.' : 'Invalid file type.');
        setFile(null); setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
        return;
      }
      if (f.size > MAX_SIZE) {
        setError(i18n.language === 'tr' ? 'Dosya çok büyük (max 20MB).' : 'File too large (max 20MB).');
        setFile(null); setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
        return;
      }
      setFile(f); setError(''); setDownloadUrl('');
      if (f.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(f)); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      } else if (f.type === 'application/pdf') {
        setPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
        const fileReader = new FileReader();
        fileReader.onload = async function() {
          const typedarray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
          setPdfPreviewUrl(canvas.toDataURL());
        };
        fileReader.readAsArrayBuffer(f);
      } else if (f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || f.name.endsWith('.docx')) {
        setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setExcelPreview(null);
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
        setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null);
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
        setPreviewUrl(''); setPdfPreviewUrl(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
        const reader = new FileReader();
        reader.onload = function(e) {
          setTextPreview(e.target.result.split('\n').slice(0, 10).join('\n'));
        };
        reader.readAsText(f);
      } else {
        setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
      }
    }
  };
  const handleRemoveFile = () => {
    setFile(null); setDownloadUrl(''); setError(''); setPreviewUrl(''); setPdfPreviewUrl(''); setTextPreview(''); setWordPreviewHtml(''); setWordArrayBuffer(null); setExcelPreview(null);
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
      const res = await fetch(`${API_BASE}/convert/${convertType}`, {
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
  const meta = getSeoMeta(convertType, lang);

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
    <Container>
      <LanguageSelector position="absolute" top={16} right={24} />
      <AdSlot slot="header" height={90} />
      <SeoMeta meta={meta} url={`https://pdfconv.example.com/${lang}/convert/${convertType}`} />
      <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: 16, textAlign: 'center', color: '#333' }}>{t('formTitle')}</h2>
      <AdSlot slot="form-top" height={60} />
      <FormControl fullWidth sx={{ maxWidth: 400, mb: 2 }}>
        <InputLabel id="convert-type-label">{t('convertType')}</InputLabel>
        <Select
          labelId="convert-type-label"
          value={convertType}
          label={i18n.language === 'tr' ? 'Dönüştürme Tipi' : 'Convert Type'}
          onChange={handleTypeChange}
        >
          {CONVERT_OPTIONS.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        aria-label={i18n.language === 'tr' ? 'Dosya yükleme alanı' : 'File upload area'}
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
          onClick={() => document.getElementById('file-input').click()}
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
            {pdfPreviewUrl && (
              <img src={pdfPreviewUrl} alt="pdf preview" style={{ maxWidth: 180, maxHeight: 180, borderRadius: 8, marginBottom: 8, border: '1px solid #bdbdbd' }} />
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
            {!previewUrl && !pdfPreviewUrl && !wordPreviewHtml && !excelPreview && !textPreview && (
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
          <Button href={downloadUrl} download={getDownloadName(file?.name, convertType)} target="_blank" variant="contained" color="success" startIcon={<CheckCircleIcon />} sx={{ width: 220, fontSize: '1.1rem' }}>
            {t('downloadResult')}
          </Button>
        )}
      </Box>
      <AdSlot slot="footer" height={90} />
    </Container>
  );
} 