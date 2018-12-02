let express = require('express');
let pathJoin = require('path.join');
let bodyParser = require('body-parser');
let vl = require('./objects/VotersList');

const server = express();
const ws = require('express-ws')(server);
const portFinder = require('portfinder');
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user');

let votersList = new vl();

server.use(cookieParser());

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



