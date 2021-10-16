const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    create, 
    new: newFlight,
    show,
    delete: deleteFlight
}

function deleteFlight(req,res) {
    Flight.findByIdAndDelete(req.params.id, function (err) {
        res.redirect('/flights');
      });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flightInfo) {
        Ticket.find({flightInfo: flightInfo._id}, function(err, tickets) {
        res.render('flights/show', { 
          title: 'Flight Info', 
          flightInfo, tickets
    });
  });
});
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
    res.render('flights/index', { flights: flights });
    })
}

function create(req, res) {
    for (let key in req.body) {
    if(req.body[key] === '') delete req.body[key];
      }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights');
    });
}

function newFlight(req, res) {
    res.render('flights/new');
}
