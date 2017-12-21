module.exports = function (tags) {
  if(typeof tags === Array) {
    console.log('array')
  } else {
    console.log('string')
  }
}