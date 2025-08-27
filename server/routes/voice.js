// server/routes/voice.js
const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send('Voice route working!');
});

module.exports = router;
