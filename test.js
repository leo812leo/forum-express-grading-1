
const db = require('./models')
const { User } = db
let id = {}
const randomchoose = require('./_helpers').randomChoose

async function pairsGenerate(num) {
  const idArray = []
  let pairs = []
  let length = 0
  id = await User.findAll({ attributes: ['id'], raw: true })
  id.forEach(element => { idArray.push(element['id']) })
  while (length < num) {
    pairs = pairs.concat(Array.from({ length: num }).map((item, index) => randomchoose(idArray, 2)))
    pairs = [...new Set(pairs)]
    length = pairs.length
  }
  return pairs.slice(0, num).map((item, index) => {
    return {
      followerId: item[0],
      followingId: item[1]
    }
  })
}

pairsGenerate(10).then(x => console.log(x))
