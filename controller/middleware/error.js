exports.get404 = async (req, res, next)=>{
    const user = req.session.user
    try {
        res.render('404', {user})
    } catch (error) {
        
    }
    
}