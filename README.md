# Bien démarrer avec Create React App

Ce projet a été initialisé avec [Create React App](https://github.com/elisalenotre/bookineo-front/tree/main).

## Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`

Lance l’application en mode développement.  
Ouvrez [http://localhost:3000](http://localhost:3000) pour la voir dans votre navigateur.

La page se rechargera automatiquement lorsque vous ferez des modifications.  
Vous pouvez également voir les erreurs de lint dans la console.

### `npm test`

Lance le test runner en mode interactif et en continu.  
Consultez la section sur [l’exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d’informations.

### `npm run build`

Construit l’application pour la production dans le dossier `build`.  
Elle regroupe correctement React en mode production et optimise la compilation pour de meilleures performances.

Le build est minifié et les noms de fichiers incluent des hash.  
Votre application est prête à être déployée !

### `npm run eject`

**Attention : cette opération est irréversible. Une fois que vous avez exécuté `eject`, vous ne pouvez pas revenir en arrière !**

Si vous n’êtes pas satisfait des outils de build et des choix de configuration, vous pouvez exécuter `eject` à tout moment. Cette commande supprimera la dépendance unique de build de votre projet.

À la place, elle copiera tous les fichiers de configuration et les dépendances transitives (webpack, Babel, ESLint, etc.) directement dans votre projet afin que vous en ayez le contrôle total. Toutes les commandes, à l’exception de `eject`, continueront de fonctionner, mais elles pointeront vers les scripts copiés, ce qui vous permettra de les modifier. À partir de ce moment-là, vous serez autonome.

Vous n’avez pas besoin d’utiliser `eject`. L’ensemble des fonctionnalités proposées est suffisant pour les petites et moyennes applications, et vous ne devriez pas vous sentir obligé de l’utiliser. Cependant, nous comprenons que cet outil ne serait pas utile si vous ne pouviez pas le personnaliser quand vous en avez besoin.

# Installer le LLM du chatbot

##Installer LM studio

- Rendez-vous sur https://lmstudio.ai pour télécharger la version du logiciel compatible avec votre système d'exploitation.
- Choisssez le mode développeur.

## Configurer le LLM
- Dans l'onglet discover : recherchez, téléchargez puis activer qwen2-1.5b-instruct.
- Si vous souhaitez utiliser un LLM différent, entrez son nom dans ./src/api/ChatApi.js à la ligne 10.
- Vous pouvez maintenant utiliser le chatbot en bas à droite de l'accueil.
