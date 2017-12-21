module.exports = function (tags) {
  if(typeof tags === 'array') {
    console.log('array')
  } else {
    console.log('string')
  }
}