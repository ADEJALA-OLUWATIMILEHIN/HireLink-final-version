import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize";

class User extends Model {
    id!: number;
    email!: string;
    password!: string;
    name! :string;
    role!: "employer" | "jobseeker";
    company_name! :string 
}

User.init(
    {
        // Model attributes are defined 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
    },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("employer", "jobseeker"),
            allowNull: false,
        },
        company_name: {
            type: DataTypes.STRING,
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
        last_login: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
      modelName: "User", // We need to choose the model name
      timestamps: true,
     tableName: "users",      // 👈 MUST MATCH DB
     freezeTableName: true,
     createdAt: "created_at",
     updatedAt: "updated_at",  
  }
);

export default User;