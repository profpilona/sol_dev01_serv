// fichier des routes dont le préfixe /api/livres
// Date: 29 juin 2023
// alain Pilon

const express = require('express');
const router = express.Router();

router.get('/', (requete, reponse)=>{
    reponse.send('SVP, utilisez /api/messages pour obtenir des messages!');
});
module.exports = router;