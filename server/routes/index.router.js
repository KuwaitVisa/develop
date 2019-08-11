const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var springedge = require('springedge');
const Customer = mongoose.model('Customer');

const Agent = mongoose.model('Agent');
const User = mongoose.model('User');
const ctrlUser = require('../controllers/user.controller');
const ctrlCustomer = require('../controllers/customer.controller');
const ctrlAgent = require('../controllers/agent.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/customer', ctrlCustomer.customer);


router.route('/agent').post(function (req, res) {
  let agent = new Agent(req.body);
  agent.save()
    .then(game => {
    res.status(200).json({'agent': 'Agent in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

router.route('/customerById/:_id').get(function (req, res) {
    let id = req.params._id;
    console.log('id::::::::::::::'+id)
    Customer.findById(id,  (err, customer)=> {
        if (!customer)
        return res.status(404).json({ status: false, message: 'customer record not found.' });
        else
        console.log('Customer:::'+customer);
        return res.status(200).json({ status: true,customer });
        
    });
  });

  router.route('/searchByName/:fullName').get(function (req, res) {
    let fullName = req.params.fullName;
    console.log('fullName::::::::::::::'+fullName)
    Customer.find({ fullName: fullName },  (err, customer)=> {
        if (!customer)
        return res.status(404).json({ status: false, message: 'customer record not found.' });
        else
        console.log('Customer:::'+customer);
        return res.status(200).json({ status: true,customer });
        
    });
  });

  router.route('/searchByPassport/:passportnumber').get(function (req, res) {
    let passportnumber = req.params.passportnumber;
    console.log('passportnumber::::::::::::::'+passportnumber)
    Customer.find({ passportnumber: passportnumber },  (err, customer)=> {
        if (!customer)
        return res.status(404).json({ status: false, message: 'customer record not found.' });
        else
        console.log('Customer:::'+customer);
        return res.status(200).json({ status: true,customer });
        
    });
  });

  router.route('/searchByAgentName/:agentname').get(function (req, res) {
    let agentname = req.params.agentname;
    console.log('agentname::::::::::::::'+agentname)
    Customer.find({ agentname: agentname },  (err, customer)=> {
        if (!customer)
        return res.status(404).json({ status: false, message: 'customer record not found.' });
        else
        console.log('Customer:::'+customer);
        return res.status(200).json({ status: true,customer });
        
    });
  });
  

  router.route('/agentById/:_id').get(function (req, res) {
    let id = req.params._id;
    console.log('id::::::::::::::'+id)
    Agent.findById(id,  (err, agent)=> {
        if (!agent)
        return res.status(404).json({ status: false, message: 'agent record not found.' });
        else
        console.log('Agent:::'+agent);
        return res.status(200).json({ status: true,agent });
        
    });
  });
router.get('/customerList',jwtHelper.verifyJwtToken, ctrlCustomer.customerList);
router.get('/customerByNearDays', ctrlCustomer.customerList);

router.get('/agentList',jwtHelper.verifyJwtToken, ctrlAgent.agentList);

router.get('/userList',jwtHelper.verifyJwtToken, ctrlUser.userList);

router.route('/update/:id').post(function (req, res) {
    
    Customer.findById(req.params.id, function(err, customer) {
    if (!customer)
      return next(new Error('Could not load Document'));
    else {
        customer.fullName = req.body.fullName;
        customer.passportnumber = req.body.passportnumber;
        customer.submissiondate = req.body.submissiondate;
        customer.deliverydate = req.body.deliverydate;
        customer.agentname = req.body.agentname;
        customer.mobile=req.body.mobile;
        
        customer.save().then(customer => {
          res.json('Update complete');
          var params = {
            'sender': 'SRINTL',
            'apikey': '555mkk920953b044o18bzi7p6q3o5nwd2i',
            'to': [customer.mobile  //Moblie Numbers 
            ],
            'message': 'Dear Customer, Your passport name ' +customer.fullName+' is submitted at Kuwait consulate. You can now track further process here http://srinternationaltravels.com/tracking',
            'format': 'json'
          };
        springedge.messages.send(params, 5000, function (err, response) {
            if (err) {
              return console.log(err);
            }
            console.log(response);
          });

      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


router.route('/agentupdate/:id').post(function (req, res) {
    
  Agent.findById(req.params.id, function(err, agent) {
  if (!agent)
    return next(new Error('Could not load Document'));
  else {
      agent.agentname = req.body.agentname;
      agent.MobileNumber = req.body.MobileNumber;
      
      console.log("my testing"+agent);
      agent.save().then(agent => {
        res.json('Update complete');
    })
    .catch(err => {
          res.status(400).send("unable to update the database");
    });
  }
});
});


// Defined delete | remove | destroy route
router.route('/delete/:id').get(function (req, res) {
  console.log( req.params.id);
  Customer.findByIdAndRemove({_id: req.params.id}, function(err, customer){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

router.route('/agentdelete/:id').get(function (req, res) {
  console.log( req.params.id);
  Agent.findByIdAndRemove({_id: req.params.id}, function(err, agent){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

router.route('/deleteuser/:id').get(function (req, res) {
  console.log( req.params.id);
  User.findByIdAndRemove({_id: req.params.id}, function(err, user){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});



router.route('/customerBySubmissionDateNull').get(function(req, res) {

        
  Customer.find({ submissiondate: { $eq: null } },(err,customer)=> {
    if (!customer)
    return res.status(404).json({ status: false, message: 'customer record not found.' });
      else
      console.log('Customer:::'+customer);
      return res.status(200).json({ status: true,customer });
      
  });
});
router.route('/customerBySubmissionDate').get(function(req, res) {

      
  Customer.find({ submissiondate: { $ne: null } },(err,customer)=> {
    if (!customer)
    return res.status(404).json({ status: false, message: 'customer record not found.' });
      else
      console.log('Customer:::'+customer);
      return res.status(200).json({ status: true,customer });
      
  });
});
module.exports = router;



