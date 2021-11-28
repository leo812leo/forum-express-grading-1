const express = require('express');
const router = express.Router();
const passport = require('../config/passport')

const adminController = require('../controllers/api/adminController.js')
/* package */
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const helpers = require('../_helpers')

/* authenticate */
const authenticated = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/signin')
}
const authenticatedAdmin = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    if (req.user.isAdmin) { return next() }
    return res.redirect('/')
  }
  res.redirect('/signin')
}

router.get('/restaurants', adminController.getRestaurants)
router.get('/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)       //read Restaurant   (R)
router.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)       //read Restaurant   (R)

module.exports = router