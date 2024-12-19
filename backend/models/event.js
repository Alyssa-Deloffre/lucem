const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'patients', required: true },
    type: { 
        type: String, 
        enum: ['sleep', 'mood'], // Les types d'événements possibles
        required: true 
    },
    ref: { 
        type: mongoose.Schema.Types.ObjectId, 
        refPath: 'refModel' // Chemin vers le champ qui contient le modèle de référence
    },
    refModel: { 
        type: String, 
        enum: ['sleep_globals', 'mood_globals'], // Modèles possibles pour ref
        required: true 
    },
    date: { type: Date, default: Date.now }
});

// Créer le modèle
const Event = mongoose.model('events', eventSchema);

module.exports = Event;
