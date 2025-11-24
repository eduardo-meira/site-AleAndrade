import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

async function getDriveFiles() {
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Erro na Drive API:', data.error);
      return { error: 'Erro ao acessar Drive API' };
    }

    const files = data.files.map((file: any) => ({
      name: file.name,
      src: `https://drive.google.com/uc?export=view&id=${file.id}`,
      mimeType: file.mimeType
    }));

    return files;
  } catch (error) {
    console.error('Erro ao buscar arquivos:', error);
    return { error: 'Erro ao acessar Drive API' };
  }
}

app.get('/api/galeria', async (req: Request, res: Response) => {
  const files = await getDriveFiles();
  res.json(files);
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
