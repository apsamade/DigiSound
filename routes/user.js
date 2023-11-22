const express = require('express')
const router = express.Router()

const homeController = require('../controller/user/home')

const loginController = require('../controller/user/login')
const signInController = require('../controller/user/signIn')

const shopController = require('../controller/user/shop')
const produitController = require('../controller/user/produit')



router.get('/', homeController.getHome)
router.post('/', homeController.postHome)

router.get('/login', loginController.getLogin)
router.post('/login', loginController.postLogin)

router.get('/sign-in', signInController.getSignIn)
router.post('/sign-in', signInController.postSignIn)

router.get('/shop', shopController.getShop)
router.post('/shop', shopController.postShop)

router.get('/shop/produit/:id', produitController.getProduit)
router.post('/shop/produit/:id', produitController.postProduit)
router.get('/shop/produit/:id/session-status', produitController.getStatusSession)

module.exports = router;