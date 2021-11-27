'use strict'
const bcrypt = require('bcryptjs')
const faker = require('faker')
const randomDate = require('../_helpers').randomDate
const temp = [{
  id: 1,
  email: 'root@example.com',
  password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
  isAdmin: true,
  name: 'root',
  createdAt: new Date(),
  updatedAt: new Date(),
  image: `https://loremflickr.com/320/240/boy/?random=${Math.random() * 100}`
}, {
  id: 11,
  email: 'user1@example.com',
  password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
  isAdmin: false,
  name: 'user1',
  createdAt: new Date(),
  updatedAt: new Date(),
  image: `https://loremflickr.com/320/240/boy/?random=${Math.random() * 100}`
}, {
  id: 21,
  email: 'user2@example.com',
  password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
  isAdmin: false,
  name: 'user2',
  createdAt: new Date(),
  updatedAt: new Date(),
  image: `https://loremflickr.com/320/240/boy/?random=${Math.random() * 100}`
}]

let data = Array.from({ length: 10 }).map((item, index) => {
  const time = randomDate(new Date(2020, 0, 1), new Date(), 0, 24)
  return {
    id: (index + 3) * 10 + 1,
    email: faker.internet.email(),
    password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
    isAdmin: Math.random() < 0.5,
    name: 'user' + (index + 3),
    createdAt: time,
    updatedAt: time,
    image: `https://loremflickr.com/320/240/boy/?random=${Math.random() * 100}`
  }
})
data = data.concat(temp)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', data, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
