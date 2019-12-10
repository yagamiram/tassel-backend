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
writer.pipe(fs.createWriteStream('userInfo.csv'))
writer.write([])
writer.end()

app.post('/saveUserInfo', function(req, res) {
    var userName = req.body.userName;
    var userEmail = req.body.userEmail;
    var phoneNum = req.body.phoneNum;
    const writer = csvWriter({sendHeaders: false})
    writer.pipe(fs.createWriteStream('userInfo.csv', {flags: 'a'}))
    writer.write({userName, userEmail, phoneNum})
    writer.end();
    res.send('Received successfully')
})



app.listen(8080, () => {
    console.log(`CORS-enabled web server Listening on port 8080`)
})
