import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config';

export interface MovieAttributes {
    id:string;
    title:string;
    description:string;
    image:string;
    price:number
    userId:string
}


export class MovieInstance extends Model<MovieAttributes> {
    title: any;
    description: any;
    price: any;
}

MovieInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUIDV4,
    }
},{
    sequelize: db,
    tableName:"movie"
}
)


// relationships in relational data base
// one to many - hasMany
// many to one
// many to many 
// one to one - belongsTo
// 


