const express = require( "express" );
const mongoose = require( "mongoose" );
const app = express();
const bodyParser = express.json();

const {BookModel, AuthorModel} = require( './models' );

mongoose.connect( "mongodb://localhost:27017/books_authors_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use( bodyParser );

app.post( '/newAuthor', ( req, res ) => {
    const newAuthor = {
        firstName : req.body.firstName,
        lastName : req.body.lastName
    };

    AuthorModel.create( newAuthor )
        .then( response => {
            return res.status(201).json( response );
        });

});

app.post( '/newBook', ( req, res ) => {
    const authorToFind = {
        firstName : req.body.firstName,
        lastName : req.body.lastName
    };

    AuthorModel.findOne( authorToFind )
        .then( foundAuthor => {
            const newBook = {
                title : req.body.title,
                authorId : foundAuthor._id
            }
            BookModel.create( newBook )
                .then( response => {
                    return res.status( 201 ).json( response );
                });
        });

});

app.get( '/allBooks', ( req, res ) => {
    BookModel.find()
        .populate( 'authorId', ['firstName'] )
        .then( results => {
            return res.status( 200 ).json( results );
        });
});

app.listen( 8080, () => {
    console.log( "Server running in port 8080" );
});