import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth";
import Job from "../models/job";
import Application from "../models/application";
import Bookmark from "../models/bookmark";

import User from "../models/user";

const router = express.Router();


//GET JOBSEEKER NAME AND EMAIL ADDRESS FOR DASHBOARD
router.get("/employerinfo", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can access employer dashboard"
        });
    }

    try {
        const employer = await User.findOne({ where: { id: id } });
        if (!employer) {
            return res.status(404).json({
                message: "Employer profile not found"
            });
        }

        return res.status(200).json({
            message: "Employer info retrieved successfully",
            name: employer.name,
            email: employer.email
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});


// Get dashboard stats for employer
router.get("/employer", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can access employer dashboard"
        });
    }

    try {
        const totalJobs = await Job.count({ where: { employer_id: id } });
        const activeJobs = await Job.count({ 
            where: { employer_id: id, is_active: true } 
        });
        const totalApplications = await Application.count({
            include: [{
                model: Job,
                as: 'job',
                where: { employer_id: id }
            }]
        });

        return res.status(200).json({
            message: "Employer dashboard stats retrieved successfully",
            stats: {
                totalJobs,
                activeJobs,
                totalApplications
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});
//GET JOBSEEKER NAME AND EMAIL ADDRESS FOR DASHBOARD
router.get("/jobseekerinfo", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can access jobseeker dashboard"
        });
    }

    try {
        const jobseeker = await User.findOne({ where: { id: id } });
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        return res.status(200).json({
            message: "Jobseeker info retrieved successfully",
            name: jobseeker.name,
            email: jobseeker.email
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get dashboard stats for jobseeker
router.get("/jobseeker", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can access jobseeker dashboard"
        });
    }

    try {
        const jobseeker = await User.findOne({ where: { id: id } });
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        const totalApplications = await Application.count({
            where: { job_seeker_id: jobseeker.id }
        });
        const totalBookmarks = await Bookmark.count({
            where: { job_seeker_id: jobseeker.id }
        });

        return res.status(200).json({
            message: "Jobseeker dashboard stats retrieved successfully",
            stats: {
                totalApplications,
                totalBookmarks
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});
//Get Recent applications for dashboard (jobseeker)
router.get("/recentapplications", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can view their applications"
        });
    }

    try {
        const jobseeker = await User.findOne({ where: { id: id } });
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        const applications = await Application.findAll({
            limit: 3,
            where: { jobseeker_id: jobseeker.id },
            include: [{
                model: Job,
                as: 'job'
            }],
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Applications retrieved successfully",
            applications
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

//Get Application status breakdown for dashboard (jobseeker)
router.get("/applicationstatus", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "jobseeker") {
        return res.status(403).json({
            message: "Forbidden: Only jobseekers can view their application status"
        });
    }

    try {
        const jobseeker = await User.findOne({ where: { id: id } });
        if (!jobseeker) {
            return res.status(404).json({
                message: "Jobseeker profile not found"
            });
        }

        const applied = await Application.count({
            where: { job_seeker_id: jobseeker.id, status: "pending" }
        });
        const shortlisted = await Application.count({
            where: { jobseeker_Id: jobseeker.id, status: "reviewed" }
        });
        const rejected = await Application.count({
            where: { jobseeker_Id: jobseeker.id, status: "rejected" }
        });
        const hired = await Application.count({
            where: { jobseeker_Id: jobseeker.id, status: "accepted" }
        });

        return res.status(200).json({
            message: "Application status breakdown retrieved successfully",
            statusBreakdown: {
                applied,
                shortlisted,
                rejected,
                hired
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

export default router;