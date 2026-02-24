const sqlite3 = require('sqlite3').verbose();

// Connexion à la base de données
const db = new sqlite3.Database(
  './maBaseDeDonnees.sqlite',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connecté à la base de données SQLite.');

      // Création de la table avec adresse
      db.run(
        `CREATE TABLE IF NOT EXISTS personnes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nom TEXT NOT NULL,
          adresse TEXT
        )`,
        (err) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log("Table 'personnes' prête avec adresse.");

            // Données initiales avec adresse
            const personnes = [
              { nom: 'Bob', adresse: 'Tunis' },
              { nom: 'Alice', adresse: 'Sfax' },
              { nom: 'Charlie', adresse: 'Sousse' }
            ];

            personnes.forEach((p) => {
              db.run(
                `INSERT INTO personnes (nom, adresse) VALUES (?, ?)`,
                [p.nom, p.adresse]
              );
            });
          }
        }
      );
    }
  }
);

module.exports = db;