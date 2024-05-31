const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    Source: { type: String, required: true },
    Value: { type: String, required: true }
  });
const movieSchema = new mongoose.Schema({
  Title: { type: String },
  Year: { type: String,  },
  Rated: { type: String, default: 'N/A' },
  Released: { type: String, default: 'N/A' },
  Runtime: { type: String, default: 'N/A' },
  Genre: { type: String, },
  Director: { type: String, default: 'N/A' },
  Writer: { type: String, default: 'N/A' },
  Actors: { type: String },
  Plot: { type: String, },
  Language: { type: String },
  Country: { type: String},
  Awards: { type: String, default: 'N/A' },
  Poster: { type: String },
  Ratings: [ratingSchema],
  Metascore: { type: String, default: 'N/A' },
  imdbRating: { type: String },
  imdbVotes: { type: String},
  imdbID: { type: String },
  Type: { type: String },
  totalSeasons: { type: String },
  Response: { type: String, },
  Email: { type: String},
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
