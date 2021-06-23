const express = require("express");
const db = require("../database").fetchdb();
const { checkForClientError } = require("../utils");

const router = express.Router();

router.get("/:identifier", async function(req, res) {
    checkForClientError(req, res, expectedPathParams={identifier: "plandid-web-server"});

    let data = await db.collection("services").find({_id: req.params.identifier}).next();

    if (!data) {
        data = await db.collection("services").find({name: req.params.identifier}).next();
    }

    res.json(data ? data : {error: "no records found"});
});

module.exports = router;