exports.getHome =  async (req, res, next)=>{
    const user = req.session.user
    try {
        res.render('home', {user})
    } catch (error) {
        console.log(error)
    }
    
}
exports.postHome = (req, res, next)=>{
    
}