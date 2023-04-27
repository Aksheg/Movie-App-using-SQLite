import { Request, Response } from "express"
import {v4 as uuidv4} from 'uuid'
import { MovieInstance } from "../model/movieModel"
import { options, updateMovieSchema } from "../utils/utils";

export const AddMovie = async (req: Request | any, res:Response) => {   
    try {
        const verified = req.user;

        const id = uuidv4()
        // const { title, description, image, price } = req.body

        const movieRecord = await MovieInstance.create({
            id,
            ...req.body,
            userId: verified.id
        })

        return res.status(201).json({
            msg: "You have successfully added a movie",
            movieRecord
        })

    } catch (error) {
        console.log(error)
    }
}

export const getMovies = async(req:Request, res:Response) => {
    try {
        // const limit = req.query?.limit as number | undefined;
        // const offset = req.query?.offset as number | undefined;
    // sequelize findAll or findAndCountAll

    // const getAllMovies = await MovieInstance.findAll();
    const getAllMovies = await MovieInstance.findAndCountAll({
        // limit:limit,
        // offset:offset
    });

    return res.render("layout", {movielist: getAllMovies})

    } catch (error) {
        console.log(error)
    }
}

export const updateMovie = async (req:Request, res:Response) => {
    try {

        const {id} = req.params;
        const {title, description, image, price} = req.body;

            // Validate with Joi or Zod
    const validationResult = updateMovieSchema.validate(req.body, options);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ Error: validationResult.error.details[0].message});
    }

    const updateMovie = await MovieInstance.findOne({where:{id}});

    if(!updateMovie) {
        return res.status(400).json({
            error:"Cannot find existing movie"
        })
    }

    const updateRecord = await updateMovie.update({
        title,
        description, 
        image, 
        price
    })

    return res.status(200).json({
        msg: "You have successfully updated a movie",
        updateRecord
    })

    } catch (error) {
       console.log(error) 
    }
}


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