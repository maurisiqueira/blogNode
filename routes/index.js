var express = require('express');
var router = express.Router();
var validator = require('express-validator');

/* GET home page. */

var allCategories;
var allArticles;
var article;
var id;


router.get('/', function (req, res, next) {

    global.db.findAllCategories((e, cats) => {
        if (e) { return console.log(e); }
        allCategories = cats


        global.db.findAllArticles((e, arts) => {
            if (e) { return console.log(e); }
            allArticles = arts

        });
        res.render('index', { cats: allCategories, articles: allArticles, title: 'Reina para Sempre!' })
    });


});

router.get('/articles/:id', function (req, res, next) {
    id = req.params.id


    global.db.readArticles(id, (e, art) => {
        if (e) { return console.log(e); }
        article = art;

        global.db.readComment(id, (e, comments) => {
            if (e) { return console.log(e); }

            res.render('articles', { art: article, cats: allCategories, comments: comments, title: 'Reina para Sempre!' })
        })
    })
});

router.post('/articles/sendComment', function (req, res, next) {

    var comentario = { 'nome': req.body.nome, 'email': req.body.email, 'comentario': req.body.comentario, 'post': req.body.id }


    global.db.readArticles(id, (e, art) => {
        if (e) { return console.log(e); }

        global.db.sendComment(comentario, (e) => {
            if (e) { return console.log(e); }
        })

    })
    res.redirect(id)
});


module.exports = router;