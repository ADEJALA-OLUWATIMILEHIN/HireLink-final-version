import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";
import Job from "./job";
import User from "./user";

class Application extends Model {
    id!: number;
    job_id!: number;
    job_seeker_id!: number;
    cover_letter!: string | null;
    resume_url!: string;
    applied_date!: Date;
    status! : "pending" | "reviewed" | "accepted" | "rejected";
    reviewed_at!: Date | null;
    notes!: string | null;
    created_at!: Date;
    updated_at!: Date;
}

Application.init(
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
    cover_letter: {
     type: DataTypes.TEXT,
     allowNull: true,
    },
    resume_url: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    applied_date: {
     type: DataTypes.DATE,
     allowNull: false,
     defaultValue: DataTypes.NOW,
    },
    status: {
     type: DataTypes.ENUM("pending", "reviewed", "accepted", "rejected"),
     allowNull: false,
     defaultValue: "pending",
    },
    reviewed_at: {
     type: DataTypes.DATE,
     allowNull: true,
    },
    notes: {
     type: DataTypes.TEXT,
     allowNull: true,
    },
    created_at: {
     type: DataTypes.DATE,
     allowNull: false,
     defaultValue: DataTypes.NOW,
    },
    updated_at: {
     type: DataTypes.DATE,
     allowNull: false,
     defaultValue: DataTypes.NOW,
    },
},
{
    sequelize, // pass your Sequelize instance here
    modelName: 'Application',
    tableName: 'applications',
    timestamps: false, // or true if you want Sequelize to manage timestamps
  }

);


Application.belongsTo(Job, { foreignKey: "job_id", as: "job" });
Job.hasMany(Application, { foreignKey: "job_id", as: "applications" });

Application.belongsTo(User, { foreignKey: "job_seeker_id", as: "jobSeeker" });

export default Application;