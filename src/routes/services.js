const express = require('express');
const { getdb } = require('@plandid/mongo-utils');
const { ObjectID } = require('mongodb');

const router = express.Router();

const collection = getdb().collection("services");

router.get("/", async function(req, res) {
    let data = await collection.find({}).toArray();

    res.json(data ? data : {error: "no records found"});
});

router.get("/:identifier", async function(req, res) {
    let data = await collection.find({name: req.params.identifier}).next();

    if (!data) {
        data = await collection.find({_id: ObjectID(req.params.identifier)}).next();
    }

    res.json(data ? data : {error: "no records found"});
});

module.exports = router;