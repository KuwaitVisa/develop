const mongoose = require('mongoose');

var springedge = require('springedge');
const Customer = mongoose.model('Customer');



module.exports.customer = (req, res, next) => {
    var customer = new Customer();
    customer.fullName = req.body.fullName;
    customer.passportnumber = req.body.passportnumber;
    customer.visaexpdate = req.body.visaexpdate;
    customer.medicalexpdate = req.body.medicalexpdate;
    customer.priority = req.body.priority;
    customer.agentname = req.body.agentname;
    customer.comments = req.body.comments;
    customer.mobile=req.body.mobile;
    console.log(customer.mobile);
    customer.save((err, doc) => {
        if (!err)
            res.send(doc);
            var params = {
                'sender': 'SRINTL',
                'apikey': '555mkk920953b044o18bzi7p6q3o5nwd2i',
                'to': [customer.mobile  //Moblie Numbers 
                ],
                'message': 'Dear Customer, Your passport name ' +customer.fullName+' has been received. You can now track further process here http://srinternationaltravels.com/tracking',
                'format': 'json'
              };
            springedge.messages.send(params, 5000, function (err, response) {
                if (err) {
                  return console.log(err);
                }
                console.log(response);
              });

       

    });
}

module.exports.customerList = (req, res, next) =>{
    Customer.find(
        (err, customer) => {
            if (!customer)
                return res.status(404).json({ status: false, message: 'customer record not found.' });
            else
            console.log('After update:'+customer);
                return res.status(200).json({ status: true,customer });
        }
    );

   
}

module.exports.customerById = (req, res, next) =>{

    let id = req.params._id;
    console.log('Controller::::'+id);
    Customer.findById(id,
        (err, customer) => {
            if (!customer)
                return res.status(404).json({ status: false, message: 'customer record not found.' });
            else
                return res.status(200).json({ status: true,customer });
        }
    );
}

module.exports.customerByNearDays = (req, res, next) =>{
    var receiveDate = new Date();
    var receiveDate1 = new Date();
    receiveDate.setDate(receiveDate.getDate()-10);
    //receiveDate1.setDate(receiveDate1.getDate());
    Customer.find({receiveddate: { $lt: receiveDate }  },
        (err, customer) => {
            if (!customer)
                return res.status(404).json({ status: false, message: 'customer record not found.' });
            else
            console.log('After update:'+customer);
                return res.status(200).json({ status: true,customer });
        }
    );
}