const User = require('../../models/user')

exports.getLogin = (req, res, next)=>{
    res.render('login')
}
exports.postLogin = async (req, res, next)=>{
    const {pseudo, mdp} = req.body
    const user = await User.findOne({pseudo: pseudo, mdp: mdp})
    if(user){
        req.session.user = user;
        res.redirect('/')
    }else{
        res.render('login', {err: 'Erreur lors de la tentaive de connexion !'})
    }
}