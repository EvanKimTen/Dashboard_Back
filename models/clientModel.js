const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    projectID: {
        type: String,
        default: config.PROJECT_ID, // Use the API_KEY from your configuration
    },
    APIKey: {
        type: String,
        default: config.API_KEY, // Use the API_KEY from your configuration
    },
});

userSchema.pre('save', async function() { // hashing pw
    this.password = await bcrypt.hash(this.password, 5);
}) 

module.exports = mongoose.model("Client", clientSchema);