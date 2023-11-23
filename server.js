const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const path = require('path')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const cookieParser = require('cookie-parser')

const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 3000
const URI = process.env.URI

const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')
const webhookRoutes = require('./routes/webhook')


const errController = require('./controller/middleware/error')

app.set('view engine', 'ejs')

const csp = {
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://js.stripe.com/v3/"],
        frameSrc: ["'self'", "https://js.stripe.com"],
    },
};

app.use(cors());
app.use(helmet.contentSecurityPolicy(csp));

app.use(express.raw({ type: 'application/json' }));
app.use(cookieParser())

app.use(session({
        secret: "jujutsukaisenonepiece123456",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
}))

app.use(express.static(path.dirname('public')))
app.use(bodyParser.urlencoded({extended: false}))


app.use(userRoutes)
app.use(adminRoutes)
app.use(webhookRoutes)
// Autres configurations middleware, gestion des erreurs, etc.

// 404 handler
app.use(errController.get404);


mongoose.connect(URI).then(() => {
    app.listen(PORT, () => { console.log(`écoute sur le port : ${PORT}`) })
    console.log('connexion à la bdd établie !')
}).catch((err) => {
    console.log('erreur lors de la connxion à la bdd ' + err)
})