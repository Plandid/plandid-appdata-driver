const express = require("express");
const { ObjectID, fetchdb } = require("../database");
const { checkForClientError } = require("../utils");

const router = express.Router();

const db = fetchdb();

router.get("/", async function(req, res) {
    let data = await db.collection("services").find({}).toArray();

    res.json(data ? data : {error: "no records found"});
});

router.get("/:identifier", async function(req, res) {
    checkForClientError(req, res, expectedPathParams={identifier: "plandid-web-server"});

    let data = await db.collection("services").find({name: req.params.identifier}).next();

    if (!data) {
        data = await db.collection("services").find({_id: ObjectID(req.params.identifier)}).next();
    }

    res.json(data ? data : {error: "no records found"});
});

module.exports = router;