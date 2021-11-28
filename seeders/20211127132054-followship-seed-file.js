'use strict';
const db = require('../models')
const { User } = db
const randomChoose = require('../_helpers').randomChoose
const randomDate = require('../_helpers').randomDate
const numOfPair = 10

async function pairsGenerate(num) {
  try {
    const idArray = []
    let pairs = []
    let length = 0
    const id = await User.findAll({ attributes: ['id'], raw: true })
    id.forEach(element => { idArray.push(element['id']) })
    while (length < num) {
      pairs = pairs.concat(Array.from({ length: num }).map((item, index) => randomChoose(idArray, 2)))
      pairs = [...new Set(pairs)]
      length = pairs.length
    }
    return pairs.slice(0, num).map((item, index) => {
      const time = randomDate(new Date(2020, 0, 1), new Date(), 0, 24)
      return {
        followerId: item[0],
        followingId: item[1],
        createdAt: time,
        updatedAt: time,
      }
    })
  } catch (e) { console.log(e) }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = await pairsGenerate(numOfPair)
    console.log(data)
    await queryInterface.bulkInsert('Followships', data, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Followships', null, {})
  }
}
