import jwt from 'jsonwebtoken'
import Promise from 'bluebird'
const jwtSecret = "mysuperdupersecret";

const jwtSign = Promise.promisify(jwt.sign)
const jwtVerify = Promise.promisify(jwt.verify)

export const sign = (id, options, method = jwtSign) =>
    method({ id }, jwtSecret, options)

export const signSync = (id, options) => sign(id, options, jwt.sign)

export const verify = (token) => jwtVerify(token, 'A9ZA4VtEKZdMTpJmPezFd8rS')


export const authorizate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).json({  message: 'No token provided.' });
    const token =  authHeader.split("Bearer ")[1];
    if (!token) return res.status(401).json({  message: 'Invalid token stucture, user Bearer authorization' });
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) return res.status(401).json({  message: 'Failed to authenticate token.' });
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}
