var mongoose = require('mongoose');
var Competition = mongoose.model('Competition');

function listAllCompetitions (req, res) {
  Competition.find({}, function (err, competition) {
    if (err)
      res.send(err);
    res.json(competition);
  });
};

function createCompetition (req, res) {
  var newCompetition = new Competition(req.body);
  newCompetition.save(function (err, newCompetition) {
     if (err)
      res.send(err);
    res.json(newCompetition);
  });
}

function getCompetition (req, res) {
  Competition.findById(req.params.id, function (err, competition) {
    if (err)
      res.send(err);
    res.json(competition);
  });
}

function updateCompetition (req, res) {
  Competition.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, competition) {
    if (err)
      res.send(err);
    Object.assign(competition, req.body).save((err, competition) => {
            if (err)
              res.send(err);
            res.json({ message: 'Competition updated!', competition });
        });
  });
};

function deleteCompetition (req, res) {
  Competition.remove({
    _id: req.params.id
  }, function (err, competition) {
    if (err)
      res.send(err);
    res.json({ message: 'Competition successfully deleted' });
  });
};

module.exports = { listAllCompetitions, createCompetition, getCompetition, updateCompetition, deleteCompetition };
