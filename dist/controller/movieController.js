"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.getMovies = exports.AddMovie = void 0;
const uuid_1 = require("uuid");
const movieModel_1 = require("../model/movieModel");
const utils_1 = require("../utils/utils");
const AddMovie = async (req, res) => {
    try {
        const verified = req.user;
        const id = (0, uuid_1.v4)();
        // const { title, description, image, price } = req.body
        const movieRecord = await movieModel_1.MovieInstance.create({
            id,
            ...req.body,
            userId: verified.id
        });
        return res.status(201).json({
            msg: "You have successfully added a movie",
            movieRecord
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.AddMovie = AddMovie;
const getMovies = async (req, res) => {
    try {
        // const limit = req.query?.limit as number | undefined;
        // const offset = req.query?.offset as number | undefined;
        // sequelize findAll or findAndCountAll
        // const getAllMovies = await MovieInstance.findAll();
        const getAllMovies = await movieModel_1.MovieInstance.findAndCountAll({
        // limit:limit,
        // offset:offset
        });
        return res.render("layout", { movielist: getAllMovies });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getMovies = getMovies;
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, price } = req.body;
        // Validate with Joi or Zod
        const validationResult = utils_1.updateMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        const updateMovie = await movieModel_1.MovieInstance.findOne({ where: { id } });
        if (!updateMovie) {
            return res.status(400).json({
                error: "Cannot find existing movie"
            });
        }
        const updateRecord = await updateMovie.update({
            title,
            description,
            image,
            price
        });
        return res.status(200).json({
            msg: "You have successfully updated a movie",
            updateRecord
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateMovie = updateMovie;
// export const deleteMovie = async (req:Request, res:Response) => { 
//     try {
//         const {id} = req.params
//         const record = await MovieInstance.findOne({where:{id}});
//         if (!record){
//             return res.status(400).json({
//                 error:"Cannot find existing movie"
//             })
//         }
//         const deletedRecord = await record.destroy();
//         return res.status(200).json({
//             msg: "You have successfully deleted a movie",
//             deletedRecord
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
