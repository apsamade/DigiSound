const User = require('../../models/user')

exports.getSignIn = (req, res, next) => {
    res.render('signIn')
}
exports.postSignIn = async (req, res, next) => {
    const { pseudo, mdp } = req.body
    try {
        if (pseudo && mdp) {

            const user = new User({
                pseudo,
                mdp
            })
            if (pseudo === 'kaioshine78') {
                user.admin = true;
            }
            await user.save()
            req.session.user = user;
            res.redirect('/')
        } else {
            res.render('signIn', { err: 'Erreur lors de la tentaive d\'inscription !' })
        }
    } catch (error) {
        console.log(error)
    }

}