const ACCESS_KEY = 'Q3AM3UQ867SPQQA43P2F';
const SECRET_KEY = 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG';

const Minio = require('minio')

var client = new Minio.Client({
    endPoint: 'play.minio.io',
    port: 9000,
    secure: true,
    accessKey: ACCESS_KEY,
    secretKey: SECRET_KEY
})

const server = require('express')()

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.get('/jquery.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
})

server.put('/upload',(req, res)=>{
	client.presignedPutObject(req.query.bucket, req.query.name, (err, url) => {
	    if (err) throw err
        console.log(url);
        res.redirect(url)
	})
})


server.get('/presignedUrl', (req, res) => {
    client.presignedPutObject('uploads', req.query.name, (err, url) => {
        if (err) throw err
        res.end(url)
    })
})


server.listen(8080)
console.log('http://0.0.0.0:8080')