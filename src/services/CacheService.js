const CacheDAL = require('../dal/CacheDAL');

class CacheService {
    constructor() {
        this.CacheDAL = new CacheDAL();
    }
    async getCacheById(id) {
        try {
            const result = await this.CacheDAL.getCache({
                key: id
            });
            if(!(result && this.isValidCache(result)))
            {
                console.log('Cache miss');
            }
            else{
                console.log('Cache hit');
            }
            let newCache = {};
            if(result){
                newCache.value = result.value
            }
            return this.upsertCacheById(id, newCache);
        }
        catch (ex) {
            throw ex;
        }
    }
    async getAllCacheKeys() {
        try {
            const result = await this.CacheDAL.getAllCacheKeys({});
            return [...result.filter(row => this.isValidCache(row)).map(cache => cache.key)];
        }
        catch (ex) {
            throw ex;
        }
    }
    async upsertCacheById(id, cache) {
        //first chek the cache count
        try {
            await this.checkCountAndDelete();
        }
        catch(ex) {
            throw ex;
        }

        let cacheObj = cache;
        //if value is not passed from client in the payload
        if(!cacheObj.value){
            cacheObj.value = (Math.random() + 1).toString(36).substring(2);
        }
        cacheObj = this.addOrUpdateValidity(cacheObj);
        try {
            const result = await this.CacheDAL.upsertCache({
                key: id
            }, cacheObj, {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            });
            return result.value;
        }
        catch(ex) {
            throw ex;
        }
    }
    async deleteCacheById(id) {
        try {
            await this.CacheDAL.deleteCache({
                key: id
            });
            return "Item removed from cache";
        }
        catch (ex) {
            throw ex;
        }
        
    }
    async deleteAllCacheData() {
        try {
            await this.CacheDAL.deleteMultipleCacheData({});
            return "Cache cleared";
        }
        catch (ex) {
            throw ex;
        }
    }
    async checkCountAndDelete() {
        let count;
        try {
            count = await this.CacheDAL.getCountOfCacheEntries({})
        }
        catch(ex) {
            throw ex;
        }
        //deleting the oldest the item which has nearest validTill date, because that was inserted first
        if(count >= 5){
            //get oldest cache
            const oldestCache = await this.CacheDAL.getAllCacheKeys({}, {
                validTill: 1
            }, 1);
            //delete oldest cache
            if(oldestCache?.length){
                return await this.deleteCacheById(oldestCache[0].key);
            }
        }
    }

    addOrUpdateValidity(cacheObj) {
        //if ttl is not passed from client in the payload
        let curr = new Date();
        if(!cacheObj.ttl){
            cacheObj.validTill = curr.setSeconds(curr.getSeconds() + 300);
        }
        else{
            cacheObj.validTill = curr.setSeconds(curr.getSeconds() + cacheObj.ttl);
        }
        return cacheObj;
    }
    isValidCache(cache) {
        return cache.validTill >= new Date() ? true : false;
    }
}

module.exports = CacheService;