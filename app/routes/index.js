module.exports = (app, passport) => {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        else res.redirect("/login");
    }

    app.get("/", isLoggedIn, (req, res) => {
        res.render("index");
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/login");
    });

    app.get("/auth/github", passport.authenticate("github"));

    app.get("/auth/github/callback", passport.authenticate("github", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));
};
