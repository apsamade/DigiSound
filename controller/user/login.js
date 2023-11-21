exports.getLogin = (req, res, next)=>{
    res.render('login')
}
exports.postLogin = (req, res, next)=>{
    const {pseudo, mdp} = req.body
    if(pseudo === 'kaioshine78' && mdp === 'samade782'){
        const user = {
            pseudo,
            mdp
        }
        req.session.user = user;
        res.redirect('/')
    }else{
        res.render('login', {err: 'Erreur lors de la tentaive de connexion !'})
    }
}