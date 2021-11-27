'use strict';
const db = require('../models')
const { User } = db
const randomChoose = require('../_helpers').randomChoose
const randomDate = require('../_helpers').randomDate
const numOfPair = 10
async function pairsGenerate(num) {
  try {
    console.log('pairsGenerate 1')
    id = await User.findAll({ attributes: ['id'], raw: true })
    const idArray = []
    let pairs = []
    id.forEach(element => { idArray.push(element['id']) })
    console.log('pairsGenerate 2')
    let length = 0
    while (length < num) {
      pairs = pairs.concat(
        for (const x of Array.from({ length: num })) {
        randomchoose(idArray, 2))
      }
      pairs = [...new Set(pairs)]
      length = pairs.length
    }
    console.log('pairsGenerate 3')
    return pairs.slice(0, num)
  }
  catch { err => console.log(err) }
}

async function followshipsGenerate(num) {
  console.log('followshipsGenerate')
  let pairs = await pairsGenerate(num)
  console.log('followshipsGenerate 2')
  return pairs.map((item, index) => {
    return {
      followerId: item[0],
      followingId: item[1]
    }
  })
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await followshipsGenerate(numOfPair)
    console.log(data)
    await queryInterface.bulkInsert('Followships', data, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Followships', null, {})
  }
}
