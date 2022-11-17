const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Conduct = new Schema({
    conductName: {
        type: String,
        require: true,
    },
    

})
module.exports = mongoose.model('Conduct', Conduct)
