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
        res.render("index");
    });

    app.get("/polls/new", pollsController.getNewForm);

    app.post("/polls/new", parseForm, pollsController.new);

    app.get("/polls", isLoggedIn, pollsController.index);

    app.get("/polls/:id", pollsController.show)

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/login");
    });

    app.get("/auth/github", passport.authenticate("github"));

    app.get("/auth/github/callback", passport.authenticate("github", {
        successRedirect: "/polls",
        failureRedirect: "/login"
    }));
};
