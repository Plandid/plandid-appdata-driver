const express = require('express');
const { getdb } = require('@plandid/mongo-utils');

const router = express.Router();

const collection = getdb().collection("userTiers");

router.get("/", async function(req, res) {
    res.json(await collection.find().toArray());
});

router.get("/:name", async function(req, res) {
    checkForClientError(req, res, expectedPathParams={name: "plandid-web-server"});
    res.json(await collection.find({name: req.params.name}).next());
});

module.exports = router;