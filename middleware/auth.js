class Auth {
    validateLogin() {
        return (req, res, next) => {
            console.log(req.url);
            if (typeof req.session.isAdmin === "undefined" && (req.url === "/resetPasswordApply/rojas.arturotsu@gmail.com" && req.method === "GET") || (req.url === "/" && req.method === "GET") || (req.url === "/login" && req.method === "POST") || (req.url === "/resetPassword" && req.method === "GET")) {
                next();
            } else if (typeof req.session.isAdmin !== "undefined" && req.session.isAdmin) {
                next();
            } else {
                res.redirect("/");
            }
            //console.log(req.url);
            //console.log(req.method);
        }
    }
}

module.exports = Auth;