const Series = require('../model/indexTv')

const findSer = function(req,res){
  Series.find({})
  .then(result=>{
    res.info="TV Series Found Sucessfully"
    res.send(result)
  })
  .catch(err =>{
    console.error(err)
  })
}

const postSer = function(req,res){
  Series.create({
    name:req.body.name,
    title:req.body.title,
    overview:req.body.overview,
    popularity: req.body.popularity,
    poster_path: req.body.poster_path,
    tag:req.body.tag,
    status:req.body.status
  })
  .then(result=>{
    res.send(result)
  })
  .catch(err=>{
    console.error(err)
  })
}

module.exports = {
  findSer,
  postSer
};