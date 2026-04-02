import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import Job from "./job";
import User from "./user";

class Bookmark extends Model {
   id!: number;
   job_id!: number;
   job_seeker_id!: number;
    created_at!: Date;
}

Bookmark.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        job_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "jobs",
                key: "id",
            },
        },
        job_seeker_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "Bookmark",
        tableName: "bookmarks",
        timestamps: true,
        updatedAt: false,
    }
);

Bookmark.belongsTo(Job, { foreignKey: "job_id", as: "job" }); 
Job.hasMany(Bookmark, { foreignKey: "job_id", as: "bookmarks" });


Bookmark.belongsTo(User, { foreignKey: "job_seeker_id", as: "jobSeeker" });
User.hasMany(Bookmark, { foreignKey: "job_seeker_id", as: "bookmarks" });


export default Bookmark;