const express = require('express');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.get('/status', (req, res) => res.status(204).send('OK'));
router.use('/auth', authRoutes);

module.exports = router;
