const adminService = require('../../service/adminService.js')
/* DB */
const db = require('../../models')
const { User, Restaurant, Category } = db

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.json(data)
    })
  },
}
module.exports = adminController