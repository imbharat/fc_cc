const Cache = require('../models/CacheModel');

class CacheDAL {
    getCache(condition) {
        return Cache.findOne(condition);
    }
    getAllCacheKeys(condition, sortBy, limit) {
        return Cache.find(condition).sort(sortBy).limit(limit);
    }
    upsertCache(condition, item, options) {
        return Cache.findOneAndUpdate(condition, item, options);
    }
    deleteCache(condition) {
        return Cache.deleteOne(condition);
    }
    deleteMultipleCacheData(condition) {
        return Cache.deleteMany(condition);
    }
    getCountOfCacheEntries(condition) {
        return Cache.count(condition);
    }
}

module.exports = CacheDAL;