const express = require('express');

const routes = (model) => {
    const router = express.Router()

    router.route('/books')
        .post((req, res) => {
            const book = new model(req.body);
            book.save();
            res.status(201).send(book);
        })
        .get((req, res) => {
            const query = req.query.genre ? query.genre = req.query.genre : {};

            model.find(query, (err, books) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    return res.json(books);
                }
            })
        });

    router.use('/books/:id', (req, res, next) => {
        model.findById(req.params.id, (err, book) => {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send('Book not found');
            }
        })
    })

    router.route('/books/:id')
        .get((req, res) => {
            return res.send(req.book)
        }).put((req, res) => {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre
            req.book.read = req.body.read;
            req.book.save( (err) => {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
            res.send(req.book);
        }).patch((req, res) => {
            if(req.body._id) {
                delete req.body._id
            }
            for(let a in req.body){
                req.book[a] = req.body[a];
            } 
            req.book.save((err) => {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        }).delete((req, res) => {
            req.book.remove((err) => {
                if(err){
                    res.status(500).send(err);
                } else {
                    res.sendStatus(204)
                }
            })
        })

    return router;
}

module.exports = routes;
