
const db = require('./models')
const { User } = db
let id = {}
const randomchoose = require('./_helpers').randomChoose

async function pairsGenerate(num) {
  try {
    id = await User.findAll({ attributes: ['id'], raw: true })
    const idArray = []
    let pairs = []
    id.forEach(element => { idArray.push(element['id']) })

    let length = 0
    while (length < num) {
      pairs = pairs.concat(Array.from({ length: num }).map((item, index) => randomchoose(idArray, 2)))
      pairs = [...new Set(pairs)]
      length = pairs.length
    }
    return pairs.slice(0, num)
  }
  catch { err => console.log(err) }
}

async function followshipsGenerate(num) {
  let pairs = await pairsGenerate(num)

  return pairs.map((item, index) => {
    return {
      followerId: item[0],
      followingId: item[1]
    }
  })
}

followshipsGenerate(10).then(x => console.log(x))
