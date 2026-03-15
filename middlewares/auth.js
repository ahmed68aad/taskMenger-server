const jwt = require("jsonwebtoken");

const authMiddleware = async (request, response, next) => {
  const { token } = request.headers;

  if (!token) {
    return response.json({
      success: false,
      message: "Not Authorized, Login Again",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    request.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    response.json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = authMiddleware;
