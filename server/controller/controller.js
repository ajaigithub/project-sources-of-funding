
//create a othercontrib 
const models = require('../models');

//post
//save to database
exports.create = (req,res) => {
    console.log(req.body.name)
    console.log('entr createlooop');
    models.Othercontrib.create({
        name:req.body.name,
        description:req.body.description,
        amount:req.body.amount
    }).then(results => {
        console.log(results);
        res.send(results);
    }).catch(err => {
        res.status(500).send('Error'+err);
    })
}
//fetch all data
exports.getall = (req,res) => {
    console.log('entering find all');
    models.Othercontrib.findAll({}).then(results => {
 console.log('find all worked');
       console.log(results) 
    //send all table data to client
    res.send(results)

}).catch(err => {
    res.status(500).send('error ->'+err);
})
};

//delete
exports.delete = (req,res) => {
    models.Othercontrib.destroy({
        where:{name:name}
    }).then(() => {
        console.log('delete')
        res.status(200).send('customer has been deleted')
    })
}















