const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role });
};

exports.register = async (req, res) => {
  const { name, email, username, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const user = new User({ name, email, username, password: hash, role });
  await user.save();
  res.status(201).json({ message: 'User created' });
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }, '_id name email username role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// LOGIN
// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//     res.json({
//       token,
//       role: user.role,
//       userId: user._id,
//       name: user.name
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // REGISTER
// exports.register = async (req, res) => {
//   const { name, username, email, password, role } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({
//       name,
//       username,
//       email,
//       password: hashedPassword,
//       role: role || 'user'
//     });
//     await user.save();
//     res.status(201).json({ message: 'User created' });
//   } catch (err) {
//     res.status(500).json({ message: 'Registration failed', error: err.message });
//   }
// };

// GET ALL USERS
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to retrieve users' });
//   }
// };

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    const updateData = { name, username, email, role };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};

