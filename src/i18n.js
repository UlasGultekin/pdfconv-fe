import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      welcome: 'PDF dosyalarınızı hızlıca dönüştürün.',
      start: 'Dönüştürmeye Başla',
      formTitle: 'Dönüştürme Formu',
      formDesc: 'PDF dosyanızı yükleyin ve dönüştürme işlemini başlatın.',
      convertType: 'Dönüştürme Tipi',
      dragDrop: 'Dosyanızı buraya sürükleyin veya tıklayın',
      pdf: 'PDF',
      word: 'Word',
      excel: 'Excel',
      text: 'Metin',
      image: 'Görsel',
      csv: 'CSV',
      speech: 'Ses',
      audio: 'Ses',
      to: '→',
      pdfToWord: 'PDF → Word',
      wordToPdf: 'Word → PDF',
      pdfToExcel: 'PDF → Excel',
      excelToPdf: 'Excel → PDF',
      pdfToText: 'PDF → Metin',
      textToPdf: 'Metin → PDF',
      pdfToCsv: 'PDF → CSV',
      csvToPdf: 'CSV → PDF',
      excelToCsv: 'Excel → CSV',
      csvToExcel: 'CSV → Excel',
      excelToWord: 'Excel → Word',
      wordToExcel: 'Word → Excel',
      imageToText: 'Görsel → Metin',
      speechToText: 'Ses → Metin',
      textToSpeech: 'Metin → Ses',
      convert: 'Dönüştür',
      downloadResult: 'Sonucu İndir',
    }
  },
  en: {
    translation: {
      welcome: 'Quickly convert your PDF files.',
      start: 'Start Converting',
      formTitle: 'Conversion Form',
      formDesc: 'Upload your PDF and start the conversion process.',
      convertType: 'Convert Type',
      dragDrop: 'Drag & drop or click to select your file',
      pdf: 'PDF',
      word: 'Word',
      excel: 'Excel',
      text: 'Text',
      image: 'Image',
      csv: 'CSV',
      speech: 'Speech',
      audio: 'Audio',
      to: '→',
      pdfToWord: 'PDF → Word',
      wordToPdf: 'Word → PDF',
      pdfToExcel: 'PDF → Excel',
      excelToPdf: 'Excel → PDF',
      pdfToText: 'PDF → Text',
      textToPdf: 'Text → PDF',
      pdfToCsv: 'PDF → CSV',
      csvToPdf: 'CSV → PDF',
      excelToCsv: 'Excel → CSV',
      csvToExcel: 'CSV → Excel',
      excelToWord: 'Excel → Word',
      wordToExcel: 'Word → Excel',
      imageToText: 'Image → Text',
      speechToText: 'Speech → Text',
      textToSpeech: 'Text → Speech',
      convert: 'Convert',
      downloadResult: 'Download Result',
    }
  },
  es: {
    translation: {
      welcome: 'Convierte tus archivos PDF rápidamente.',
      start: 'Comenzar conversión',
      formTitle: 'Formulario de conversión',
      formDesc: 'Sube tu PDF y comienza el proceso de conversión.',
      convertType: 'Tipo de conversión',
      dragDrop: 'Arrastra y suelta o haz clic para seleccionar tu archivo',
      pdf: 'PDF', word: 'Word', excel: 'Excel', text: 'Texto', image: 'Imagen', csv: 'CSV', speech: 'Voz', audio: 'Audio', to: '→',
      pdfToWord: 'PDF → Word', wordToPdf: 'Word → PDF', pdfToExcel: 'PDF → Excel', excelToPdf: 'Excel → PDF', pdfToText: 'PDF → Texto', textToPdf: 'Texto → PDF', pdfToCsv: 'PDF → CSV', csvToPdf: 'CSV → PDF', excelToCsv: 'Excel → CSV', csvToExcel: 'CSV → Excel', excelToWord: 'Excel → Word', wordToExcel: 'Word → Excel', imageToText: 'Imagen → Texto', speechToText: 'Voz → Texto', textToSpeech: 'Texto → Voz', convert: 'Convertir', downloadResult: 'Descargar resultado',
    }
  },
  de: {
    translation: {
      welcome: 'Konvertieren Sie Ihre PDF-Dateien schnell.',
      start: 'Konvertierung starten',
      formTitle: 'Konvertierungsformular',
      formDesc: 'Laden Sie Ihre PDF-Datei hoch und starten Sie die Konvertierung.',
      convertType: 'Konvertierungstyp',
      dragDrop: 'Datei hierher ziehen oder klicken, um auszuwählen',
      pdf: 'PDF', word: 'Word', excel: 'Excel', text: 'Text', image: 'Bild', csv: 'CSV', speech: 'Sprache', audio: 'Audio', to: '→',
      pdfToWord: 'PDF → Word', wordToPdf: 'Word → PDF', pdfToExcel: 'PDF → Excel', excelToPdf: 'Excel → PDF', pdfToText: 'PDF → Text', textToPdf: 'Text → PDF', pdfToCsv: 'PDF → CSV', csvToPdf: 'CSV → PDF', excelToCsv: 'Excel → CSV', csvToExcel: 'CSV → Excel', excelToWord: 'Excel → Word', wordToExcel: 'Word → Excel', imageToText: 'Bild → Text', speechToText: 'Sprache → Text', textToSpeech: 'Text → Sprache', convert: 'Konvertieren', downloadResult: 'Ergebnis herunterladen',
    }
  },
  ar: {
    translation: {
      welcome: 'حوّل ملفات PDF الخاصة بك بسرعة.',
      start: 'ابدأ التحويل',
      formTitle: 'نموذج التحويل',
      formDesc: 'قم بتحميل ملف PDF وابدأ عملية التحويل.',
      convertType: 'نوع التحويل',
      dragDrop: 'اسحب الملف هنا أو انقر لاختياره',
      pdf: 'PDF', word: 'وورد', excel: 'إكسل', text: 'نص', image: 'صورة', csv: 'CSV', speech: 'صوت', audio: 'صوت', to: '→',
      pdfToWord: 'PDF → وورد', wordToPdf: 'وورد → PDF', pdfToExcel: 'PDF → إكسل', excelToPdf: 'إكسل → PDF', pdfToText: 'PDF → نص', textToPdf: 'نص → PDF', pdfToCsv: 'PDF → CSV', csvToPdf: 'CSV → PDF', excelToCsv: 'إكسل → CSV', csvToExcel: 'CSV → إكسل', excelToWord: 'إكسل → وورد', wordToExcel: 'وورد → إكسل', imageToText: 'صورة → نص', speechToText: 'صوت → نص', textToSpeech: 'نص → صوت', convert: 'تحويل', downloadResult: 'تحميل النتيجة',
    }
  },
  hi: {
    translation: {
      welcome: 'अपने PDF फ़ाइलों को जल्दी से कनवर्ट करें।',
      start: 'कन्वर्ट करना शुरू करें',
      formTitle: 'कन्वर्शन फॉर्म',
      formDesc: 'अपनी PDF फ़ाइल अपलोड करें और कन्वर्शन प्रक्रिया शुरू करें।',
      convertType: 'कन्वर्शन प्रकार',
      dragDrop: 'अपनी फ़ाइल को यहाँ ड्रैग करें या क्लिक करें',
      pdf: 'PDF', word: 'Word', excel: 'Excel', text: 'पाठ', image: 'छवि', csv: 'CSV', speech: 'Speech', audio: 'Audio', to: '→',
      pdfToWord: 'PDF → Word', wordToPdf: 'Word → PDF', pdfToExcel: 'PDF → Excel', excelToPdf: 'Excel → PDF', pdfToText: 'PDF → पाठ', textToPdf: 'पाठ → PDF', pdfToCsv: 'PDF → CSV', csvToPdf: 'CSV → PDF', excelToCsv: 'Excel → CSV', csvToExcel: 'CSV → Excel', excelToWord: 'Excel → Word', wordToExcel: 'Word → Excel', imageToText: 'छवि → पाठ', speechToText: 'Speech → पाठ', textToSpeech: 'पाठ → Speech', convert: 'कन्वर्ट करें', downloadResult: 'परिणाम डाउनलोड करें',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 