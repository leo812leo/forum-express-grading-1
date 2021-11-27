function ensureAuthenticated(req) {
  return req.isAuthenticated()
}

function getUser(req) {
  return req.user
}

function deleteDuplicated(array) {
  const indexArray = []
  const output = []
  array.forEach((item, index) => {
    if (!indexArray.includes(item.Restaurant.id)) {
      output.push(item)
      indexArray.push(item.Restaurant.id)
    }
  })
  return output
}

module.exports = {
  deleteDuplicated,
  ensureAuthenticated,
  getUser,
}
