"use strict";

var Movies = require("../models/movies");

module.exports = function(router) {
    //  Movie listing
    Movies.getMovies((err, movies) => {
        if (err) res.send(err);
        else {
            router.get("/", function(req, res) {
                //  Wrap in object the movies
                res.render("movies", { movies });
            });
        }
    });
};
