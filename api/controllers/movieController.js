var movieModel = require('../models/movieModel.js');

/**
 * movieController.js
 *
 * @description :: Server-side logic for managing movies.
 */
module.exports = {

    /**
     * movieController.list()
     */
    list: function (req, res) {
        movieModel.find(function (err, movies) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting movie.',
                    error: err
                });
            }
            return res.json(movies);
        });
    },

    /**
     * movieController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        movieModel.findOne({_id: id}, function (err, movie) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting movie.',
                    error: err
                });
            }
            if (!movie) {
                return res.status(404).json({
                    message: 'No such movie'
                });
            }
            return res.json(movie);
        });
    },

    /**
     * movieController.create()
     */
    create: function (req, res) {
        var movie = new movieModel({
			title : req.body.title,
			genre : req.body.genre,
			description : req.body.description,
			imageurl : req.body.imageurl

        });

        movie.save(function (err, movie) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating movie',
                    error: err
                });
            }
            return res.status(201).json(movie);
        });
    },

    /**
     * movieController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        movieModel.findOne({_id: id}, function (err, movie) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting movie',
                    error: err
                });
            }
            if (!movie) {
                return res.status(404).json({
                    message: 'No such movie'
                });
            }

            movie.title = req.body.title ? req.body.title : movie.title;
			movie.genre = req.body.genre ? req.body.genre : movie.genre;
			movie.description = req.body.description ? req.body.description : movie.description;
			movie.imageurl = req.body.imageurl ? req.body.imageurl : movie.imageurl;
			
            movie.save(function (err, movie) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating movie.',
                        error: err
                    });
                }

                return res.json(movie);
            });
        });
    },

    /**
     * movieController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        movieModel.findByIdAndRemove(id, function (err, movie) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the movie.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
