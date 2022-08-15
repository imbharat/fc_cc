const CacheService = require('../services/CacheService');

class CacheController {
    static #EXPLICIT = false;
    static #INSTANCE = null;
    
    constructor(){
        if(!CacheController.#EXPLICIT){
            throw new Error('The constructor is private, please use getInstance method');
        }
        this.CacheService = new CacheService();
    }

    static getInstance() {
        CacheController.#EXPLICIT = true;
        if(!CacheController.#INSTANCE){
            CacheController.#INSTANCE = new CacheController();
        }
        CacheController.#EXPLICIT = false;
        return CacheController.#INSTANCE;
    }

    async getAllCacheKeys(req, res, next) {
        try {
            return await this.CacheService.getAllCacheKeys();
        }
        catch(ex) {
            throw ex;
        }
    }

    async getCacheById(req, res, next) {
        let { id } = req.params;
        id = parseInt(id);
        try {
            return await this.CacheService.getCacheById(id);
        }
        catch(ex) {
            throw ex;
        }
    }

    async upsertCacheById(req, res, next) {
        let { id } = req.params;
        id = parseInt(id);
        try {
            return await this.CacheService.upsertCacheById(id, req.body);
        }
        catch(ex) {
            throw ex;
        }
    }

    async deleteCacheById(req, res, next) {
        let { id } = req.params;
        id = parseInt(id);
        try {
            return await this.CacheService.deleteCacheById(id);
        }
        catch(ex) {
            throw ex;
        }
    }

    async deleteAllCacheData(req, res, next) {
        try {
            return await this.CacheService.deleteAllCacheData();
        }
        catch(ex) {
            throw ex;
        }
    }
}

module.exports = CacheController;