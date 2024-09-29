import jwt from "jsonwebtoken";

//Authentication
export const verifyToken = (request, response, next) => {
  const token = request.cookies.access_token || "";
  if (!token) {
    return next("You are not authenticated user");
  }

  //here 3rd parameter is a callback having 2 parameters 1. error:in any error while verifying the token and 2 user(this the payload object, which we can use in other middlewares further, therefore assigned to request.user)
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    request.user = decoded; // Add the user data to the request
    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid token" });
  }
};

