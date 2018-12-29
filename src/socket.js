import io from 'socket.io-client';
let instance = null;

if(!instance) {
    console.log('creating client socket instance');
    instance = io.connect('http://localhost:8000');
}

export default instance;