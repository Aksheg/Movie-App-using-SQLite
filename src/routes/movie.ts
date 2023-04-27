import express from 'express';
import {
    AddMovie, 
   // getMovies, 
    updateMovie, 
    // deleteMovie
} from '../controller/movieController'
import {auth} from "../middlewares/auth"
const router = express.Router();


router.post('/add', auth, AddMovie);
// router.get('/get-movies', auth, getMovies);
router.patch('/update-movies/:id', auth, updateMovie);
// router.delete('/delete-movies/:id', auth, deleteMovie);

export default router;
