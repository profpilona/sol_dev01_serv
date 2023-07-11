// fichier des routes dont le préfixe /api/livres
// Date: 29 juin 2023
// alain Pilon

const express = require('express');
const router = express.Router();
const Messages = require('../modeles/Messages');

router.get('/', (requete, reponse)=>{
    Messages.getMessages((err, mess)=>{
        if (err) throw err;
        reponse.json(mess);
    }, 250);
});

router.get('/:id', (requete, reponse)=>{
    let id = requete.params.id;
    Messages.getMessagesParID(id, (err, mess)=>{
        if (err) throw err;
        reponse.json(mess);
    }, 250);
});

router.get('/description/:texte', (requete, reponse)=>{
    let texte = requete.params.texte;
    Messages.getMessagesParChamp("description", texte, (err, mess)=>{
        if (err) throw err;
        reponse.json(mess);
    }, 250);
});
router.get('/auteur/:auteur', (requete, reponse)=>{
    let auteur = requete.params.auteur;
    Messages.getMessagesParChamp("auteur", auteur, (err, mess)=>{
        if (err) throw err;
        reponse.json(mess);
    }, 250);
});
router.get('/titre/:titre', (requete, reponse)=>{
    let titre = requete.params.titre;
    Messages.getMessagesParChamp("titre", titre, (err, mess)=>{
        if (err) throw err;
        reponse.json(mess);
    }, 25);
});
router.post('/', (requete, reponse)=>{
    let message = requete.body;
    // console.log(livre);
    Messages.ajoutMessage(message, (err, msgRetour)=>{
        if (err) throw err;
        reponse.json(msgRetour);
    });
});
router.put('/:id', (requete, reponse)=>{
    let id = requete.params.id;
    let nouveauMess = requete.body;
    Messages.modifierMessage(id, nouveauMess, (err, resultat)=>{
        if (err) throw err;
        reponse.json(resultat);
    });
});
router.delete('/:id', (requete, reponse)=>{
    let id = requete.params.id;
    console.log(id, 'a supprimer');
    Messages.supprimerMessage(id, (err, resultat)=>{
        if (err) throw err;
        reponse.json(resultat);
    });
});
module.exports = router;