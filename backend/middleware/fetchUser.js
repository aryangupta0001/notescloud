const JWT_TOKEN = "ItsAryan";
const jwt = require("jsonwebtoken");


const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");

    if(!token){
        res.status(401).send("No valid JWT Token found");
    }

    else{
        try {
            const data = jwt.verify(token, JWT_TOKEN);  
            req.user = data.user;
            console.log(req.user);
            next();
        } catch (error) {
            res.status(401).send({error: "Please authenticate using a valid token"});
        }
    }
}


module.exports = fetchUser;