"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class MovieInstance extends sequelize_1.Model {
}
exports.MovieInstance = MovieInstance;
MovieInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUIDV4,
    }
}, {
    sequelize: database_config_1.default,
    tableName: "movie"
});
// relationships in relational data base
// one to many - hasMany
// many to one
// many to many 
// one to one - belongsTo
// 
