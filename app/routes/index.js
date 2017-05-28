const bodyParser = require("body-parser");
const polls = require("../controllers/polls");

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

    app.get("/polls/new", isLoggedIn, polls.getNewForm);
    app.post("/polls/new", [parseForm, isLoggedIn], polls.new);

    app.get("/polls", polls.index);

    app.get("/polls/:id", polls.show);
    app.post("/polls/:id", parseForm, polls.vote);

    app.get("/polls/:id/delete", polls.delete);

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/login");
    });

    app.get("/new_user", polls.new_user);

    app.get("/auth/github", passport.authenticate("github"));

    app.get("/auth/github/callback", passport.authenticate("github", {
        successRedirect: "/new_user",
        failureRedirect: "/login"
    }));
};
