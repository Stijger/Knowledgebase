const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// MySQL-verbinding configureren
const connection = mysql.createConnection({
    host: '192.168.178.120',
    user: 'stijn',
    password: '@Stijn2004', // Voeg je MySQL-wachtwoord hier toe
    database: 'knowledgebase'
});

// Middelware configureren voor het verwerken van JSON-verzoeken
app.use(express.json());

// Statische bestanden serveren vanuit de hoofdmap
app.use(express.static(path.join(__dirname)));

// Endpoint voor het ophalen van terminologie
// app.get('/terminology', (req, res) => {
//     connection.query('SELECT * FROM terminology', (error, results) => {
//         if (error) {
//             res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van terminologie.' });
//         } else {
//             res.json(results);
//         }
//     });
// });

// Endpoint voor het ophalen van kennisitems
app.get('/knowledgeitems', (req, res) => {
    connection.query('SELECT * FROM knowledgeitem', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van kennisitems.' });
        } else {
            res.json(results);
        }
    });
});

// Luister naar verzoeken op de opgegeven poort
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});

app.post('/terminology', (req, res) => {
    const { term, definition, language } = req.body;

    // Voeg hier de logica toe om terminologie toe te voegen aan de database
    connection.query('INSERT INTO terminology (term, definition, language) VALUES (?, ?, ?)', [term, definition, language], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Er is een fout opgetreden bij het toevoegen van de terminologie.' });
        } else {
            res.status(200).json({ message: 'Terminologie succesvol toegevoegd.' });
        }
    });
});