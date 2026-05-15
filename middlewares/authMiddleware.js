const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authorization=req.headers.authorization
    if(!authorization){
        return res.status(401).json({error:"Token no enviado"})
    }
    try {
        const token=authorization.split(" ")[1]
        const decoded = jwt.verify(token, "secret-key");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
module.exports = verifyToken;