let express = require('express');
let pathJoin = require('path.join');
let bodyParser = require('body-parser');
let vl = require('./objects/VotersList');

const app = express();
const server = require('http').Server(app);
const webSocket = require('./socket').socket(server);

// const portFinder = require('portfinder');
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user');
const appRouter = require('./routes/app');
const namesRouter = require('./routes/names');

let votersList = new vl();

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(pathJoin(__dirname, '../build')));

app.get('/*', function (req, res) {

    res.sendFile(pathJoin(__dirname, '../build/index.html'), (err) => {
        res.end();

        if (err) throw(err);
    });
})

app.get('/login', function (req, res) {
    res.sendFile(pathJoin(__dirname, '../build/index.html'), (err) => {
        res.end();

        if (err) throw(err);
    });
})

app.use('/user', userRouter);
app.use('/app', appRouter);
app.use('/names', namesRouter);

let port = 8000;

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

// portFinder.getPortPromise()
//     .then((port) => {
//         app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//     })
//     .catch((err) => {
//         console.log('I could not find empty port');
//     });



