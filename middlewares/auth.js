import jwt, { decode } from 'jsonwebtoken';
import authModel from '../app/auth/authModel'
import config from '../config';

export default function(req, res, next) {
    const authHeader = req.header('Authorization')
    if (!authHeader) return next()

    const accessToken = authHeader.match(/Bearer (.*)/)[1]
    jwt.verify(accessToken, config.secretKey, (err, decoded) => {
        if (err) return next()
        req.user = authModel.findById(decoded.sub);
        console.log(req.user)
        next()
    })
}