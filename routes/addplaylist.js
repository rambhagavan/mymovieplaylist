const express = require('express');
const router = express.Router();
const Movie = require('../models/playlist');
const { getuser } = require('../middleware/authentication');

router.get('/', async (req, res) => {
    let data = req.query.data;
    const uuid = req.cookies.uid;

    if (!uuid) {
        return res.redirect('/');
    }

    const user = getuser(uuid);
    console.log(user);

    try {
        // Parse data if it's a JSON string
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        // Ensure data is an object before modifying
        if (typeof data === 'object' && data !== null) {
            data.Email = user;
            const movie = new Movie(data);
            console.log(data);
            await movie.save();
            res.status(201).send(data); // Sending the modified data back to the client with status 201
        } else {
            res.status(400).send({ error: 'Invalid data format' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send({ error: 'Failed to parse data or save movie' });
    }
});

module.exports = router;
