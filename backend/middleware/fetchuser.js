const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");

  // ✅ Stop execution immediately if no token
  if (!token) {
    return res.status(401).json({
      error: "Authentication token missing",
    });
  }

  try {
    // ✅ Use ENV secret (same as auth route)
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

module.exports = fetchuser;
