const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
    books: {
        type: mongoose.Schema.Types.ObjectId,    
        ref: 'book'
    },
    fullname: {
        type: String,    
        require: true
    }
});

const Model = mongoose.model('author', AutorSchema);
module.exports = Model;
