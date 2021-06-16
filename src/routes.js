const express = require("express");

const router = express.Router();

router.get("/", function(req, res) {
    res.json({message: "valid credentials"});
});

router.use("/services", require("./routes/services.js"));
router.use("/userTiers", require("./routes/userTiers.js"));

module.exports = router;