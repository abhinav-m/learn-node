const express = require('express')
const app = express()
const request = require('request')

app.use(express.static(__dirname + '/public'))

function validateUrl(req, res, next) {
    if (!/http:\/\/|https:\/\//.test(req.url)) {
        res.status(404)
            .send('404 - Page Not Found')
    } else {
        next()
    }
}

app.get('/:url(*)', validateUrl, (req, res) => {
    request(req.url.replace(/^\//, ''), (err, _res, _body) => {
        res.set('Access-Control-Allow-Origin', '*')
        res.send(_body)
    })
})


app.listen(3000);