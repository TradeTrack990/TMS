const express = require('express');
const router = express.Router();
const {
  login,
  register,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/authController');
// const authMiddleware = require('../middleware/auth');

router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;

