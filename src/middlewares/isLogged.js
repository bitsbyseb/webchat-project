export function isLogged(req,res,next) {
    if (req.cookies.username) {
        next();
    } else {
        res.redirect("/register")
    }
}
export function isRegistered(req,res,next) {
    if (!req.cookies.username) {
        next();
    } else {
        res.redirect("/")
    }
}