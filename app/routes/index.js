const bodyParser = require("body-parser");
const pollsController = require("../controllers/pollsController");

module.exports = (app, passport) => {

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        else res.redirect("/login");
    }

    const parseForm = bodyParser.urlencoded({
        extended: false,
    });

    app.get("/", (req, res) => {
        res.redirect("/polls");
    });

    app.get("/polls/new", isLoggedIn, pollsController.getNewForm);
    app.post("/polls/new", [parseForm, isLoggedIn], pollsController.new);

    app.get("/polls", pollsController.index);

    app.get("/polls/:id", pollsController.show);
    app.post("/polls/:id", parseForm, pollsController.vote);

    app.get("/polls/:id/delete", pollsController.delete);

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/login");
    });

    app.get("/new_user", pollsController.new_user);

    app.get("/auth/github", passport.authenticate("github"));

    app.get("/auth/github/callback", passport.authenticate("github", {
        successRedirect: "/new_user",
        failureRedirect: "/login"
    }));
};
