"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const jwtsecret = process.env.JWT_SECRET;
// export async function auth(req: Request | any, res: Response, next:NextFunction): Promise<unknown> {
//   try {
//     // req.cookies.jwt
//     const authorization = req.headers.authorization;
//     // const authorization = req.cookies.token;
//     if (!authorization) {
//       return res.status(401).json({ Error: "Kindly sign in as a user" });
//     }
//     const token = authorization.slice(7, authorization.length);
//     let verified = jwt.verify(token, jwtsecret);
//     if (!verified) {
//       return res
//         .status(401)
//         .json({ Error: "token invalid, you can't access this route" });
//     }
//     const {id} = verified as {[key:string]: string}
//     // find user by id
//     const user = await UserInstance.findOne({where: {id}})
//     if (!user) {
//         return res.status(401).json({ Error: "Kindly register/signin as a user" });
//     }
//     req.user = verified
//     next();
//   } catch (error) {
//     res.status(401).json({ Error: "User not logged in" });
//   }
// }
/* =========================== EJS MIDDLEWARE ==================*/
async function auth(req, res, next) {
    try {
        // req.cookies.jwt
        const authorization = req.cookies.token;
        //  const authorization = req.cookies.jwt;
        if (!authorization) {
            return res.redirect('/login');
        }
        //  const token = authorization.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verified) {
            return res.redirect('/login');
        }
        const { id } = verified;
        //find user by id;
        const user = await userModel_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.redirect('/login');
        }
        req.user = verified;
        res.locals.user = user;
        next();
    }
    catch (err) {
        return res.redirect('/login');
    }
}
exports.auth = auth;
