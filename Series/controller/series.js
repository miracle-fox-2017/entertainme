const Series = require('../models/series')
const Version = require('../models/version')

function create(req,res) {
	Version.findOne()
	.then(v => {
		if(v === null){
			let version = new Version({
				name: 'series',
				version: 0
			})
			version.save()
		}else{
			let series = new Series(req.body);
			series.save((err, series) => {
				if(err){
					res.status(500).send(err)
				}else{
					res.send(series);
				}
			})
		}
	})
	.catch(err => {
		console.log(err)
	})
}

function findAll(req,res) {
	Series.find().sort({ createdAt : 'desc' })
	.then(allseries => {
		res.send({ series: allseries, message: "from API"})
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function update(req,res) {
	Series.findOne({
		_id : req.params.seriesId
	})
	.then(series => {
		series.set({ 
			poster_path: req.body.poster_path || series.poster_path,
			overview: req.body.overview || series.overview,
			title: req.body.title || series.title,
			popularity: req.body.popularity || series.popularity,
			tag: req.body.tag || series.tag,
		})
		series.save((err, result) => {
			if(err) res.status(500).send(err)
			Version.findOne({
				name: 'series'
			})
			  .then(ver => {
			  	ver.set({
			  		version: ver.version+1
			  	})
			  	ver.save()
			  	res.send(result)
			  })
			  .catch(err => {
			  	res.status(500).send(err)
			  })
		})
	})
	.catch(err => {
		res.status(500).send(err)
	})
}

function getVersion(req,res) {
	Version.findOne({
		name: 'series'
	})
	  .then(result => {
	  	res.send(result)
	  })
	  .catch(err => {
	  	res.status(500).send(err)
	  })
}

module.exports = {
	create,
	findAll,
	update,
	getVersion
}