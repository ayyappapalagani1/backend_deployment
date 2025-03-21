const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Sample Schema and Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
    
});

const User = mongoose.model('User', UserSchema);

// API Endpoints
app.post('/api/users', async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: 'User created successfully!' });
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/', async (req, res) => {
    //const users = await User.find();
    //res.json(users);
    res.send("Hi....");
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
