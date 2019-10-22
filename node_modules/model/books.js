const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = new mongoose.Schema({
    title: {
        type: String,    
        require: true
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,    
        ref: 'author'
    }]
});

const Model = mongoose.model('book', BooksSchema);
module.exports = Model;