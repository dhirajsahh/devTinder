const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, email, password, gender, age } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name field is required");
  }
  if (!email) {
    throw new Error("email field is required");
  }
  if (!password) {
    throw new Error("Password is required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid emailId address");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("weak password");
  }
};
module.exports = { validateSignUpData };
