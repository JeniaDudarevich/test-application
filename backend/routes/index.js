const express = require("express");
const router = express.Router();
const constants = require("../config/constants");

router.get(constants.DEFAULT_PATH, (request, response) => {
  response.send("API works correctly");
});

module.exports = router;
