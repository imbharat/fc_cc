const express = require('express');
const jsonParser = require("body-parser").json();

const CacheService = require('../services/CacheService');

//initialize router to expose routes
const router = express.Router();

class CacheController {
    constructor(){
        this.CacheService = new CacheService();
    }
    initRoutes() {
        
        //GET all keys
        router.get('/keys', async (req, res) => {
            try {
                const response = await this.CacheService.getAllCacheKeys();
                res.status(200).json(response);
            }
            catch(ex) {
                res.status(500).json('Something Went Wrong!');
            }
        });

        //GET by ID
        router.get('/:id', async (req, res) => {
            let { id } = req.params;
            id = parseInt(id);
            try {
                const response = await this.CacheService.getCacheById(id);
                res.status(200).json(response);
            }
            catch(ex) {
                res.status(500).json('Something Went Wrong!')
            }
        });

        //POST (insert or update)
        router.post('/:id', jsonParser, async (req, res) => {
            let { id } = req.params;
            id = parseInt(id);
            try {
                const response = await this.CacheService.upsertCacheById(id, req.body);
                res.status(200).json(response);
            }
            catch(ex) {
                res.status(500).json('Something Went Wrong!');
            }
        });

        //DELETE by ID
        router.delete('/:id', async (req, res) => {
            let { id } = req.params;
            id = parseInt(id);
            try {
                const response = await this.CacheService.deleteCacheById(id);
                res.status(200).json(response);
            }
            catch(ex) {
                res.status(500).json('Something Went Wrong!');
            }
        });

        //DELETE all
        router.delete('/', async (req, res) => {
            try {
                const response = await this.CacheService.deleteAllCacheData();
                res.status(200).json(response);
            }
            catch(ex) {
                res.status(500).json('Something Went Wrong!');
            }
        });
        
        return router;
    }
}

module.exports = CacheController;