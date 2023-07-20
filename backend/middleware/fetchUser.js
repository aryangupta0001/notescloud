const JWT_TOKEN = "ItsAryan";
const jwt = require("jsonwebtoken");


const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    
    try {
        const data = jwt.verify(token, JWT_TOKEN);
        req.id = await data.id
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid JWT token" });
    }
}

module.exports = fetchUser;