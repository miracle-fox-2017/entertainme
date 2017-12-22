const tvModel = require('../models/tvModel');

const create = (req, res) => {
	if (req.body.title !== null && typeof req.body.title !== 'undefined') {
		let tv = new tvModel({
			title: req.body.title || null,
			poster_path: req.body.poster_path || '',
			overview: req.body.overview || '',
			popularity: req.body.popularity || '',
			tagList: req.body.tagList,
		})

		tv.save()
			.then(newTv => {
				res.status(200).send({ status: newTv, message: 'TV Created' });

			}).catch(err => res.status(500).send({ message: 'Something wrong', error: err.message }));

	} else {
		res.status(500).send({ message: 'Fill the data' });
	}
}

const findAll = (req, res) => {
	tvModel.find({})
	.then(tv => {
		res.status(200).send({
			info: 'tv found successfully',
			data: tv
		})
		
	}).catch(err => res.status(500).send({message: err.message}));
}


module.exports = {
	findAll,
	create
}