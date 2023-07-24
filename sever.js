const html = require('fs').readFileSync('index.html');
const httpServer = require('http').createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
});

// Socket.io
const socket = require('socket.io');
const io = socket(httpServer);
io.on('connection', (socket) => {
    console.log('connection successful');
    socket.on('sendMessage', (msg) => { // クライアントからメッセージを受信
        io.emit('receiveMessage', msg); // 全クライアントにメッセージを送信
    });
});

// サーバーの起動
httpServer.listen(8080, 'localhost');
console.log('server listen');

