const User = require("../models/User");

const getUserKeys = async (userId) => {
  const user = await User.findById(userId);
  const API_KEY = user.APIKey;
  const PROJECT_ID = user.projectID;
  return { API_KEY, PROJECT_ID };
};

module.exports = getUserKeys;
