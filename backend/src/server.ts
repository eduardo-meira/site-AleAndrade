import express from 'express';
import driveRoutes from "./routes/drive.js";
import cors from 'cors';
import dotenv from 'dotenv';
import { pipeline } from 'stream';
import { promisify } from 'util';

import type { Request, Response } from 'express';

dotenv.config();

const streamPipeline = promisify(pipeline);

const app = express();
const PORT = process.env.PORT || 3000;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

app.use(cors());

// Rota para listar imagens da pasta do Drive
app.get('/api/galeria', async (req: Request, res: Response) => {
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`;
    const response = await fetch(url);

    if (!response.ok) return res.status(response.status).json({ error: 'Erro ao acessar Drive API' });

    const data = await response.json();
    if (!data.files) return res.status(500).json({ error: 'Nenhum arquivo encontrado ou chave inválida' });

    const imagens = data.files
      .filter((file: any) => file.mimeType.startsWith('image/'))
      .map((file: any) => ({ id: file.id, alt: file.name, src: `/api/imagem/${file.id}` }));

    res.json(imagens);
  } catch (err: any) {
    res.status(500).json({ error: err.message || String(err) });
  }
});

// Rota proxy para cada imagem
app.get('/api/imagem/:id', async (req: Request, res: Response) => {
  try {
    const fileId = req.params.id;
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).json({ error: 'Erro ao baixar imagem' });

    const contentType = response.headers.get('content-type');
    if (contentType) res.setHeader('Content-Type', contentType);

    const nodeStream = response.body as unknown as NodeJS.ReadableStream;
    await streamPipeline(nodeStream, res);
  } catch (err: any) {
    res.status(500).json({ error: err.message || String(err) });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
app.use("/api", driveRoutes);
