import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { postNewJobFormSchema, type postNewJobFormSchemaType } from "../../schemas/postNewJobFormSchema"
import ActionButton from "./component/ActionButton";
import { PostJobs } from "../../api/EmployerApi/PostJobs";
import { useState } from "react";
 
type FieldName = keyof postNewJobFormSchemaType;
 
type SelectOption = {
    label: string;
    value: string;
};
 
interface BaseField {
    name: FieldName;
    label: string;
    required?: boolean;
}
 
interface InputField extends BaseField {
    type: "input";
    inputType: "text" | "number";
    placeholder: string;
}
 
interface SelectField extends BaseField {
    type: "select";
    options: SelectOption[];
}
 
type FormField = InputField | SelectField;
 
 
const PostNewJob = () => {
 
    const inputFields: FormField[] = [
        {
            type: "input",
            name: "title",
            label: "Job Title",
            placeholder: "e.g Senior Frontend Engineer",
            inputType: "text",
            required: true,
        },
        {
            type: "input",
            name: "company",
            label: "Company",
            placeholder: "e.g TechNova Ltd",
            inputType: "text",
            required: true,
        },
        {
            type: "input",
            name: "location",
            label: "Location",
            placeholder: "e.g San Francisco, CA",
            inputType: "text",
            required: true,
        },
        {
            type: "select",
            name: "location_type",
            label: "Location Type",
            options: [
                { label: "On-site", value: "on-site" },
                { label: "Remote", value: "remote" },
                { label: "Hybrid", value: "hybrid" },
            ],
            required: true,
        },
        {
            type: "input",
            name: "salary_min",
            label: "Minimum Salary",
            placeholder: "e.g 10000",
            inputType: "number",
            required: false,
        },
        {
            type: "input",
            name: "salary_max",
            label: "Maximum Salary",
            placeholder: "e.g 150000",
            inputType: "number",
            required: false,
        },
        {
            type: "select",
            name: "job_type",
            label: "Job Type",
            options: [
                { label: "Full-time", value: "full-time" },
                { label: "Part-time", value: "part-time" },
                { label: "Contract", value: "contract" },
            ],
            required: true,
        },
        {
            type: "input",
            name: "description",
            label: "Job Description",
            placeholder: "Describe the role, responsibilities, and what you're looking for...",
            inputType: "text",
            required: true,
        },
        {
            type: "input",
            name: "requirements",
            label: "Requirements",
            placeholder: "List the qualifications, skills, and experience needed...",
            inputType: "text",
            required: true,
        },
    ];

    const [message,setMessage] = useState("")
 
    const { handleSubmit, control, formState: { errors } } = useForm<postNewJobFormSchemaType>({
        resolver: zodResolver(postNewJobFormSchema),
    });
 
    const handleSubmitForm = async (data: postNewJobFormSchemaType) => {
        try {
            const res = await PostJobs(data);
            setMessage(res.message)
          } catch (error) {
            console.error(error);
          }
    };
 
    const isTextarea = (name: FieldName) =>
        name === "description" || name === "requirements";
 
    const isFullWidth = (name: FieldName) =>
        name === "title" || name === "description" || name === "requirements";
 
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <section className="mt-5 mb-8">
                <h1 className="text-2xl font-medium text-gray-800 mb-2">Post a New Job</h1>
                <p className="text-gray-600">Fill in the details for your job opening</p>
            </section>
 
            <section className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="font-semibold">Job Details</h2>
 
                <form className="mt-4" onSubmit={handleSubmit(handleSubmitForm, (errs) => { console.log(errs); })}>
                    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
 
                        {inputFields.map((eachInput, idx) => {
                            if (eachInput.type === "input") {
                                return (
                                    <div
                                        className={`${isFullWidth(eachInput.name) ? "md:col-span-2" : ""}`}
                                        key={idx}
                                    >
                                        <Controller
                                            name={eachInput.name}
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex flex-col space-y-2">
                                                    <span className="flex space-x-1">
                                                        <label>{eachInput.label}</label>
                                                        {eachInput.required && <p className="text-red-500">*</p>}
                                                    </span>
                                                    {isTextarea(eachInput.name) ? (
                                                        <textarea
                                                            {...field}
                                                            className="resize-none bg-[#F8FAFC] py-2 px-4 rounded-md w-full outline-none"
                                                            rows={4}
                                                            placeholder={eachInput.placeholder}
                                                        />
                                                    ) : (
                                                        <input
                                                            {...field}
                                                            type={eachInput.inputType}
                                                            placeholder={eachInput.placeholder}
                                                            className="bg-[#F8FAFC] py-2 px-4 rounded-md w-full outline-none"
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        />
                                        {errors[eachInput.name] && (
                                            <p className="text-red-600 text-sm">{errors[eachInput.name]?.message}</p>
                                        )}
                                    </div>
                                );
                            }
 
                            if (eachInput.type === "select") {
                                return (
                                    <div key={idx}>
                                        <Controller
                                            name={eachInput.name}
                                            control={control}
                                            render={({ field }) => (
                                                <div className="flex flex-col space-y-2">
                                                    <span className="flex space-x-1">
                                                        <label>{eachInput.label}</label>
                                                        {eachInput.required && <p className="text-red-500">*</p>}
                                                    </span>
                                                    <select
                                                        {...field}
                                                        className="bg-[#F8FAFC] rounded-md py-2 px-4 outline-none"
                                                    >
                                                        <option value="">Select...</option>
                                                        {eachInput.options.map((opt) => (
                                                            <option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        />
                                        {errors[eachInput.name] && (
                                            <p className="text-red-600 text-sm">{errors[eachInput.name]?.message}</p>
                                        )}
                                    </div>
                                );
                            }
 
                            return null;
                        })}
                    </section>
 
                    <section className="mt-4 flex flex-row space-x-3 items-center">
                        <ActionButton label="Post Job" className="bg-[#4F46E5] text-white font-semibold" />
                        <ActionButton label="Cancel" className="border border-gray-200 text-black font-semibold" />
                    </section>
                    <p className="text-red-600 text-centre">{message} </p>
                </form>
            </section>
        </main>
    );
};
 
export default PostNewJob;