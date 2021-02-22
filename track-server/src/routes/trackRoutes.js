const express = require('express');
const mongoose = require('mongoose');
const requireRoutes = require('../routes/requireRoutes');
const Track = mongoose.model('Track');

const routes = express.Router();

routes.use(requireRoutes);

routes.get('/tracks', async (req,res) => {
    const tracks = await Track.find({userId: req.user._id});

    res.send(tracks);
}); 

routes.post('/tracks', async (req,res) => {
    const { name, locations } = req.body;

    if(!name || !locations) {
        return res.status(422).send({error: 'Must enter valid name or locations'});
    }

    try{
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();

        res.send(track);
    }
    catch(err) {
        res.status(422).send({error: err.message});
    }    

});

module.exports = routes;