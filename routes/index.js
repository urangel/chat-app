const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({ response: "Response from the back end" }).status(200);
});

module.exports = router;