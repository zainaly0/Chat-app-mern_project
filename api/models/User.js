const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true }, // 'username' field is unique
    password: String,                         // 'password' field
}, { timestamps: true });                    // Automatically adds 'createdAt' and 'updatedAt' timestamps

// Create the User model from the schema
const UserModel = mongoose.model('User', UserSchema);

// Export the User model
module.exports = UserModel;
