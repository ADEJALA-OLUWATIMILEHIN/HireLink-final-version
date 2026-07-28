import express, { NextFunction, Request, Response } from "express";
import { authenticate } from "../middleware/auth";
import Application from "../models/application";
import { uploadFileToCloudinary, uploadSingleFile } from "../middleware/upload";
import Job from "../models/job";
import User from "../models/user";
import multer from "multer";



 const router = express.Router();

 const handleResumeUpload = (req: Request, res: Response, next: NextFunction) => {
    uploadSingleFile(req, res, (error: unknown) => {
        if (!error) {
            return next();
        }

        const message =
            error instanceof multer.MulterError
                ? error.message
                : error instanceof Error
                    ? error.message
                    : "Resume upload failed";

        return res.status(400).json({ message });
    });
 };

 router.post("/apply/:job_id", authenticate, handleResumeUpload, async (req: Request, res: Response) => {
    const { id, role } = req.user; // From your auth middleware
    const jobId = Number(req.params.job_id);
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
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // 4. Handle File Upload
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a resume" });
        }
        // 5. Prevent Duplicate Applications
        // IMPORTANT: Check if your model uses jobseeker_Id or job_seeker_Id
        const existingApplication = await Application.findOne({
            where: {
                job_id: jobId,
                job_seeker_id: jobseeker.id
            }
        });

        if (existingApplication) {
            return res.status(409).json({ message: "You have already applied for this job" });
        }

        const resume_url = await uploadFileToCloudinary(req.file);

        // 6. Create Application
        const application = await Application.create({
            job_id: jobId,
            job_seeker_id: jobseeker.id,
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
    const jobId = Number(req.params.job_id);

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can view job applications"
        });
    }

    try {
        const job = await Job.findByPk(jobId);
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
            where: { job_id: jobId },
            include: [{
                model: User,
                as: 'jobSeeker'
            }],
            order: [['created_at', 'DESC']]
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
            order: [['created_at', 'DESC']]
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
    const applicationId = Number(req.params.applicationId);
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

        if ((application as any).job.employer_id !== id) {
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


