const router = require('express').Router();
const Movie = require('../models/playlist');
const {getuser} = require('../middleware/authentication'); // Make sure to require your getUser function

router.get('/', async (req, res) => {
  try {
    const uuid = req.cookies.uid;

    if (!uuid) {
      return res.redirect('/');
    }

    const user =  getuser(uuid); // Ensure getUser is an async function if it involves async operations

    if (!user) {
      return res.redirect('/');
    }

    console.log("User found: ", user);

    const data = await Movie.find({ Email: user }); // Assuming user has an email property

    res.render('playlist', { movies: data });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
