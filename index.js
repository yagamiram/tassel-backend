var express = require('express'),
    fs = require('fs')
    url = require('url');
var cors = require('cors')
var bodyParser = require('body-parser');
var csvWriter = require('csv-write-stream')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

var writer = csvWriter({ headers: ["userName", "userEmail", "phoneNum"]})
writer.pipe(fs.createWriteStream(`${__dirname}/userInfo.csv`, {flags: 'a'}))
writer.write([])
writer.end()

console.log('the dir name is: ' + __dirname)

app.post('/saveUserInfo', function(req, res) {
    console.log('we got a request. The request is: ' + JSON.stringify(req.body))
    const request = req.body;
    var userName = request.userName;
    var userEmail = request.userEmail;
    var phoneNum = request.phoneNum;
    const writer = csvWriter({sendHeaders: false})
    writer.pipe(fs.createWriteStream(`${__dirname}/userInfo.csv`, {flags: 'a'}))
    console.log('Calling write function')
    writer.write({userName, userEmail, phoneNum})
    writer.end();
    res.send('Received successfully')
})



app.listen(process.env.PORT || 5000, () => {
    console.log(`CORS-enabled web server Listening on port ${process.env.PORT}`)
})
