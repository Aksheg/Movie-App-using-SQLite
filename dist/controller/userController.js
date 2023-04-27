"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.getUserAndMovie = exports.Login = exports.Register = void 0;
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const movieModel_1 = require("../model/movieModel");
const jwtsecret = process.env.JWT_SECRET;
/* ======================USER API============================*/
// export const Register = async (req: Request, res: Response) => {
//   try {
//     const { email, firstName, userName, password, confirm_password } = req.body;
//     const iduuid = uuidv4();
//     // Validate with Joi or Zod
//     const validationResult = registerUserSchema.validate(req.body, options);
//     if (validationResult.error) {
//       return res
//         .status(400)
//         .json({ Error: validationResult.error.details[0].message});
//     }
//     // Hash password
//     const passwordHash = await bcrypt.hash(password, 8);
//     // Create user
//     // -check if user exist
//     const user = await UserInstance.findOne({
//       where: { email: email },
//     });
//     if (!user) {
//       let newUser = await UserInstance.create({
//         id: iduuid,
//         email,
//         firstName,
//         userName,
//         password: passwordHash,
//       });
//       // Generate token for user
//       const User = (await UserInstance.findOne({
//         where: { email: email },
//       })) as unknown as { [key: string]: string };
//       const { id } = User;
//       const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30mins" });
//     //   res.cookie('token', token, {httpOnly:true, maxAge:30 * 60 * 1000})
//       // otp
//       // Email
//       return res.status(201).json({
//         msg: "user created successfully",
//         newUser,
//         token,
//       });
//     }
//     res.status(409).json({
//         error:"email already taken"
//     })
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ Error: "Internal server error" });
//   }
// };
// // export const Login = async (req: Request, res: Response) => {
// //   try {
// //     const { email, password } = req.body;
// //     // Validate with Joi or Zod
// //     const validationResult = loginUserSchema.validate(req.body, options);
// //     if (validationResult.error) {
// //       return res
// //         .status(400)
// //         .json({ Error: validationResult.error.details[0].message});
// //     }
// //     const User = (await UserInstance.findOne({
// //       where: { email: email },
// //     })) as unknown as { [key: string]: string };
// //     const { id } = User;
// //     const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });
// //     // res.cookie('token', token, {httpOnly:true, maxAge:30 * 24 * 60 * 60 * 1000})
// //     const validUser = await bcrypt.compare(password, User.password);
// //     if (validUser) {
// //       return res.status(201).json({
// //         msg: "You have successfully logged in",
// //         User,
// //         token,
// //       });
// //     }
// //     return res.status(400).json({Error:"Invalid email/password"})
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ Error: "Internal server error" });
// //   }
// // };
// export const Login = async (req: Request, res: Response) => {
//   try {
//       const {email, password} = req.body;
//       //validate with Joi 
//       const validationResult = loginUserSchema.validate(req.body, options)
//       if(validationResult.error){
//           return res.status(400).json({error: validationResult.error.details[0].message})
//       }
//       const User = await UserInstance.findOne({
//           where:{email:email}
//       }) as unknown as {[key : string]:string}
//       if (!User) {
//           return res.status(400).json({error:"Invalid email/password"})
//       }
//       const {id} = User
//       const token = jwt.sign({id}, jwtsecret, {expiresIn:"30d"})
//       res.cookie("token", token, {httpOnly: true, maxAge:30 * 24 * 60 * 60 * 1000})
//       const validUser = await bcrypt.compare(password, User.password)
//       if(validUser){
//           return res.status(201).json({
//               message: "User logged in successfully",
//               User,
//               token
//           })
//       }
//       return res.status(400).json({error:"Invalid email/password"})
//   } catch (error) {
//       console.log(error)
//   }
// }
// export const getUserAndMovie = async(req:Request, res:Response)=>{
//     try {
//     // sequelize findAll or findAndCountAll
//     const getAllUser = await UserInstance.findAndCountAll({
//         include:[{
//             model:MovieInstance,
//             as:"movie"
//         }]
//     });
//     return res.status(200).json({
//         msg: "You have successfully retrieved all data",
//         count: getAllUser.count,
//         movie: getAllUser.rows
//     })
//     } catch (error) {
//         console.log(error)
//     }
// }
/* =========================EJS API===========================*/
const Register = async (req, res) => {
    try {
        const { email, firstName, userName, password, confirm_password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        // Validate with Joi or Zod
        const validationResult = utils_1.registerUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("Register", { error: validationResult.error.details[0].
                    message });
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(password, 8);
        // Create user
        // -check if user exist
        const user = await userModel_1.UserInstance.findOne({
            where: { email: email },
        });
        if (!user) {
            let newUser = await userModel_1.UserInstance.create({
                id: iduuid,
                email,
                firstName,
                userName,
                password: passwordHash,
            });
            // Generate token for user
            const User = (await userModel_1.UserInstance.findOne({
                where: { email: email },
            }));
            const { id } = User;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30mins" });
            // res.cookie('token', token, {httpOnly:true, maxAge:30 * 60 * 1000})
            // otp
            // Email
            return res.redirect("/login");
        }
        return res.render("Register", { error: "email is already taken" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate with Joi or Zod
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("Login", { error: validationResult.error.details[0].message });
        }
        const User = (await userModel_1.UserInstance.findOne({
            where: { email: email },
        }));
        if (!User) {
            res.render("login", { error: "Invalid email/password" });
        }
        const { id } = User;
        const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: "30d" });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        const validUser = await bcryptjs_1.default.compare(password, User.password);
        if (validUser) {
            return res.redirect('/dashboard');
        }
        res.render("Login", { error: "Invalid email/password" });
    }
    catch (error) {
        console.log(error);
        //   res.status(500).json({ Error: "Internal server error" });
    }
};
exports.Login = Login;
const getUserAndMovie = async (req, res) => {
    try {
        // sequelize findAll or findAndCountAll
        const getAllUser = await userModel_1.UserInstance.findAndCountAll({
            include: [{
                    model: movieModel_1.MovieInstance,
                    as: "movie"
                }]
        });
        return res.status(200).json({
            msg: "You have successfully retrieved all data",
            count: getAllUser.count,
            movie: getAllUser.rows
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserAndMovie = getUserAndMovie;
const Logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};
exports.Logout = Logout;
