const fs = require('fs');
const http = require('http');

const server = http.createServer();
server.on('request', (req,res) => {
    // first solution, will read the entire data in stream.text and then return data
    // fs.readFile('stream.txt', (err, data) => {
    //     res.end(data);
    // })

    // second solution : readable stream , not read the entire file but read it chunk by chunnk

    // const readable = fs.createReadStream('stream.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // // when i end to write full, so i will stop so this end
    // readable.on('end', () =>{
    //     res.end();
    // })
    // readable.on('error', () => {
    //     res.statusCode = 500;
    //     res.end('file Not Found');
    // })

    // in this file the speed to send data is slow , backbrucher
    // so use pipe() to origanze speed to send data.

    const readable = fs.createReadStream("stream.txt");
    readable.pipe(res);


})

const port = 3000;

server.listen(port, () => {
  console.log(`Server is listen on port ${port}`);
});