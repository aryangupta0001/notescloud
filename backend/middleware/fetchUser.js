const JWT_TOKEN = "ItsAryan";
const jwt = require("jsonwebtoken");


const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");

    if(!token){
        res.status(401).send("No valid JWT Token found");
    }

    else{   
        // console.log(token);
        try {
            const data = await jwt.verify(token, JWT_TOKEN);
            // console.log("Data :- ", data);
            req.id = await data.id
            // console.log("User :- ", data.user);
            next();
        } catch (error) {
            res.status(401).send({error: "Please authenticate using a valid token"});
        }
    }
}


module.exports = fetchUser;