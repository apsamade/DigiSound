exports.getSignIn = (req, res, next)=>{
    res.render('signIn')
}
exports.postSignIn = async (req, res, next)=>{
    const {pseudo, mdp} = req.body
    if(pseudo && mdp){
        const user = {
            pseudo,
            mdp
        }
        await user.save()
        req.session.user = user;
        res.redirect('/')
    }else{
        res.render('signIn', {err: 'Erreur lors de la tentaive d\'inscription !'})
    }
}