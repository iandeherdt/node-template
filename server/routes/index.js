const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const jwt = require('express-jwt');

const router = express.Router();

router.use(
  '/',
  jwt({ secret: process.env.JWT_SECRET })
    .unless({
      path: [
        { url: '/api/status', methods: ['GET'] },
        { url: '/api/auth/login', methods: ['POST'] },
        { url: '/api/user', methods: ['POST'] },
      ],
    }),
);

router.get('/status', (req, res) => res.status(204).send('OK'));
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
