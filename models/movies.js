"use strict";

const mongoose = require("mongoose");
const searchPlugin = require("mongoose-search-plugin");

//  Movie Schema
const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    director: String,
    release_date: Number,
    trailer: String,
    cover: String
});

movieSchema.plugin(searchPlugin, { fields: ["title", "plot", "cover"] });

//  Compile schema into model and export it
const Movies = (module.exports = mongoose.model("Movies", movieSchema));

//  getMovies query
module.exports.getMovies = function(callback, limit) {
    Movies.find(callback)
        .limit(limit)
        .sort([["title", "ascending"]]);
};

//  findMovieById query
module.exports.findMovieById = function(id, callback) {
    Movies.findById(id, callback);
};

//  addMovies method
module.exports.addMovies = function(movie, callback) {
    Movies.create(movie, callback);
};

//  editMovie method
module.exports.editMovies = function(movie, updateMovie, options, callback) {
    Movies.findOneAndUpdate(movie, updateMovie, options, callback);
};

//  deleteMovies method
module.exports.deleteMovies = function(movie, callback) {
    Movies.remove(movie, callback);
};
