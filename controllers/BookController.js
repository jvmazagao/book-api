

function BookController(model){
    
    const post =  function (req, res) {
        const {title, author, genre} = req.body;
        if(!title) {
            res.status(400);
            res.send('Title is required');
        }

        const book = new model(req.body);
        book.save();
        res.status(201);
        res.send(book);
    }

    const get = (req, res) => {
        const query =  {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }

        model.find(query, (err, books) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                let list = []
                books.forEach((element, index, array) => {
                    let book = element.toJSON();
                    book.links = {}
                    book.links.self = 'http://' + req.headers.host + '/api/books/' + book._id;
                    list.push(book);
                })
                return res.json(list);
            }
        })
    }

    return {
        createBook: post, 
        listBooks: get
    }

}
module.exports = BookController;