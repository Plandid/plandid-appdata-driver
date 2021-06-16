const express = require("express");
const db = require("../database").fetchdb();
const { checkForClientError } = require("../utils");

const router = express.Router();

router.get("/:name", async function(req, res) {
    checkForClientError(req, res, expectedPathParams={name: "plandid-web-server"});

    const data = await db.collection("services").find({name: req.params.name}).next();

    res.json(data ? data : {error: "no records found"});
});

module.exports = router;