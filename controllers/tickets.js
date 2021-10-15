const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    create,
    new: newTicket,
    delete: deleteTicket
}

function deleteTicket(req, res) {
    Ticket.findOne({ 'tickets._id': req.params.id }, function(err, flightInfo){
        const destSubdoc = flightInfo.tickets.id(req.params.id);
        destSubdoc.remove();
        flightInfo.save(function(err) {
          res.redirect(`/flights/${flightInfo._id}`);
        });
      });
}

function create(req, res) {
    const ticket = new Ticket(req.body);
    ticket.flight = req.params.id;
    ticket.save(function(err) {
        res.redirect(`/flights/${req.params.id}`);
    });
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flightInfo) {
        res.render('tickets/new', { flightInfo });
    });
}