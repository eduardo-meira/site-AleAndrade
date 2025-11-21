import { google } from "googleapis";
import express from "express";

const router = express.Router();

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

// Rota que SERVE a imagem diretamente
router.get("/imagem/:id", async (req, res) => {
  try {
    const fileId = req.params.id;

    const driveResponse = await drive.files.get(
      {
        fileId,
        alt: "media",
      },
      { responseType: "stream" }
    );

    res.setHeader("Content-Type", "image/jpeg");
    driveResponse.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar imagem");
  }
});

export default router;
