const express = require("express");
const db = require("../database").fetchdb();
const { checkForClientError } = require("../utils");

const router = express.Router();

router.get("/", async function(req, res) {
    res.json(await db.collection("userTiers").find().toArray());
});

router.get("/:name", async function(req, res) {
    checkForClientError(req, res, expectedPathParams={name: "plandid-web-server"});
    res.json(await db.collection("userTiers").find({name: req.params.name}).next());
});

module.exports = router;