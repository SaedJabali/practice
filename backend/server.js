const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const superagent = require('superagent')
const mongoose = require("mongoose");
const Profile = require('./Model/articModel')

mongoose.connect('mongodb://localhost:27017/artic', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongodb is connected!'));

app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/artic', function (req, res) {

    const url = `https://api.artic.edu/api/v1/artworks?limit=10`
    superagent.get(url).then(articData => {
        const newArr = articData.body.data.map(element => new Artic(element))
        res.send(newArr)
    })
})

app.post('/post', function (req, res) {
    const { title, thumbnail, author, credit } = req.body
    Profile.find({ title: title }, (error, result) => {
        if (result.length == 0) {
            let newArt = new Profile({
                title: title,
                thumbnail: thumbnail,
                credit: credit,
                author: author
            })
            newArt.save()
            res.send(newArt)
        } else {
            res.send('data exists')
        }
    })
})
app.get('/post', function (req, res) {
    Profile.find({}, (error, result) => {
        res.send(result);
    })
})
app.delete('/post/:title', function (req, res) {
    const title = req.params.title;
    Profile.remove({ title: title }, (error, result) => {
        if (error) {
            console.error;
        } else {
            res.send(result)
        }
    })
})

app.put('/post/:title', function (req, res) {
    const { credit } = req.body;
    const title = req.params.title
    Profile.find({ title: title }, (error, result) => {
        if (error) {
            console.error
        } else {
            result[0].credit = credit;
            result[0].save();
            res.send(result)
        }
    })
})
class Artic {
    constructor(data) {
        this.title = data.title,
            this.thumbnail = data.thumbnail.lqip,
            this.author = data.artist_title,
            this.credit = data.credit_line
    }
}

app.listen(6060)





// link : https://api.artic.edu/api/v1/artworks?limit=10