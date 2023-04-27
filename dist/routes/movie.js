"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controller/movieController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/add', auth_1.auth, movieController_1.AddMovie);
// router.get('/get-movies', auth, getMovies);
router.patch('/update-movies/:id', auth_1.auth, movieController_1.updateMovie);
// router.delete('/delete-movies/:id', auth, deleteMovie);
exports.default = router;
