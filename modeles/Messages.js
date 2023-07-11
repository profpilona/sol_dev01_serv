// schéma de données pour les Livres
// Date: 29 juin 2023
// Alain Pilon

const mongoose = require('mongoose');

let schemaMessage = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    titre: {
        type: String,
        required: true        
    },
    auteur: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    langue: {
        type: String,
        required: true
    },
    commentaires: {
        type: Array,
        required: true
    }
});

let Messages = module.exports = mongoose.model('messages', schemaMessage);

// fonction pour obtenir tous les messages de la collection
// reçoit en paramètre un callback et le nombre maximum (limit) de livres à retourner
module.exports.getMessages = (callback, limit) => {
    Messages.find(callback).limit(limit).sort({date: -1});
}

// fonction pour obtenir tous les livres de la collection qui correspondent à l'ISBN
// reçoit en paramètre un ISBN, une fonction callback et le nombre maximum (limit) de livres à retourner
module.exports.getMessagesParID = (id, callback, limit) => {
    let filtre = {"_id": id};
    Messages.find(filtre, callback).limit(limit);
}

// fonction pour obtenir tous les livres de la collection qui contiennent une partie d'un champ
// reçoit en paramètre le champ, les caractères à chercher dans le champ, une fonction callback et le nombre maximum (limit) de livres à retourner
module.exports.getMessagesParChamp = (champ, critere, callback, limit) => {
    let filtre = {[champ]: RegExp(critere, "i")};
    console.log(filtre);
    Messages.find(filtre, callback).limit(limit).sort({date: -1});
}

// fonction pour ajouter un livre dans la collection
// reçoit en paramètre le livre à ajouter et une fonction callback
module.exports.ajoutMessage = (message, callback) => {
    // validation du format du livre reçu en paramètre
    Messages.create(message, callback);
}

// fonction pour modifier un livre dans la collection
// reçoit en paramètres:
// - l'identifiant du livre à modifier (le isbn qui est aussi le _id dans la collection)
// - le livre à modifier (les nouvelles valeurs) et 
// - une fonction callback
module.exports.modifierMessage = (id, mess, callback) => {
    // validation du format du livre reçu en paramètre (plus tard)
    let filtre = {"_id": id};
    let options = {};
    let nouveauMess = {
        titre: mess.titre,
        "auteur": mess.auteur,
        "description": mess.description,
        "langue": mess.langue,
        "date": mess.date,
        "commentaires": mess.commentaires
    };
    Messages.findOneAndUpdate(filtre, nouveauMess, options, callback);
};
// fonction pour supprimer un livre de la collection
// reçoit en paramètres:
// - l'identifiant du livre à supprimer (le isbn qui est aussi le _id dans la collection)
// - une fonction callback
module.exports.supprimerMessage = (id, callback) => {
    let filtre = {"_id": id};
    Messages.deleteOne(filtre, callback);
}

