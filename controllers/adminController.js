const adminService = require('../service/adminService.js')
/* DB */
const db = require('../models')
const { User, Restaurant, Category } = db
/* PACKAGE */
// IMGUR
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID
// fs
const fs = require('fs')

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, (data) => {
      return res.render('admin/restaurants', data)
    })
  },
  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, (data) => {
      console.log(data)
      return res.render('admin/restaurant', data)
    })
  },
  createRestaurant: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true
    }).then(categories => {
      return res.render('admin/create', { categories })
    })
  },
  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, (data) => {
      if (data['status'] === 'error') {
        req.flash('error_messages', data['message'])
        return res.redirect('back')
      }
      req.flash('success_messages', data['message'])
      res.redirect('/admin/restaurants')
    })
  },
  editRestaurant: async (req, res) => {
    const categories = await Category.findAll({
      raw: true,
      nest: true
    })
    const restaurant = await Restaurant.findByPk(req.params.id)
    return res.render('admin/create', {
      categories: categories,
      restaurant: restaurant.toJSON()
    })
  },
  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },
  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, (data) => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },
  getUsers: (req, res) => {
    return User.findAll({ raw: true }).then(users => {
      return res.render('admin/users', { users })
    })
  },
  toggleAdmin: (req, res) => {
    return User.findByPk(req.params.id)
      .then(
        (user) => {
          if (user.email !== 'root@example.com') {
            user.update({
              isAdmin: !user.isAdmin
            })
              .then(() => {
                req.flash('success_messages', '使用者權限變更成功')
                res.redirect('/admin/users')
              })
          } else {
            req.flash('error_messages', '禁止變更管理者權限')
            return res.redirect('back')
          }
        })
  }
}

module.exports = adminController