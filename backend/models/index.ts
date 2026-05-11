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
User.hasMany(Job, { foreignKey: 'employer_id', as: 'jobs' });
Job.belongsTo(User, { foreignKey: 'employer_id', as: 'employer' });

// Job-Bookmark associations
Job.hasMany(Bookmark, { foreignKey: 'job_id', as: 'bookmarks' });
Bookmark.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

User.hasMany(Bookmark, { foreignKey: 'job_seeker_id', as: 'bookmarks' });
Bookmark.belongsTo(User, { foreignKey: 'job_seeker_id', as: 'jobSeeker' });

// Job-Application associations
Job.hasMany(Application, { foreignKey: 'job_id', as: 'applications' });
Application.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });

User.hasMany(Application, { foreignKey: 'job_seeker_id', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'job_seeker_id', as: 'jobSeeker' });
export {sequelize}
export default models;
