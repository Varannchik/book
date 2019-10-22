var express = require('express');
const AuthorModel = require('../model/author');
const BooksModel = require('../model/books');

var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  
});

router.post("/book", function (req, res) {
    
    console.log(req.body);
    const book = new BooksModel({
        title: req.body.title,        
    });
    if(!req.body) res.sendStatus(400);
    let title = req.body.title;    
    BooksModel.find({"title" : title})
    .then(data => {
        if(data.length===0)
            book.save()
            .then(function(doc){
                console.log("Save book", doc);
            })
            .catch(function (err){
                console.log(err);
            });
        else res.send('Books are not found, please repeat')
    });    
});

router.post("/author", function (req, res) {
    console.log(req.body);
    const author = new AuthorModel({
        fullname: req.body.fullname,        
    });
    if(!req.body) res.sendStatus(400);
    let fullname = req.body.fullname;    
    AuthorModel.find({"fullname" : fullname})
    .then(data => {
        if(data.length===0)
        author.save()
            .then(function(doc){
                console.log("Save author", doc);
            })
            .catch(function (err){
                console.log(err);
            });
        else res.send('Author is found, please repeat')
    });    
});

router.post("/library", function (req, res) {    
    let title = req.body.title;
    let fullname = req.body.fullname;
    let bookId=null;
    let authId=null;
    let promBook = BooksModel.findOne({"title": title}).then(data=>bookId=data._id)
    let promAuth = AuthorModel.findOne ({"fullname" : fullname}).then(data=>authId=data._id)
    //let auth=promBook.populate('authors')
    Promise.all([promBook, promAuth])
        .then(el => {
            //promBook.populate('authors')
            console.log(bookId)
            BooksModel.findOneAndUpdate({ "title": title }, {$push:{authors:authId}}).catch(function (err) {
                console.log(err);
            });
            AuthorModel.findOneAndUpdate({ "fullname": fullname }, {$push: {books: bookId}}).catch(function (err) {
                console.log(err);
            });
        })
        .catch(function (err) {
            console.log(err);
        });
    
});

router.get('/allbooks', function(req, res, next) {
    BooksModel.find({"title" : title})
    //res.render('index', {a: BooksModel.title });
});
module.exports = router;