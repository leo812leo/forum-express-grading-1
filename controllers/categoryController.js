const db = require('../models')
const Category = db.Category
const categoryService = require('../service/categoryService')

let categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, (data) => {
      return res.render('admin/categories', data)
    })
  },
  postCategory: (req, res) => {
    categoryService.postCategory(req, res, (data) => {
      return res.redirect('back')
    })
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