const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res){
      const dev = await Dev.find();

      return res.json(dev);
    },
    async store(req, res) {
      const { github_username, techs, latitude, longitude } = req.body;

      let dev = await Dev.findOne({ github_username });
      
      if (!dev){
        const response = await axios.get(`https://api.github.com/users/${github_username}`)
    
        const { name = login, avatar_url, bio } = response.data;
        
        const techsArray = ParseStringAsArray(techs);
        
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        };

        dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location,
        });
      }
      
      return res.json(dev);
    },

    async update(req, res){    
      const { latitude, longitude, techs } = req.body; 

      const techsArray = ParseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      
      await Dev.findOneAndUpdate({ _id: req.params.id }, {
        techs: techsArray,
        location,
      }, function(err, dev) {
        if (err) {
          return res.status(500).json({ success: false, message: err.message })
        }

        if (!dev) {
          return res.status(400).json({ success: false, message: 'Dev não encontrado' });
        }
        res.json({ success: true, message: 'Dev atualizado' });  
      })
        
    },

    async destroy(req, res){
      Dev.findOneAndRemove({ _id: req.params.id }, function(err, dev) {
        if (err) {
          return res.status(500).json({ success: false, message: err.message })
        }
        
        if (!dev) {
          return res.status(400).json({ success: false, message: 'Dev não encontrado' });
        }
        
        res.json({ success: true, message: 'Dev removido' });  
      })
    }
}