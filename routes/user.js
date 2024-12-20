const express = require('express')
const router = express.Router()

const homeController = require('../controller/user/home')

const loginController = require('../controller/user/login')
const signInController = require('../controller/user/signIn')
const accountController = require('../controller/user/account')

const shopController = require('../controller/user/shop')
const produitController = require('../controller/user/produit')
const payementController = require('../controller/user/payement')
const confirmPayementController = require('../controller/user/confirmPayement')



router.get('/', homeController.getHome)
router.post('/', homeController.postHome)

router.get('/login', loginController.getLogin)
router.post('/login', loginController.postLogin)

router.get('/sign-in', signInController.getSignIn)
router.post('/sign-in', signInController.postSignIn)

router.get('/account', accountController.getAccount)
router.post('/account', accountController.postAccount)

router.get('/shop', shopController.getShop)
router.post('/shop', shopController.postShop)

router.get('/panier/:id', payementController.getPayement)
router.post('/panier/:id', payementController.postPayement)

router.get('/panier/:id/confirmation-du-payement', confirmPayementController.getConfirmPayement)
router.post('/panier/:id/confirmation-du-payement', confirmPayementController.postConfirmPayement)

router.get('/shop/produit/:id', produitController.getProduit)
router.post('/shop/produit/:id', produitController.postProduit)

module.exports = router;