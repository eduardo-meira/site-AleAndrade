import express from 'express'
import fetch from 'node-fetch'

const app = express()
const PORT = process.env.PORT || 3000
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID
const API_KEY = process.env.GOOGLE_API_KEY

app.get('/api/galeria', async (req, res) => {
  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`
    const response = await fetch(url)
    const data = await response.json()

    if (!data.files || !Array.isArray(data.files)) {
      return res.status(500).json({ error: 'Erro ao acessar Drive API' })
    }

    const imagens = data.files
      .filter((file: any) => file.mimeType.startsWith('image/'))
      .map((file: any) => ({
        src: `https://drive.google.com/uc?id=${file.id}`,
        alt: file.name,
      }))

    res.json(imagens)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao acessar Drive API' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
