
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    // Get the Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {

        return res.status(401).json({
            error: "Authentication required"
        });
    }

    // Check that the header starts with Bearer
    if (!authHeader.startsWith("Bearer ")) {

        return res.status(401).json({
            error: "Invalid authorization format"
        });
    }

    // Get the token
    const token = authHeader.split(" ")[1];

    try {

        // Verify the JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store decoded user information
        req.user = decoded;

        // Continue to the next middleware/controller
        next();

    } catch (error) {

        return res.status(401).json({
            error: "Invalid or expired token"
        });
    }
};

export default authMiddleware;