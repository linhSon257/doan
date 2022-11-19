const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')

const Term = new Schema({
    termName: {
        type: String,
        require: true,
    },

    yearName: {
        type: String,
        require: true,
    },
    termDateStart:{
        type: String,
        require: true,
    },
    termDateFinish:{
        type: String,
        require: true,
    }
})
Term.plugin(mongooseDelete,{ 
    deletedAt: true,
    overrideMethods: 'all'})
  
module.exports = mongoose.model('Term', Term)
