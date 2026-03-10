const fs = require('fs');
const express = require('express');
const cors = require('cors')
const app = express(); 
const path = require('path')

const filePathLocal = path.join(__dirname, '..', 'JSON', 'data.JSON');

app.use(
        cors({
                origin: '*', // Lar alle http og protokoller inn
        })
)

app.use(express.json());

let usernames = ['', "Admin5678"];
let passwords = ['', "Passord1234"];



app.post('/new_password', (req, res) => {
        usernames[0] = req.body.username; // Henter username og password fra client
        passwords[0] = req.body.password;
        json_reader(filePathLocal, (err, data) => { // Kaller json_reader funksjonen
        if (err) {
                console.log(err);
                return res.status(500).send('Error')
        } else {
                data[0].username = usernames[0]; // Klargjør data for json
                data[0].password = passwords[0];
                fs.writeFile(filePathLocal, JSON.stringify(data, null, 4), err => { // Skriver til filen
                        if (err) {
                                console.log(err);
                                return res.status(500).send('Error writing JSON');
                        }
                        res.send('JSON updated');
                });
        }
        });
});

app.get('/get_password', (req, res) => { 
        fs.readFile(filePathLocal, 'utf-8', (err, fileData) => { // leser filen
                if (err) {
                        return res.status(500).send('Error reading JSON');
                } else {
                        res.send(fileData) // sender dataen inni json tilbake  
                }
        })
})

function json_reader(filePath, cb) {
        fs.readFile(filePath, 'utf-8', (err, fileData) => { // proever aa lese filen, hvis den ikke eksistere saa lager den det
                if (err) {
                        return cb && cb(err);
                }
                try {
                        const object = JSON.parse(fileData); // Skriver dataen
                        return cb && cb(null, object);
                } catch (err) {
                        return cb && cb(err);
                }
        });
}



app.listen(3000, () => {
        console.log('Servern har starta gutta');
})