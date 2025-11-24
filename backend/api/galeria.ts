import type { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Substitua aqui pela sua pasta do Google Drive e sua API Key
  const FOLDER_ID = '1mhFZ9GjNAjt3ZxO4QV6qUNwu3lSTfJVo'
  const API_KEY = 'AIzaSyCC-kv3OB8PbRSpb_WfG8TrX0V6Gg9bYJg'

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

    res.status(200).json(imagens)
  } catch (err) {
    console.error('Erro ao acessar Drive API:', err)
    res.status(500).json({ error: 'Erro ao acessar Drive API' })
  }
}
