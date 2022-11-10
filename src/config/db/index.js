const mongoose = require('mongoose')
async function connect(){
    try{
        await mongoose.connect('mongodb://localhost/ls_management'); 
        console.log('connect successful')
    }
   
    catch(error){
        console.log('not successful')
    }
}

module.exports = { connect };
