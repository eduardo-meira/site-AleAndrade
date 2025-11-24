import express, { Request, Response } from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID
const API_KEY = process.env.GOOGLE_API_KEY

app.use(cors())
app.use(express.json())

// --- Rota de teste das variáveis de ambiente ---
app.get('/api/test-env', (req: Request, res: Response) => {
  console.log('=== Variáveis de ambiente iniciais ===')
  console.log('FOLDER_ID:', FOLDER_ID)
  console.log('API_KEY:', API_KEY)
  console.log('PORT:', PORT)

  res.json({
    FOLDER_ID: FOLDER_ID || null,
    API_KEY: API_KEY || null,
    PORT: PORT,
  })
})

// --- Rota da galeria ---
app.get('/api/galeria', async (req: Request, res: Response) => {
  if (!FOLDER_ID || !API_KEY) {
    console.error('Variáveis de ambiente faltando!')
    return res.status(500).json({ error: 'Variáveis de ambiente faltando no backend' })
  }

  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`
    const response = await fetch(url)
    const data = await response.json()

    if (!data.files || !Array.isArray(data.files)) {
      console.error('Erro ao acessar Drive API: resposta inesperada', data)
      return res.status(500).json({ error: 'Erro ao acessar Drive API' })
    }

    // Monta array de imagens para o frontend
    const imagens = data.files
      .filter((file: any) => file.mimeType.startsWith('image/'))
      .map((file: any) => ({
        src: `https://drive.google.com/uc?id=${file.id}`,
        alt: file.name,
      }))

    res.json(imagens)
  } catch (err) {
    console.error('Erro ao acessar Drive API:', err)
    res.status(500).json({ error: 'Erro ao acessar Drive API' })
  }
})

// --- Inicia o servidor ---
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`)
})
