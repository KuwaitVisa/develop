const mongoose = require('mongoose');

var springedge = require('springedge');
const Agent = mongoose.model('Agent');

module.exports.agent = (req, res, next) => {
    var agent = new Agent();
    agent.agentname = req.body.agentname;
    agent.MobileNumber = req.body.MobileNumber;
    agent.Address = req.body.Address;
    agent.normalRate = req.body.normalRate;
    agent.TatkalRate = req.body.TatkalRate;
    
    console.log(req.body.agentname);
    agent.save((err, doc) => {
        if (!err)
            res.send(doc);
            var params = {
                'sender': 'SRINTL',
                'apikey': '555mkk920953b044o18bzi7p6q3o5nwd2i',
                'to': [agent.MobileNumber  //Moblie Numbers 
                ],
                'message': 'Dear Customer, Welcome to Sri Sairam Travels. Your name has been added as our agent successfully.',
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



module.exports.agentList = (req, res, next) =>{
    Agent.find(
        (err, agent) => {
            if (!agent)
                return res.status(404).json({ status: false, message: 'agent record not found.' });
            else
            console.log('After update:'+agent);
                return res.status(200).json({ status: true,agent });
        }
    );
}