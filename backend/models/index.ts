import sequelize from "../config/sequelize";
import Job from "./job";
import User from "./user";
import Bookmark from "./bookmark";
import Application from "./application";



const models  = {
    Job,
    User,
    Bookmark,
    Application
}

// Define associations
// User associations




// Employer-Job associations
User.hasMany(Job, { foreignKey: 'employer_Id', as: 'jobs' });
Job.belongsTo(User, { foreignKey: 'employer_Id', as: 'employer' });

// Job-Bookmark associations
Job.hasMany(Bookmark, { foreignKey: 'job_Id', as: 'bookmarks' });
Bookmark.belongsTo(Job, { foreignKey: 'job_Id', as: 'job' });

User.hasMany(Bookmark, { foreignKey: 'jobseeker_Id', as: 'bookmarks' });
Bookmark.belongsTo(User, { foreignKey: 'jobseeker_Id', as: 'jobseeker' });

// Job-Application associations
Job.hasMany(Application, { foreignKey: 'job_Id', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'job_Id', as: 'job' });

User.hasMany(Application, { foreignKey: 'jobseeker_Id', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'jobseeker_Id', as: 'jobseeker' });
export {sequelize}
export default models;
