const db = require('../../models')
const Category = db.Category
const categoryService = require('../../service/categoryService')

let categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => {
      return res.json(data)
    })
  },
}
module.exports = categoryController