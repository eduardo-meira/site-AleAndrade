import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config(); // Apenas usado localmente

const app = express();
const PORT = process.env.PORT || 3000;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

app.use(cors());
app.use(express.json());

// Log para checar se variáveis estão chegando
console.log('=== Iniciando Backend ===');
console.log('FOLDER_ID:', FOLDER_ID);
console.log('API_KEY:', API_KEY ? 'Existe' : 'Não existe');

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
      console.error('Erro na resposta da Google Drive API:', response.statusText);
      return res.status(500).json({ error: 'Erro na resposta da Google Drive API' });
    }

    const data = await response.json();
    console.log('Dados recebidos da API do Drive:', data);

    if (!Array.isArray(data.files)) {
      console.error('Formato inesperado de dados:', data);
      return res.status(500).json({ error: 'Formato de dados inesperado da Drive API' });
    }

    // Monta o array de imagens
    const files = data.files.map(file => ({
      name: file.name,
      src: `https://drive.google.com/uc?id=${file.id}`,
    }));

    return res.json(files);

  } catch (err) {
    console.error('Erro ao acessar Drive API:', err);
    return res.status(500).json({ error: 'Erro ao acessar Drive API' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
