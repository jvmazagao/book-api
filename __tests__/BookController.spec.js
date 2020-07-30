const sinon = require('sinon');
const Model = require('../models/Book');
Model.find = jest.fn();

describe('Book Controller Test', () => {
    

    describe('Post test', () => {
        it('Should not Allow an empty title on post', () => {
            const Book = jest.fn().mockImplementation((book) => ({
                save: jest.fn()
            }))
            const bookController = require('../controllers/BookController')(Book);
            const req = {
                body: {
                    author: 'Test author'
                }
            }

            const res = {
                status: sinon.spy(),
                send: sinon.spy()
            }


            bookController.createBook(req, res);

            expect(res.status.calledWith(400)).toBe(true, 'Bad Status ', + res.status.args[0]);
            expect(res.send.calledWith('Title is required')).toBe(true);
        });

        it('Should create a book', () => {
            const Book = jest.fn().mockImplementation((book) => ({
                save: jest.fn()
            }))
            const bookController = require('../controllers/BookController')(Book);
            const req = {
                body: {
                    title: 'A new book',
                    author: 'Test Author',
                    genre: 'Genre'
                }
            }

            const res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            bookController.createBook(req, res);

            expect(res.status.calledWith(201)).toBe(true, 'Created ', res.status.args[0]);
        })
        
        it('Should list books', () => {
            const bookController = require('../controllers/BookController')(Model);
            const req = {
                query: {
                    genre: 'Genre'
                }
            }
            
            const res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            bookController.listBooks(req, res);
            expect(res.status.calledWith(200)).toBe(true);
        })
    })
})