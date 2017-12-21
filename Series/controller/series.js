const Series = require('../models/series')

function create(req,res) {
	let series = new Series(req.body);
	series.save((err, series) => {
		if(err){
			res.status(500).send(err)
		}else{
			res.send(series);
		}
	})
}

function findAll(req,res) {
	Series.find().sort({ createdAt : 'desc' })
	.then(allseries => {
		res.send(allseries)
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

module.exports = {
	create,
	findAll,
}