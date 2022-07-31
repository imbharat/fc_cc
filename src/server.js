const express = require('express');
const mongoose = require('mongoose');

const MongoConfig = require('./configs/MongoConfig');
const CacheController = require('./controllers/CacheController');

//initialize express
const app = express();

//Connect to Database (initialize app only if the connection is established)
const env = process.argv[2] || "PROD";
mongoose.connect(MongoConfig[env].uri, (err) => {
    if(err) {
        console.log(err);
        throw err;
    }
    //start the server
    const PORT = process.argv[3] || 3000;
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
});

//initialize cache routes
const cacheRoutes = new CacheController().initRoutes();
app.use('/cache', cacheRoutes);