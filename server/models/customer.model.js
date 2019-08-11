const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

var customerSchema = new mongoose.Schema({
    _id:Number,
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    passportnumber: {
        type: String,
        required: 'passportnumber can\'t be empty',
        unique: true
    },
    visaexpdate: {
        type: Date,
        required: 'visaexpdate can\'t be empty'
        
    },
    medicalexpdate: {
        type: Date,
        required: 'medicalexpdate can\'t be empty'
        
    },
    receiveddate: {
        type: Date,
        default: Date.now
        
    },
    submissiondate: {
        type: Date
           
    },
    deliverydate: {
        type: Date
           
    },
    priority: {
        type: String,
        required: 'priority can\'t be empty'
      
    },
    agentname: {
        type: String,
        required: 'agentname can\'t be empty'
      
    },
    status: {
        type: String,
        default: 'active'
      
    },
    comments: {
        type: String,
        default: 'your Document in Progress'
      
    },
    mobile: {
        type: Number,
       
    }

},{_id: false})
customerSchema.plugin(AutoIncrement);


mongoose.model('Customer', customerSchema);