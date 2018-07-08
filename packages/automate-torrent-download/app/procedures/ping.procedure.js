module.exports = (call, callback) => {
  console.log(call)
  callback(null, { success: true })
}
