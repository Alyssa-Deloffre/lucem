const moodQualityValues = [
    {value : 0, text : 'Très mauvaise'},
    {value : 1, text : 'Mauvaise'},
    {value : 2, text : 'Neutre'},
    {value : 3, text : 'Bonne'},
    {value : 4, text : 'Très bonne'}
]

const influenceFactors = [
    'Santé',
    'Activité physique',
    'Soin de soi',
    'Passe-temps',
    'Identité',
    'Spiritualité',
    'Communauté',
    'Famille',
    'Amis',
    'Partenaire',
    'Rencontres amoureuses',
    'Tâches',
    'Travail',
    'Enseignement',
    'Voyages',
    'Météo',
    'Actualité',
    'Finances'
  ];
  

const moods = [
    { group: 'Amour/Espoir', mood: 'Affection', value: 3 },
    { group: 'Amour/Espoir', mood: 'Compassion', value: 3 },
    { group: 'Amour/Espoir', mood: 'Tendresse', value: 3 },
    { group: 'Amour/Espoir', mood: 'Optimisme', value: 3 },
    { group: 'Amour/Espoir', mood: 'Passion', value: 4 },
    { group: 'Colère', mood: 'Colère', value: 1 },
    { group: 'Colère', mood: 'Rage', value: 0 },
    { group: 'Colère', mood: 'Frustration', value: 1 },
    { group: 'Colère', mood: 'Indignation', value: 1 },
    { group: 'Colère', mood: 'Mépris', value: 1 },
    { group: 'Colère', mood: 'Ressentiment', value: 1 },
    { group: 'Colère', mood: 'Contrariété', value: 2 },
    { group: 'Colère', mood: 'Irritation', value: 2 },
    { group: 'Colère', mood: 'Vexation', value: 2 },
    { group: 'Colère', mood: 'Haine', value: 0 },
    { group: 'Culpabilité/Honte', mood: 'Humiliation', value: 0 },
    { group: 'Culpabilité/Honte', mood: 'Culpabilité', value: 1 },
    { group: 'Culpabilité/Honte', mood: 'Regret/Remords', value: 1 },
    { group: 'Culpabilité/Honte', mood: 'Honte', value: 1 },
    { group: 'Culpabilité/Honte', mood: 'Embarras', value: 2 },
    { group: 'Dégoût', mood: 'Dégoût', value: 0 },
    { group: 'Dégoût', mood: 'Nausée', value: 0 },
    { group: 'Dégoût', mood: 'Répulsion', value: 0 },
    { group: 'Dégoût', mood: 'Aversion', value: 1 },
    { group: 'Dégoût', mood: 'Rejet', value: 2 },
    { group: 'Joie', mood: 'Apaisement', value: 3 },
    { group: 'Joie', mood: 'Calme', value: 3 },
    { group: 'Joie', mood: 'Contentement', value: 3 },
    { group: 'Joie', mood: 'Confiance', value: 4 },
    { group: 'Joie', mood: 'Courage', value: 3 },
    { group: 'Joie', mood: 'Amusement', value: 3 },
    { group: 'Joie', mood: 'Bonheur', value: 3 },
    { group: 'Joie', mood: 'Excitation', value: 4 },
    { group: 'Joie', mood: 'Fierté', value: 3 },
    { group: 'Joie', mood: 'Gratitude', value: 3 },
    { group: 'Joie', mood: 'Satisfaction', value: 3 },
    { group: 'Joie', mood: 'Sérénité', value: 3 },
    { group: 'Joie', mood: 'Soulagement', value: 3 },
    { group: 'Joie', mood: 'Euphorie', value: 4 },
    { group: 'Peur', mood: 'Panique', value: 0 },
    { group: 'Peur', mood: 'Phobie', value: 0 },
    { group: 'Peur', mood: 'Terreur', value: 0 },
    { group: 'Peur', mood: 'Jalousie', value: 1 },
    { group: 'Peur', mood: 'Angoisse', value: 0 },
    { group: 'Peur', mood: 'Anxiété', value: 1 },
    { group: 'Peur', mood: 'Appréhension', value: 1 },
    { group: 'Peur', mood: 'Inquiétude', value: 1 },
    { group: 'Peur', mood: 'Peur', value: 1 },
    { group: 'Peur', mood: 'Stress', value: 0 },
    { group: 'Peur', mood: 'Nervosité', value: 2 },
    { group: 'Surprise', mood: 'Choc', value: 2 },
    { group: 'Surprise', mood: 'Incrédulité', value: 2 },
    { group: 'Surprise', mood: 'Curiosité', value: 3 },
    { group: 'Surprise', mood: 'Étonnement', value: 3 },
    { group: 'Surprise', mood: 'Admiration', value: 4 },
    { group: 'Surprise', mood: 'Fascination', value: 4 },
    { group: 'Tristesse', mood: 'Accablement', value: 0 },
    { group: 'Tristesse', mood: 'Désespoir', value: 0 },
    { group: 'Tristesse', mood: 'Épuisement', value: 0 },
    { group: 'Tristesse', mood: 'Abattement', value: 1 },
    { group: 'Tristesse', mood: 'Chagrin', value: 1 },
    { group: 'Tristesse', mood: 'Déception', value: 1 },
    { group: 'Tristesse', mood: 'Découragement', value: 1 },
    { group: 'Tristesse', mood: 'Mélancolie', value: 1 },
    { group: 'Tristesse', mood: 'Résignation', value: 1 },
    { group: 'Tristesse', mood: 'Solitude', value: 1 },
    { group: 'Tristesse', mood: 'Tristesse', value: 1 },
    { group: 'Tristesse', mood: 'Nostalgie', value: 2 },
    { group: 'Tristesse', mood: 'Indifférence', value: 2 }
  ];
  

  export {moods, moodQualityValues, influenceFactors}