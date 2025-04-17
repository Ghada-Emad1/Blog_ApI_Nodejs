const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const http = require('http');
myEmitter.on('newOrder', () => {
    console.log('New Order received mona');
})


// you can have mulitply listner
myEmitter.on('newOrder', () => {
    console.log('New order received from ghada');
})

myEmitter.on('newOrder', (newvalue) => {
    console.log(`recevied a value ${newvalue}`);
})
// when you listen to the event newValue it will also this value with it 50
myEmitter.emit('newOrder',50);
//send event called newOrder , there is listener to it ,
// when you called will console new order received


//server
const server = http.createServer();
server.on('request', (req, res) => {
    console.log('request received');
    console.log('request ', req.method, req.url);
    res.end('request received');
})

const port = 4000;
// when i get request from browser it will send event
// called request and listen to it
server.listen(port, () => {
    console.log(`Server is listen on port ${port}`)
})