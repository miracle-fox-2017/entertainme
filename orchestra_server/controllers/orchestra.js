const axios = require('axios')
const redis = require('redis')
     
const Promise =require('bluebird')
Promise.promisifyAll(redis.RedisClient.prototype)
client = redis.createClient()

const getSeriesData =() => axios.get('http://localhost:3002/tv')
const getMovieData =() => axios.get('http://localhost:3001/movie')

//data movie---------------------------
//inipakai redis------------------
async function movieData (req,res){
  try{
    const dataRedisMov = await client.getAsync('movie')//disini kita ngget data assync berdasarkan value
    // console.log('masuk data redismov',dataRedisMov)
    if(!dataRedisMov){//kalau data di redis cache g ada maka 
      const dataMov = await getMovieData()
      client.setAsync('movie',JSON.stringify(dataMov.data))//maka kita set datanya
    }else{
      res.status(200).send(JSON.parse(dataRedisMov))
    }
  }
  catch(err){
    console.error(err)
  }
}

//ini gak pakai redis
// async function movieData (req,res){
//   try{
//     const moviesData = await getMovieData()
//     res.send(moviesData.data)
//   }
//   catch(err){
//     console.error(err)
//   }
// }


//series data---------------------------------
// async function serieData(req,res){
//   try{
//     const tvData = await getSeriesData()
//     res.send(tvData.data)
//   }
//   catch(err){
//     console.error(err)
//   }
// }

async function serieData(req,res){
  try{
    const thisDataSeries = await client.getAsync('serie')
      // console.log('ololol',thisDataSeries)
    if(!thisDataSeries){
      // console.log('masuk sini')
      const dataGetSer = await getSeriesData()
      // console.log(dataGetSer)
      client.setAsync('serie',JSON.stringify(dataGetSer.data))
      res.send(dataGetSer.data)
    }else{
      // console.log('masuk kesini')
      res.send(JSON.parse(thisDataSeries))
    }
  }
  catch(err){
    res.send(err)
  }
}

async function entertainment(req,res){
  // console.log('joioji')
  try{
    const dataEntertainment = await client.getAsync('entertain')
    // const inidata = await client.set(dataEntertainment,'entertain','EX',5)
    // console.log('inidata',inidata)
    // console.log('ini dataEntertainment',dataEntertainment)
    if(!dataEntertainment){
      const dataSeries = await getSeriesData()
      const dataMovie = await getMovieData()
      const data1= dataSeries.data
      const data2 = dataMovie.data
      client.setAsync('entertain',JSON.stringify({data1,data2},'EX',1))
      // client.setAsync('entertain',JSON.stringify(data2))
      // console.log(data1)
      // console.log(dataMovie)ta
      res.send({data1,data2})
      // res.send(JSON.parse(dataMovie))
    }else{
      res.status(200).send(dataEntertainment)
      // console.log('ilangg',dataEntertainment)
    }
  }
  catch(err){
    res.send(err)
  }
}
module.exports ={
  movieData,
  serieData,
  entertainment
}