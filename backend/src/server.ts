import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

app.use(cors());
app.use(express.json());

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

interface ImageFile {
  name: string;
  src: string;
}

console.log('=== Variáveis de ambiente iniciais ===');
console.log('GOOGLE_DRIVE_FOLDER_ID:', FOLDER_ID);
console.log('GOOGLE_API_KEY:', API_KEY ? 'Existe' : 'Não existe');
console.log('PORT:', PORT);
console.log('=====================================');

app.get('/api/test-env', (req, res) => {
  res.json({
    FOLDER_ID: process.env.GOOGLE_DRIVE_FOLDER_ID || null,
    API_KEY: process.env.GOOGLE_API_KEY || null,
    PORT: process.env.PORT || null,
  });
});

app.get('/api/galeria', async (req, res) => {
  if (!FOLDER_ID || !API_KEY) {
    console.error('Variáveis de ambiente faltando!');
    return res.status(500).json({ error: 'Variáveis de ambiente faltando no backend' });
  }

  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
    console.log('Chamando Google Drive API:', url);

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Erro na resposta da Google Drive API:', response.status, response.statusText);
      return res.status(500).json({ error: 'Erro na resposta da Google Drive API' });
    }

    const data: { files?: DriveFile[] } = await response.json();
    console.log('Dados recebidos da API do Drive:', data);

    let files: ImageFile[] = [];

    if (data && Array.isArray(data.files)) {
      files = data.files.map((file: DriveFile) => ({
        name: file.name,
        src: `https://drive.google.com/uc?id=${file.id}`,
      }));
    } else {
      console.error('Formato inesperado de dados do Drive:', data);
      return res.status(500).json({ error: 'Formato de dados inesperado da Drive API' });
    }

    return res.json(files);
  } catch (err) {
    console.error('Erro ao acessar Drive API:', err);
    return res.status(500).json({ error: 'Erro ao acessar Drive API' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
