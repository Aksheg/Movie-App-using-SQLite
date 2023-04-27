import {DataTypes, Model} from 'sequelize';
import { validate } from 'uuid';
import db from '../config/database.config';
import { MovieInstance } from './movieModel';

export interface UserAttributes {
    id:string;
    email:string;
    firstName:string;
    userName:string;
    password:string
}


export class UserInstance extends Model<UserAttributes> {}

UserInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    tableName:"user"
}
)

UserInstance.hasMany(MovieInstance, {foreignKey:'userId', as:'movie'})
MovieInstance.belongsTo(UserInstance, {foreignKey:'userId', as:'user'})

