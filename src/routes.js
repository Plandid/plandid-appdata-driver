const express = require('express');

const router = express.Router();

router.use("/services", require("./routes/services.js"));
router.use("/clients", require("./routes/clients.js"));
router.use("/userTiers", require("./routes/userTiers.js"));

module.exports = router;