"use strict";

var Movies = require("../models/movies");

module.exports = router => {
    //  Movie listing
    router.get("/", (req, res) => {
        Movies.getMovies((err, movies) => {
            if (err) res.send(err);
            else {
                //  Wrap in object the movies
                res.render("movies", { movies });
            }
        });
    });

    //  Add movie form
    router.get("/add", (req, res) => {
        res.render("add-movies");
    });

    // POST Add movie request
    router.post("/add", (req, res) => {
        const newMovie = {
            title: req.body.title.trim(),
            release_date: req.body.release_date.trim(),
            genre: req.body.genre.trim(),
            plot: req.body.plot.trim(),
            director: req.body.director.trim(),
            trailer: req.body.trailer.trim(),
            cover: req.body.cover.trim()
        };

        if (
            !newMovie.title ||
            !newMovie.director ||
            !newMovie.release_date ||
            !newMovie.genre ||
            !newMovie.plot
        ) {
            const error = { msg: "Missing movie info" };
            res.render("add-movies", { error });
        } else {
            Movies.addMovies(newMovie, (err, movies) => {
                if (err) {
                    const error = { msg: "Could not add movie" };
                    res.render("add-movies", { error });
                } else {
                    res.redirect("/movies");
                }
            });
        }
    });

    // GET Details page
    router.get("/details/:id", (req, res) => {
        Movies.findMovieById({ _id: req.params.id }, (err, movie) => {
            if (err) {
                const error = { msg: "Error getting movie details" };
                res.render("movies", { error });
            } else {
                res.render("details", { movie });
            }
        });
    });

    //  DELETE movie request
    router.delete("/delete/:id", (req, res) => {
        Movies.deleteMovies({ _id: req.params.id }, err => {
            if (err) {
                const error = { msg: "Could not delete movie" };
                res.render("movies", { error });
            } else {
                res.sendStatus(200);
            }
        });
    });
};
