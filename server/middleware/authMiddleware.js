const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try {

        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                message: "No token found"
            });
        }

        const decoded = jwt.verify(
            token.split(" ")[1],
            process.env.JWT_SECRET
        );

        // 🔥 ADD ROLE HERE
        req.user = decoded.id;
        req.role = decoded.role;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid Token"
        });

    }
};

module.exports = protect;