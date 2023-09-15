const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    projectID: {
        type: String,
        default: process.env.PROJECT_ID, 
    },
    APIKey: {
        type: String,
        default: process.env.API_KEY,
    },
});

clientSchema.pre('save', async function() { // hashing pw
    this.password = await bcrypt.hash(this.password, 5);
}) 

module.exports = mongoose.model("Client", clientSchema);