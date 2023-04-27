import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { nextTick } from "process";
import { UserInstance } from "../model/userModel";
const jwtsecret = process.env.JWT_SECRET as string;

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

export async function auth(req:Request | any, res:Response, next:NextFunction){
    try{
      // req.cookies.jwt
     const authorization = req.cookies.token;
    //  const authorization = req.cookies.jwt;
  
     if(!authorization){
      return res.redirect('/login')
     }
  
    //  const token = authorization.slice(7, authorization.length);
  
     let verified = jwt.verify(authorization, jwtsecret);
  
     if(!verified){
      return res.redirect('/login')
     }
  
     const {id} = verified  as {[key:string]: string}
  
     //find user by id;
     const user = await UserInstance.findOne({where: {id}})
  
     if(!user){
      return res.redirect('/login')
     }
  
     req.user = verified
     res.locals.user = user;
     next();
  
    }catch(err){
      return res.redirect('/login')
    }
  }
  