const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000
const Post = require('./models/post')

const postRouter = require('./routes/post');
app.use('/post', [postRouter]);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// mongodb setup
var mongoose = require('mongoose');
var promise = mongoose.connect("mongodb://god:god@13.125.39.201:27017/board1?authSource=admin&authMechanism=SCRAM-SHA-1");

// view engine setup
app.set('views', __dirname + '/views'); //views폴더내의 ejs파일을 세팅
app.set('view engine', 'ejs');

app.get('/', (req, res) => { //list 도메인 확정
    Post.find({}).sort("-createdAt") //내림차순
        .exec(function (err, list) {
            if (err) return res.json(err);
            res.render('list', { list: list });//list.ejs 화면 띄우기
            console.log('successfully linked')
        })
})

app.get('/detail/:_id', (req, res) => {
    console.log(req.params._id)
    Post.findOne({ _id: req.params._id })
        .exec(function (err, detail) {
            if (err) return res.json(err);
            res.render('detail', { detail: detail });
            console.log('linklink')
        })
})

app.get('/revise', (req, res) => {
    res.render('revise');
})
app.get('/write', (req, res) => {
    res.render('write');
})

app.post('/qwer', (req, res) => {
    Post.create(req.body)
    console.log('Successfully saved')
    res.redirect('/')
})

app.post('/detail/:_id', async (req, res) => {
    const { title, author, desc, password } = req.body;
    const { _id } = req.params;
    await Post.updateOne({ _id }, { $set: { title: title, author: author, desc: desc, password: password } })
    Post.find({}).sort("-createdAt")
        .exec(function (err, list) {
            if (err) return res.json(err);
            res.render('list', { list: list });
            console.log('successfully linked')
        })
})

app.post('/dlt', (req, res) => {
    Post.deleteOne({ _id: req.body.id }, function (err) {
        if (err) return res.json(err);
        Post.find({}).sort("-createdAt")
            .exec(function (err, list) {
                if (err) return res.json(err);
                res.render('list', { list: list });
                console.log('successfully linked')
            });
    })
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})