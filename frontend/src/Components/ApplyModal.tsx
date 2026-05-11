import React, { useState } from "react";
import { X, Upload, CheckCircle, FileText } from "lucide-react";
import { applyForJob } from "../api/JobseekerApi/applicationsApi";

interface ApplyModalProps {
  jobId: number;
  jobTitle: string;
  companyName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal = ({
  jobId,
  jobTitle,
  companyName,
  isOpen,
  onClose,
}: ApplyModalProps) => {
  const [step, setStep] = useState(1);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      alert("Please upload your Resume/CV before submitting.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    const result = await applyForJob(jobId, {
      resume: cvFile,
      coverLetter,
    });
    setIsSubmitting(false);

    if (result.ok) {
      setStep(2);
      return;
    }

    setMessage(result.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Apply for {jobTitle}
            </h2>
            <p className="text-sm text-gray-500">{companyName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume / CV <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative ${
                  !cvFile ? "border-gray-300" : "border-indigo-500 bg-indigo-50"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required={!cvFile}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {cvFile ? (
                  <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium">
                    <FileText className="w-5 h-5" />
                    {cvFile.name}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCvFile(null);
                      }}
                      className="ml-2 p-1 bg-white rounded-full hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="text-indigo-600 font-semibold">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Tell us why you're a great fit..."
              />
            </div>

            {message && <p className="text-sm text-red-600">{message}</p>}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Application Sent!
            </h3>
            <p className="text-gray-500 mb-8">
              Your application for <strong>{jobTitle}</strong> has been sent to{" "}
              <strong>{companyName}</strong>. Good luck!
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Back to Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
