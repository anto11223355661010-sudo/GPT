// Exemple d'appel depuis un front-end (React, Vue, etc.)
async function generateFiche(cours) {
  try {
    const response = await fetch('http://localhost:3001/generate-fiche', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cours })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur inconnue côté serveur');
    }

    const data = await response.json();
    console.log('Fiche générée:', data.fiche);
    return data.fiche;
  } catch (err) {
    console.error('Erreur lors de la génération de la fiche:', err);
    throw err;
  }
}

// Exemple d'utilisation
// generateFiche('Contenu du cours sur la Révolution française...');
