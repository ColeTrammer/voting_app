const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./app/routes");
const passport = require("passport");
const session = require("express-session");
require("dotenv").load();
require("./app/config/passport")(passport);

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "pug");
app.set("port", process.env.PORT);

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "secret.yaml",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.listen(app.get("port"));
