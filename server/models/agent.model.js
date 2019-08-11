const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

var agentSchema = new mongoose.Schema({
    
    agentName: {
        type: String,
        required: 'agentName can\'t be empty'
    },
    MobileNumber: {
        type: String,
        required: 'MobileNumber can\'t be empty',
        unique: true
    },
    Address: {
        type: String
        
        
    },
    normalRate: {
        type: String        
        
    },
    TatkalRate: {
        type: String       
    }
    
});
agentSchema.plugin(AutoIncrement, {inc_field: 'id'});
mongoose.model('Agent', agentSchema);