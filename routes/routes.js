const express = require('express');
const router = express.Router();
const passport = require('../config/passport')
/* Controller */
const restController = require('../controllers/restController.js')
const adminController = require('../controllers/adminController.js')
const userController = require('../controllers/userController.js')
const categoryController = require('../controllers/categoryController.js')
const commentController = require('../controllers/commentController.js')
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

/* admin */
//**authenticatedAdmin
router.get('/admin', authenticatedAdmin, (req, res) => res.redirect('/admin/restaurants'))

//**restaurants
router.get('/admin/restaurants', authenticatedAdmin, adminController.getRestaurants)
router.get('/admin/restaurants/create', authenticatedAdmin, adminController.createRestaurant)
router.post('/admin/restaurants', authenticatedAdmin,
  upload.single('image'), adminController.postRestaurant)                                  //create Restaurant (C)
router.get('/admin/restaurants/:id', authenticatedAdmin, adminController.getRestaurant)       //read Restaurant   (R)
router.get('/admin/restaurants/:id/edit', authenticatedAdmin, adminController.editRestaurant)
router.put('/admin/restaurants/:id', authenticatedAdmin
  , upload.single('image'), adminController.putRestaurant)                                 //edit Restaurant   (U)
router.delete('/admin/restaurants/:id', authenticatedAdmin, adminController.deleteRestaurant) //delete Restaurant (D)

//**categories
router.get('/admin/categories', authenticatedAdmin, categoryController.getCategories)
router.post('/admin/categories', authenticatedAdmin, categoryController.postCategory)         //create categorie  (C)
router.get('/admin/categories/:id', authenticatedAdmin, categoryController.getCategories)     //read categorie    (R)
router.put('/admin/categories/:id', authenticatedAdmin, categoryController.putCategory)       //edit categorie    (U)
router.delete('/admin/categories/:id', authenticatedAdmin, categoryController.deleteCategory) //delete categorie  (D)

/* normal-user */
//**authenticate
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

//**restaurants
router.get('/', authenticated, (req, res) => res.redirect('/restaurants'))
router.get('/restaurants/feeds', authenticated, restController.getFeeds)           //read feeds        (R)
router.get('/restaurants/top', authenticated, restController.getTopRestaurant)     //read top          (R)
router.get('/restaurants', authenticated, restController.getRestaurants)           //read Restaurants  (R)
//restaurant
router.get('/restaurants/:id', authenticated, restController.getRestaurant)        //read Restaurant   (R)
//dashboard
router.get('/restaurants/:id/dashboard', authenticated, restController.getDashBoard)  //read Dashboard (R)

//**users
router.get('/admin/users', authenticatedAdmin, adminController.getUsers)                     //read users   (R)
router.put('/admin/users/:id/toggleAdmin', authenticatedAdmin, adminController.toggleAdmin)  //edit users   (U)
//TOP 10
router.get('/users/top', authenticated, userController.getTopUser)                           //read top (R)
//Profile
router.get('/users/:id', authenticated, userController.getUser)                              //read Profile (R)
router.get('/users/:id/edit', authenticated, userController.editUser)
router.put('/users/:id', authenticated, upload.single('image'), userController.putUser)      //edit Profile (U)

//**others (BOOLEAN) only CD
//like
router.post('/like/:restaurantId', authenticated, userController.addLike)        //create like  (C)
router.delete('/like/:restaurantId', authenticated, userController.removeLike)   //delete like  (D)
//favorite
router.post('/favorite/:restaurantId', authenticated, userController.addFavorite)     //create favorite  (C)
router.delete('/favorite/:restaurantId', authenticated, userController.removeFavorite)//delete favorite  (D)
//following
router.post('/following/:userId', authenticated, userController.addFollowing)         //create following  (C)
router.delete('/following/:userId', authenticated, userController.removeFollowing)    //delete following  (D)
// comments
router.post('/comments', authenticated, commentController.postComment)                //create comment  (C)
router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)   //delete comment  (D)


module.exports = router