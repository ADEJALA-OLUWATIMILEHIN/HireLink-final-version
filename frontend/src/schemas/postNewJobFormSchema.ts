import { z } from "zod";

export const postNewJobFormSchema = z.object({
  title: z
    .string({ message: "Please fill this field." })
    .trim()
    .min(3, { message: "Minimum of 3 characters" }),

  company: z
    .string({ message: "Please enter company name." })
    .trim()
    .min(2, { message: "Minimum of 2 characters" }),

  location: z
    .string({ message: "Please fill this field." })
    .trim(),

  job_type: z.enum(["full-time", "part-time", "contract"], {
    message: "Please select a job type",
  }),

  location_type: z.enum(["on-site", "remote", "hybrid"], {
    message: "Please select location type",
  }),

  salary_min: z.string().optional(),
  salary_max: z.string().optional(),

  description: z.string({ message: "Provide a brief job description" }),

  requirements: z.string({ message: "Provide requirements for the job" }),

  expires_at: z.string().optional(),

  is_active: z.boolean().optional(),

  view_count: z.number().optional(),
});

export type PostNewJobFormSchemaType = z.infer<typeof postNewJobFormSchema>;


