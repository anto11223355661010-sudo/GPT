require('dotenv').config();

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/generate-fiche', async (req, res) => {
  const { cours } = req.body || {};

  if (!cours || typeof cours !== 'string' || !cours.trim()) {
    return res.status(400).json({
      error: 'Le champ "cours" est requis et doit contenir du texte.'
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'La clé API OpenAI est manquante. Définissez OPENAI_API_KEY dans votre fichier .env.'
    });
  }

  const openai = new OpenAI({ apiKey });
  const model = process.env.OPENAI_MODEL || 'gpt-4-turbo';

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'Tu es un assistant pédagogique qui crée des fiches de révision claires et structurées.'
        },
        {
          role: 'user',
          content: `Fais une fiche de révision claire, concise et bien structurée à partir du texte suivant :\n\n${cours}`
        }
      ],
      temperature: 0.7
    });

    const fiche = completion.choices?.[0]?.message?.content?.trim();

    if (!fiche) {
      throw new Error("La réponse de l'API OpenAI est vide.");
    }

    return res.json({ fiche });
  } catch (error) {
    console.error('Erreur lors de la génération de la fiche:', error);

    const status = error.status || 500;
    return res.status(status).json({
      error: "Impossible de générer la fiche de révision.",
      details: error.message
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Erreur inattendue:', err);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

app.listen(PORT, () => {
  console.log(`Serveur de fiches en écoute sur le port ${PORT}`);
});
