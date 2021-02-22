require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('../src/routes/authRoutes');
const requireRoutes = require('../src/routes/requireRoutes');
const trackRoutes = require('../src/routes/trackRoutes');

const app = express()

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =  'mongodb+srv://admin:admin@cluster0.4tdu2.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.log('Error in connecting', err);
})

app.get('/', requireRoutes, (req,res) => {
    res.send(`Your email is: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});