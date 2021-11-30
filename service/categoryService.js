const db = require('../models')
const Category = db.Category
let categoryController = {
  getCategories: (req, res, callback) => {
    return Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      callback({ categories })
    })
  },
  postCategory: (req, res, callback) => {
    if (!req.body.name) {
      callback({ status: 'error', message: 'name didn\'t exist' })
    } else {
      return Category.create({
        name: req.body.name
      })
        .then((category) => {
          callback({ status: 'success', message: 'category was successfully create' })
        })
    }
  },
  putCategory: async (req, res) => {
    if (!req.body.name) {
      req.flash('error_messages', 'name didn\'t exist')
      return res.redirect('back')
    } else {
      const category = await Category.findByPk(req.params.id)
      await category.update(req.body)
      res.redirect('/admin/categories')
    }
  },
  deleteCategory: async (req, res) => {

    const category = await Category.findByPk(req.params.id)
    await category.destroy()
    res.redirect('/admin/categories')
  }
}
module.exports = categoryController