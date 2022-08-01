require('mocha-sinon');
const expect = require('chai').expect
const CacheService = require('../src/services/CacheService');

before(function(){
    const MONGO_URI = require('../src/configs/MongoConfig').TEST.uri;
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URI);
});

describe('Cache tests', function () {
    let CacheServiceObj;
    beforeEach(async function() {
        this.sinon.stub(console, 'log');
        CacheServiceObj = new CacheService();
    })
    
    afterEach(async function () {
        await CacheServiceObj.deleteAllCacheData();
    });

    describe('Cache => get tests', function () {
        it('Should log "Cache miss" in case of a cache miss', async function () {
            const newCache = {
                key: 1
            }
            await CacheServiceObj.getCacheById(newCache.key);
            await CacheServiceObj.getAllCacheKeys(); 
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWith('Cache miss')).to.be.true;
        });
        
        it('Should create a cache in case of miss', async function () {
            const newCache = {
                key: 1
            }
            await CacheServiceObj.getCacheById(newCache.key);
            const allKeys = await CacheServiceObj.getAllCacheKeys(); 
            expect(allKeys.length).to.be.equal(1);
        });
        
        it('Should log "Cache hit" in case of a cache hit', async function () {
            const newCache = {
                key: 1,
                value: 'test_value'
            }
            await CacheServiceObj.upsertCacheById(newCache.key, {
                value: newCache.value
            });
            await CacheServiceObj.getCacheById(newCache.key);
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWith('Cache hit')).to.be.true;
        });
        
        it('Should return data in case of hit', async function () {
            const newCache = {
                key: 1,
                value: 'test_value'
            }
            await CacheServiceObj.upsertCacheById(newCache.key, {
                value: newCache.value
            });
            const cache = await CacheServiceObj.getCacheById(newCache.key);
            expect(cache).to.be.equal(newCache.value);
        });

        it('Should return all stored cache keys', async function () {
            for(let i = 1; i < 4; i++){
                await CacheServiceObj.upsertCacheById(i, {});
            }
            const caches = await CacheServiceObj.getAllCacheKeys();
            expect(caches.toString()).to.be.equal("1,2,3");
        });

        it('Should return the expired cache (only validTill updated), and log "Cache miss"', async function () {
            const newCache = {
                value: 'test_value',
                ttl: 1
            }
            await CacheServiceObj.upsertCacheById(1, newCache);
            await sleep(2000);
            const cache = await CacheServiceObj.getCacheById(1);
            expect(console.log.calledOnce).to.be.true;
            expect(console.log.calledWith('Cache miss')).to.be.true;
            expect(cache).to.be.equal(newCache.value);
        });
    });

    describe('Cache => create and update tests', function () {
        it('Should create a new cache ', async function () {
            const newCache = {
                key: 1,
                value: "test_value"
            }
            const cache = await CacheServiceObj.upsertCacheById(newCache.key, {
                value: newCache.value
            });
            const caches = await CacheServiceObj.getAllCacheKeys();
            expect(cache).to.be.equal(newCache.value);
            expect(caches.length).to.be.equal(1);
        });

        it('Should update an existing cache ', async function () {
            const newCache = {
                key: 1
            }
            await CacheServiceObj.upsertCacheById(newCache.key, {});
            await CacheServiceObj.upsertCacheById(newCache.key, {
                value: 'update_value'
            });
            const caches = await CacheServiceObj.getAllCacheKeys();
            expect(caches.length).to.be.equal(1);
        });

        it('Should remove the oldest cache, if the limit excedes', async function () {
            for (key = 1; key < 7; key++) {
                await CacheServiceObj.upsertCacheById(key, {});
            }
            const caches = await CacheServiceObj.getAllCacheKeys();
            expect(caches.toString()).to.be.equal("2,3,4,5,6");
        });
    });

    describe('Cache => remove tests', function () {
        it('Should remove cache by key', async function () {
            const newCache = {
                key: 1
            }
            const cache = await CacheServiceObj.upsertCacheById(newCache.key, {});
            await CacheServiceObj.deleteCacheById(newCache.key);
            const caches = await CacheServiceObj.getAllCacheKeys();
            expect(caches.length).to.be.equal(0);
        });

        it('Should delete all stored cache entries', async function () {
            for (key = 1; key < 6; key++) {
                await CacheServiceObj.upsertCacheById(key, {});
            }
            const caches = await CacheServiceObj.getAllCacheKeys();
            expect(caches.length).to.be.equal(5);
            await CacheServiceObj.deleteAllCacheData();
            const remainingCaches = CacheServiceObj.getAllCacheKeys();
            expect(remainingCaches.length).to.be.equal(undefined);
        });
    });
});

const sleep = function (timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, timeout);
    });
};