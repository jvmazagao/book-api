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

    router.route('/books/:id')
    .get((req, res) => {
        model.findById(req.params.id, (err, book) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.send(book)
            }
        })
    });

    return router;
}

module.exports = routes;
