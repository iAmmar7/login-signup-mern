const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "Signup Works" }));

module.exports = router;
