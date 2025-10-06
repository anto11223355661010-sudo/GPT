# UP Mind

UP Mind est une application web minimaliste construite avec Next.js, Tailwind CSS et Firebase pour aider les étudiants à réviser sans distraction. L’interface met l’accent sur trois actions principales : importer un cours, générer une fiche synthèse et créer un QCM d’entraînement.

## Fonctionnalités principales

- **Authentification Firebase** : connexion via Google ou Apple (via Firebase Auth).
- **Gestion des contenus** : sauvegarde des cours, résumés et QCM dans Firestore.
- **Génération IA** : endpoints API côté serveur pour déléguer la génération de résumés (3 niveaux de détail) et de QCM (5 questions).
- **Classement social** : affichage d’un classement hebdomadaire alimenté par Firestore.
- **Interface fluide** : design épuré inspiré de Notion/Duolingo basé sur Tailwind CSS.

## Prérequis

- Node.js 18+
- Un projet Firebase configuré (Auth, Firestore, Storage)
- Une clé API pour votre fournisseur IA (Gemini, OpenAI, Mistral, …)

## Configuration

1. Dupliquez le fichier `.env.example` en `.env` et complétez les valeurs Firebase et IA.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
4. Ouvrez votre navigateur à l’adresse suivante pour visualiser l’application :
   ```text
   http://localhost:3000
   ```

Si vous souhaitez tester l’application avec des données réelles, assurez-vous que les règles Firestore et Firebase Auth sont configurées pour autoriser vos comptes de test. Sans configuration Firebase valide, l’application affichera toujours l’interface mais les appels réseau échoueront.

Pour arrêter le serveur de développement, utilisez `Ctrl+C` dans le terminal où la commande `npm run dev` est exécutée.

## Structure du projet

```
src/
  app/
    api/ai/           # Routes pour la génération IA (résumés, QCM)
    (dashboard)/app/  # Espace applicatif protégé avec menu latéral
  components/         # UI réutilisable (sidebar, formulaires, tableaux…)
  lib/                # Configuration Firebase, accès Firestore, helpers IA
  types/              # Types partagés (cours, résumés, quiz, leaderboard)
```

## Notes de mise en œuvre

- Le hook `AuthProvider` expose l’état utilisateur côté client ; la vérification serveur repose sur un cookie `session` (à implémenter via Firebase Admin selon votre stratégie d’auth).
- Les endpoints IA sont volontairement génériques (`IA_API_BASE_URL`) pour pouvoir brancher le fournisseur de votre choix.
- Certaines sections (amis, statistiques) utilisent des données fictives pour illustrer l’UX et sont prêtes à être connectées à Firestore.

Bon apprentissage ! 💡
