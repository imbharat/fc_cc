const validator = require("express-validator");

const CacheController = require("../controllers/CacheController");

const Routes = [
    {
        method: "get",
        route: "/cache/keys",
        controller: CacheController,
        controllerMethod: "getAllCacheKeys",
        validations: [] 
    },
    {
        method: "get",
        route: "/cache/:id",
        controller: CacheController,
        controllerMethod: "getCacheById",
        validations: [
            validator.param("id").isInt()
        ]
    },
    {
        method: "post",
        route: "/cache/:id",
        controller: CacheController,
        controllerMethod: "upsertCacheById",
        validations: [
            validator.param("id").isInt(),
            validator.body("value").optional().isString(),
            validator.body("ttl").optional().isInt()
        ]
    },
    {
        method: "delete",
        route: "/cache/:id",
        controller: CacheController,
        controllerMethod: "deleteCacheById",
        validations: [
            validator.param("id").isInt()
        ]
    },
    {
        method: "delete",
        route: "/cache/",
        controller: CacheController,
        controllerMethod: "deleteAllCacheData",
        validations: []
    }
]

module.exports = Routes;