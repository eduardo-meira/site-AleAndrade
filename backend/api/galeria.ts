import fetch from 'node-fetch'

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID
const API_KEY = process.env.GOOGLE_API_KEY

export default async function handler(req: any, res: any) {
  console.log('Iniciando API Galeria...')

  if (!FOLDER_ID || !API_KEY) {
    console.error('Variáveis de ambiente faltando')
    return res.status(500).json({ error: 'Variáveis de ambiente faltando' })
  }

  try {
    const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`
    console.log('URL de requisição Google Drive:', url)

    const response = await fetch(url)
    const data = await response.json()
    console.log('Resposta do Google Drive:', data)

    if (!data.files || !Array.isArray(data.files) || data.files.length === 0) {
      console.error('Nenhum arquivo encontrado ou formato inesperado')
      return res.status(500).json({ error: 'Nenhum arquivo encontrado ou formato inesperado' })
    }

    const imagens = data.files
      .filter((file: any) => file.mimeType.startsWith('image/'))
      .map((file: any) => ({
        src: `https://drive.google.com/uc?id=${file.id}`,
        alt: file.name,
      }))

    console.log('Imagens processadas:', imagens)
    res.json(imagens)
  } catch (err) {
    console.error('Erro ao acessar Drive API:', err)
    res.status(500).json({ error: 'Erro ao acessar Drive API' })
  }
}
