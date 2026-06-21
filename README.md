# Carte De Visite Digitale
Template de carte de visite virtuelle en HTML, CSS, JS.

Une carte de visite numérique interactive, moderne et respectueuse de la vie privée. Ce projet permet d'afficher vos coordonnées professionnelles et propose des fonctionnalités avancées de partage et d'ajout aux contacts sans exposer directement vos données personnelles dans le code source public.


## ⚙️ Fonctionnalités

- **Toggle Thème (Sombre / Clair) :** Le site détecte automatiquement les préférences du système d'exploitation de l'utilisateur (`prefers-color-scheme`) pour appliquer le thème adapté dès le premier chargement. L'utilisateur peut basculer manuellement d'un thème à l'autre via un interrupteur (toggle). Ce choix est sauvegardé localement dans le navigateur (`localStorage`) pour persister lors des prochaines visites.
- **Ajout aux Contacts (vCard automatique) :**
  Génération dynamique d'un fichier `.vcf` (vCard 3.0) sous forme de Blob en mémoire, encodé en UTF-8. Au clic sur "Ajouter", le contact se télécharge proprement pour être importé dans le répertoire du smartphone ou de l'ordinateur.
- **Bouton Partager (Web Share API) :**
  Utilise l'API native `navigator.share` sur mobile pour ouvrir directement les options de partage du smartphone (AirDrop, Quick Share, SMS, QR code...).
  - *Limites de la fonctionnalité :* Cette API nécessite obligatoirement une connexion sécurisée (`https://`). De plus, elle n'est pas supportée sur certains environnements comme **Firefox PC**, ou bloquée par les restrictions de sécurité des **navigateurs intégrés (In-App Browsers)** (ex: lorsqu'on ouvre le lien directement depuis l'application Instagram, Facebook ou TikTok).
  - *Solution de secours :* Le script intègre un système robuste qui détecte ces limitations. Si l'API de partage est indisponible ou bridée, le lien de la carte est automatiquement copié dans le presse-papiers de l'utilisateur avec un message d'avertissement.


## ♿ Accessibilité (WCAG)

Ce projet a été conçu en veillant au respect des règles d'accessibilité numérique. Il valide les exigences minimales du **niveau AA des WCAG** (Web Content Accessibility Guidelines) :
- Contraste des textes suffisant et adapté aux modes clair et sombre.
- Utilisation de balises sémantiques HTML5 appropriées.


## 🔐 Configuration & Injection des Données Personnelles

Afin d'éviter d'exposer publiquement vos coordonnées (téléphone, e-mail...) sur GitHub, le projet sépare la logique d'affichage des données réelles.

### Procédure de configuration :
1. Ouvrez le fichier `config.example.js` situé à la racine du projet.
2. Remplissez l'intégralité des informations de l'objet `dicInfos` avec vos propres coordonnées :
   ```javascript
   const dicInfos = {
       identite : { nom : "VotreNom", prenom : "VotrePrénom", photo : "img/portrait.png", role : "Votre Métier" },
       com : { tel : "+33612345678", mail : "votre.mail@exemple.com",
           reseaux : { github : "[https://github.com/votre_pseudo](https://github.com/votre_pseudo)", linkedin : "votre_lien_linkedin" }}
   };
2. Renommez le fichier `config.example.js` en `config.js`.

4. Assurez-vous que votre fichier `.gitignore` contient bien la ligne `config.js` pour éviter d'envoyer par erreur vos données privées sur votre dépôt public.

💡 *Remarque* : Le script principal (`script.js`) vérifie automatiquement si `dicInfos` existe (`typeof dicInfos != 'undefined'`) avant d'injecter dynamiquement les éléments dans le DOM.

## 🌐 Hébergement et Déploiement
⚠️ *Remarque importante* : Prévoyez un déploiement manuel et non continu (sur **Netlify** ou **Vercel** par exemple).

Puisque le fichier `config.js` est exclu de votre dépôt GitHub public (via le `.gitignore`), un déploiement automatisé basé sur vos commits échouera à charger vos informations personnelles (Erreur 404 sur `config.js`).
Pour l'héberger, effectuez un téléversement manuel du dossier complet (incluant votre `config.js` local) par glisser-déposer sur l'interface de Netlify, ou configurez des variables d'environnement si vous utilisez une plateforme avancée comme Vercel.