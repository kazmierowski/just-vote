let express = require('express');
let pathJoin = require('path.join');
let bodyParser = require('body-parser')

const server = express();
const ws = require('express-ws')(server);
const portFinder = require('portfinder');

const userRouter = require('./routes/user');

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.use(express.static(pathJoin(__dirname, '../build')));

server.get('/', function (req, res) {
    res.sendFile(pathJoin(__dirname, '../build/index.html'), (err) => {
        res.end();

        if (err) throw(err);
    });
})

server.get('/login', function (req, res) {
    res.sendFile(pathJoin(__dirname, '../build/index.html'), (err) => {
        res.end();

        if (err) throw(err);
    });
})

server.use('/user', userRouter);

portFinder.getPortPromise()
    .then((port) => {
        server.listen(port, () => console.log(`Example app listening on port ${port}!`));
    })
    .catch((err) => {
        console.log('I could not find empty port');
    });



