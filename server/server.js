let express = require('express');
let pathJoin = require('path.join');

const server = express();
const portFinder = require('portfinder');

server.use(express.static(pathJoin(__dirname, '../build')));

server.get('/', function (req, res) {
    res.sendFile('index.html', (err) => {
        res.end();

        if (err) throw(err);
    });
})

portFinder.getPortPromise()
    .then((port) => {
        server.listen(port, () => console.log(`Example app listening on port ${port}!`));
    })
    .catch((err) => {
        console.log('I could not find empty port');
    });



