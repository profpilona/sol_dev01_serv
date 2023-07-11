// schéma de données pour les Livres
// Date: 29 juin 2023
// Alain Pilon

const mongoose = require('mongoose');

let schemaLivre = mongoose.Schema({
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
    editeur: {
        type: String,
        required: true
    },
    nbPages: {
        type: Number,
        required: true
    },
    langue: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

let Livres = module.exports = mongoose.model('livres', schemaLivre);

// fonction pour obtenir tous les livres de la collection
// reçoit en paramètre un callback et le nombre maximum (limit) de livres à retourner
module.exports.getLivres = (callback, limit) => {
    Livres.find(callback).limit(limit);
}

// fonction pour obtenir tous les livres de la collection qui correspondent à l'ISBN
// reçoit en paramètre un ISBN, une fonction callback et le nombre maximum (limit) de livres à retourner
module.exports.getLivresParISBN = (isbn, callback, limit) => {
    let filtre = {"_id": isbn};
    Livres.find(filtre, callback).limit(limit);
}

// fonction pour obtenir tous les livres de la collection qui contiennent une partie d'un champ
// reçoit en paramètre le champ, les caractères à chercher dans le champ, une fonction callback et le nombre maximum (limit) de livres à retourner
module.exports.getLivresParChamp = (champ, critere, callback, limit) => {
    let filtre = {[champ]: RegExp(critere, "i")};
    console.log(filtre);
    Livres.find(filtre, callback).limit(limit);
}

// fonction pour ajouter un livre dans la collection
// reçoit en paramètre le livre à ajouter et une fonction callback
module.exports.ajoutLivre = (livre, callback) => {
    // validation du format du livre reçu en paramètre
    Livres.create(livre, callback);
}

// fonction pour modifier un livre dans la collection
// reçoit en paramètres:
// - l'identifiant du livre à modifier (le isbn qui est aussi le _id dans la collection)
// - le livre à modifier (les nouvelles valeurs) et 
// - une fonction callback
module.exports.modifierLivre = (isbn, livre, callback) => {
    // validation du format du livre reçu en paramètre (plus tard)
    let filtre = {"_id": isbn};
    let options = {};
    let nouveauLivre = {
        titre: livre.titre,
        "auteur": livre.auteur,
        "editeur": livre.editeur,
        "nbPages": livre.nbPages,
        "langue": livre.langue,
        "prix": livre.prix,
        "resume": livre.resume,
        "date": livre.date
    };
    Livres.findOneAndUpdate(filtre, nouveauLivre, options, callback);
};
// fonction pour supprimer un livre de la collection
// reçoit en paramètres:
// - l'identifiant du livre à supprimer (le isbn qui est aussi le _id dans la collection)
// - une fonction callback
module.exports.supprimerLivre = (isbn, callback) => {
    let filtre = {"_id": isbn};
    Livres.deleteOne(filtre, callback);
}

