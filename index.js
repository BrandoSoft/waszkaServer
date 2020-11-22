const express = require('express');

const { exec } = require("child_process");

const server = express();

server.use(express.json());

const PORT = 5001;


server.get('/api/waszka/:orders', (req, res) => {
    const { orders } = req.params;
    res.status(200).json(orders)

    exec(`type nul > ${orders}.txt`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`Stworzylem plik o nazwie ${orders}.txt`);
    });
})

server.listen(PORT, () => {
    console.log(`\n*** Server Runing on port ${PORT} ***\n`)
});