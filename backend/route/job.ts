import express ,{Request, Response}from "express";
import  User  from "../models/user";
import { authenticate } from "../middleware/auth";
import Job from "../models/job";
import { Op } from "sequelize";

const router = express.Router();

// Create job
router.post("/", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can create jobs"
        });
    }

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    const employer_Id = req.user.id
    console.log(employer_Id);
    const { title,company,location, job_type,location_type, salary_min, salary_max,description,requirements,expires_at, is_active,view_count} = req.body;

    try {
        const newJob = await Job.create({
            employer_id :employer_Id,
            title,
            company,
            location,
            job_type,
            location_type,
            salary_min,
            salary_max,
            description,
            requirements,
            expires_at, 
            is_active,
            view_count
        });
   console.log(req.user)
        return res.status(201).json({
            message: "Job created successfully",
            job: newJob
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get all jobs
router.get("/", async (req: Request, res: Response) => {
    try {
        const jobs = await Job.findAll({
            where: { is_active: true},
            order: [['created_at', 'DESC']]
        });

        return res.status(200).json({
            message: "Jobs retrieved successfully",
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Search jobs
router.get("/search", async (req: Request, res: Response) => {
    const { title, location, job_type, salary_min, salary_max } = req.query;

    try {
        const whereClause: any = { is_active: true };

        if (title) {
            whereClause.title = { [Op.iLike]: `%${title}%` };
        }
        if (location) {
            whereClause.location = { [Op.iLike]: `%${location}%` };
        }
        if (job_type) {
            whereClause.job_type = job_type;
        }
        if (salary_min) {
            whereClause.salary_min = { [Op.gte]: parseInt(salary_min as string) };
        }
        if (salary_max) {
            whereClause.salary_max = { [Op.lte]: parseInt(salary_max as string) };
        }

        const jobs = await Job.findAll({
            where: whereClause,
            order: [['created_at', 'DESC']]
        });

        return res.status(200).json({
            message: "Jobs retrieved successfully",
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get my jobs (authenticated employer)
router.get("/my-jobs", authenticate, async (req: Request, res: Response) => {
    const { id, role } = req.user;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can view their jobs"
        });
    }

    try {
        const jobs = await Job.findAll({
            where: { employer_id: id },
            order: [['created_at', 'DESC']]
        });

        return res.status(200).json({
            message: "Your jobs retrieved successfully",
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get jobs by employer
router.get("/employer/:employerId", async (req: Request, res: Response) => {
    const { employerId } = req.params;

    try {
        const jobs = await Job.findAll({
            where: {
                employer_id: employerId,
                is_active: true
            },
            order: [['created_at', 'DESC']]
        });

        return res.status(200).json({
            message: "Employer jobs retrieved successfully",
            jobs
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Patch to update job status
router.patch("/status/:id", authenticate, async (req: Request, res: Response) => {
    const { id: userId, role } = req.user;
    const jobId = Number(req.params.id);
    const { is_active } = req.body;

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can update job status"
        });
    }

    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer_id !== userId) {
            return res.status(403).json({
                message: "Forbidden: You can only update your own jobs"
            });
        }

        job.is_active = is_active;
        await job.save();

        return res.status(200).json({
            message: "Job status updated successfully",
            job
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Get job by ID
router.get("/:id", async (req: Request, res: Response) => {
    const jobId = Number(req.params.id);

    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        return res.status(200).json({
            message: "Job retrieved su....ccessfully",
            job
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Update job
router.put("/:id", authenticate, async (req: Request, res: Response) => {
    const { id: userId, role } = req.user;
    const jobId = Number(req.params.id);

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can update jobs"
        });
    }

    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer_id !== userId) {
            return res.status(403).json({
                message: "Forbidden: You can only update your own jobs"
            });
        }

        await job.update(req.body);

        return res.status(200).json({
            message: "Job updated successfully",
            job
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});

// Delete job
router.delete("/:id", authenticate, async (req: Request, res: Response) => {
    const { id: userId, role } = req.user;
    const jobId = Number(req.params.id);

    if (role !== "employer") {
        return res.status(403).json({
            message: "Forbidden: Only employers can delete jobs"
        });
    }

    try {
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.employer_id !== userId) {
            return res.status(403).json({
                message: "Forbidden: You can only delete your own jobs"
            });
        }

        await job.destroy();

        return res.status(200).json({
            message: "Job deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});
export default router;
