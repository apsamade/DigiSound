const User = require('../../models/user')

exports.getAccount = async (req, res, next)=>{
    const user = req.session.user
    try {
        res.render('account', {user})
    } catch (error) {
        console.log(error)
    }
}
exports.postAccount = async (req, res, next)=>{
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('session detruite')
                res.redirect('/');
            }
        });
    } catch (error) {
        console.log(error)
    }

}