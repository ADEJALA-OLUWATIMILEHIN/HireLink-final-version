import express, { Request, Response } from "express";
import { authenticate } from "../middleware/auth";
import Application from "../models/application";
import { uploadSingleFile } from "../middleware/upload";
import Job from "../models/job";
import User from "../models/user";



 const router = express.Router();
 router.post("/apply/:job_id", authenticate, uploadSingleFile, async (req: Request, res: Response) => {
    const { id, role } = req.user; // From your auth middleware
    const { job_id } = req.params;
    const { cover_letter, notes } = req.body;

    // 1. Role Validation
    if (role !== "jobseeker") {
        return res.status(403).json({ message: "Forbidden: Only jobseekers can apply" });
    }

    try {
        // 2. Fetch Jobseeker Profile
        // Ensure 'user_Id' matches your database column name
        const jobseeker = await User.findOne({ where: { id: id } });
        if (!jobseeker) {
            return res.status(404).json({ message: "Jobseeker profile not found" });
        }

        // 3. Check if Job exists
        const job = await Job.findByPk(job_id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // 4. Handle File Upload
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a resume" });
        }
        const resume_url = `/uploads/${req.file.filename}`;

        // 5. Prevent Duplicate Applications
        // IMPORTANT: Check if your model uses jobseeker_Id or job_seeker_Id
        const existingApplication = await Application.findOne({
            where: {
                job_id: job_id,
                job_seeker_Id: jobseeker.id
            }
        });

        if (existingApplication) {
            return res.status(409).json({ message: "You have already applied for this job" });
        }

        // 6. Create Application
        const application = await Application.create({
            job_id,
            jobseeker_Id: jobseeker.id,
            resume_url,
            cover_letter,
            notes
        });

        return res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Get applications for a job (employer)
router.get("/job/:job_id", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { job_id } = req.params;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can view job applications"
        });
    }

    try {
        const job = await Job.findByPk(job_id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer_id !== id) {
            return res.status(403).json({
                message: "Forbidden: You can only view applications for your own jobs"
            });
        }

        const applications = await Application.findAll({
            where: { job_Id: job_id },
            include: [{
                model: User,
                as: 'jobseeker'
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

// Get user's applications (jobseeker)
router.get("/my-applications", authenticate, async (req: Request, res: Response) => {
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
            where: { job_seeker_id: jobseeker.id },
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

//Get Recent applications for dashboard (jobseeker)

// Update application status (employer)
router.put("/:applicationId/status", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;
    const { applicationId } = req.params;
    const { status } = req.body;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can update application status"
        });
    }

    try {
        const application = await Application.findByPk(applicationId, {
            include: [{
                model: Job,
                as: 'job'
            }]
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        if (application.job.employer_id !== id) {
            return res.status(403).json({
                message: "Forbidden: You can only update applications for your own jobs"
            });
        }

        await application.update({ status });

        return res.status(200).json({
            message: "Application status updated successfully",
            application
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

export default router;


