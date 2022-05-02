const mongoose = require( "mongoose" );

const authorSchema = mongoose.Schema({
    firstName : {
        type : "String",
        required : true
    },
    lastName : {
        type : "String",
        required : true
    }
});

const AuthorModel = mongoose.model( 'authors', authorSchema );

const bookSchema = mongoose.Schema({
    title : {
        type : "String",
        required : true
    },
    authorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'authors',
        required : true 
    }
});

const BookModel = mongoose.model( 'books', bookSchema );

module.exports = {
    BookModel,
    AuthorModel
};