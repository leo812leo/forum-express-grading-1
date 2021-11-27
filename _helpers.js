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

function randomDate(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}

function randomChoose(array, n) {
  return array.sort(() => .5 - Math.random()).slice(0, n);
}


module.exports = {
  deleteDuplicated,
  ensureAuthenticated,
  getUser,
  randomDate,
  randomChoose
}
