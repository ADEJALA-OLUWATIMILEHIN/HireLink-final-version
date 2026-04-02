import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

class Job extends Model {
    id!: number;
    employer_id!: number;
    title!: string;
    company!: string;
    location!: string;
    job_type!: "full-time" | "part-time" | "contract" | "internship";
    location_type!: "remote" | "on-site" | "hybrid";
    salary_min!: number;
    salary_max!: number;
    description!: string;
    requirements!: string;
    posted_at!: Date;
    expires_at!: Date;
    is_active!: boolean;
    view_count!: number;
    created_at!: Date;
    updated_at!: Date;
}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        employer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        job_type: {
            type: DataTypes.ENUM("full-time", "part-time", "contract", "internship"),
            allowNull: false,
        },
        location_type: {
            type: DataTypes.ENUM("remote", "on-site", "hybrid"),
            allowNull: false,
        },
        salary_min: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        salary_max: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        requirements: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        posted_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        is_active:{
          type :DataTypes.BOOLEAN, 
          allowNull :false, 
          defaultValue :true
         },
        view_count:{
          type :DataTypes.INTEGER, 
          allowNull :false, 
          defaultValue :0
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
    // Other model options go here
    sequelize, // We need to pass the connection instance
      modelName: "Job", // We need to choose the model name
      timestamps: true,
     tableName: "jobs",      // 👈 MUST MATCH DB
     freezeTableName: true,
       underscored: true,   
  }
);

export default Job;