const Flight = require('../models/flight');

module.exports = {
    create,
    delete: deleteDest
}

function deleteDest(req, res) {
    Flight.findOne({ 'destinations._id': req.params.id }, function(err, flightInfo){
        const destSubdoc = flightInfo.destinations.id(req.params.id);
        destSubdoc.remove();
        flightInfo.save(function(err) {
          res.redirect(`/flights/${flightInfo._id}`);
        });
      });
}

function create(req, res) {
    Flight.findById(req.params.id, function(err, flightInfo) {
        console.log(req.body);
        flightInfo.destinations.push(req.body);
        flightInfo.save(function(err) {
            console.log(err);
            res.redirect(`/flights/${flightInfo._id}`);
        });
    });
}