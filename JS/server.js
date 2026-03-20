const fs = require('fs');
const express = require('express');
const cors = require('cors')
const app = express(); 
const path = require('path')
const crypto = require('crypto');

const filePathLocal = path.join(__dirname, '..', 'JSON', 'data.JSON');

app.use(
        cors({
                origin: '*', // Lar alle http og protokoller inn
        })
)

app.use(express.json());

let usernames = ['', "Admin5678"];
let passwords = ['', "Passord1234"];

function hashPassowrd(passwordToBeHashed) {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.scryptSync(passwordToBeHashed, salt, 64);

        return { salt, hash};
}

function verifyPassword(password, salt, hash) {
        const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
        return hashedPassword === hash;
}

app.post('/new_password', (req, res) => {
        usernames[0] = req.body.username; // Henter username og password fra client
        passwords[0] = req.body.password;
        json_reader(filePathLocal, (err, data) => { // Kaller json_reader funksjonen
        if (err) {
                console.log(err);
                return res.status(500).send('Error')
        } else {
                const { salt, hash } = hashPassowrd(passwords[0])
                data[0].username = usernames[0]; // Klargjør data for json
                data[0].password = hash.toString("hex");
                data[0].salt = salt; 
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

app.post('/get_password', (req, res) => { 
        const inputUsername = req.body.username;
        const inputPassword = req.body.password;
        fs.readFile(filePathLocal, 'utf-8', (err, fileData) => { // leser filen
                if (err) {
                        return res.status(500).send('Error reading JSON');
                } else {
                        const dataGet = JSON.parse(fileData);

                        const saltGet = dataGet[0].salt;
                        const hashGet = dataGet[0].password;
                        const usernameGet = dataGet[0].username;

                        const resualt = verifyPassword(inputPassword, saltGet, hashGet)
                        
                        if (resualt && usernameGet === inputUsername) { 
                                res.status(200).send("OK")
                        } else if (inputPassword === dataGet[0].ADMINPASSWORD && 
                                   inputUsername === dataGet[0].ADMINUSERNAME) {
                                res.status(201).send("OK")
                        } else {
                                res.status(401).send('Invalid password');
                        }
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