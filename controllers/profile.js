export const renderProfile = (req, res) => {
    const user = req.user;
    if (!user) {
        res.render('login', {
            err: 'You need to login first',
        })
    }
    if (user) {
        res.render('profile', {
            name: user.Username,
        });
    }
};