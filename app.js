const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.set("port", process.env.PORT || 3000);

app.get("/", (res, res) => {
    res.render("index");
});

app.listen(app.get("port"));
