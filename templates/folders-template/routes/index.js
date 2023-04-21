const router = require("express").Router();

// ---------- GET ROUTES ---------- \\
router.get("/", (req, res, next) => {
  res.render("index");
});


module.exports = router;
