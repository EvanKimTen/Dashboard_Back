const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  projectID: {
    type: String,
    default: process.env.PROJECT_ID,
  },
  APIKey: {
    type: String,
    default: process.env.API_KEY,
  },
  settings: {
    model: { type: String, default: "gpt-3.5-turbo" },
    temperature: { type: Number, default: 0.1 },
    maxchunkSize: { type: Number, default: 400 },
    system: { type: String, default: "" },
    chunkLimit: { type: Number, default: 2 },
  },
});

userSchema.pre("save", async function () {
  // hashing pw
  this.password = await bcrypt.hash(this.password, 5);
});

// userSchema.pre('save', async function (next) { // if pw is changed,
//     if (this.isModified('password')) {
//       this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

module.exports = mongoose.model("User", userSchema);
