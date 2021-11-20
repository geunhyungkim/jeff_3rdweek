var express = require('express');
var router = express.Router();
var Post = require('../models/post');
 
router.get('/list', (req, res) => {
  Post.find({})
  .sort('-createdAt')
  .exec(function (err, post){
    if(err) return res.json(err);
    res.render('list',{ title: 'Express', post: post})
  })
})

router.get('/write/:id', (req, res, next) => {
  res.send('Router 게시글 작성 페이지 ')
})

router.get('/detail', (req, res, next) => {
  res.send('Router 게시글 보기 페이지 ')
})

router.get('/revise', (req, res, next) => {
  res.send('Router 게시글 수정 페이지')
})

module.exports = router;