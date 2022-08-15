const express = require('express');
const mongoose = require('mongoose');
const validator = require("express-validator");
const jsonParser = require('body-parser').json();

const MongoConfig = require('./configs/MongoConfig');
const Routes = require('./routes/Routes');

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

//initialize routes
Routes.forEach(item => {
    app[item.method](item.route, jsonParser, ...item.validations, async(req, res, next) => {
        const Controller = item.controller["getInstance"]();
        try {
            const errors = validator.validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }
            const response = await Controller[item.controllerMethod](req, res, next);
            res.status(200).json(response);
        }
        catch(ex) {
            res.status(500).json('Something Went Wrong!');
        }
    });
})