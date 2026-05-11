
import React, { useState } from "react";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";
import { Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpApi } from "../../api/authAPI/signUpApi";


const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState<"jobseeker" | "employer">(
    "jobseeker"
  );
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [name, setname] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage] = useState(" ")

  const handleSignup = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userPayload =
      userType === "employer"
        ? {
            name,
            company_name,
            email,
            password,
            role: "employer",
          }
        : {
            name,
            email,
            password,
            role: "jobseeker",
          };

    console.log("SIGNUP PAYLOAD:", userPayload);

    // Call api
    try {
      const res = await SignUpApi(userPayload)

      console.log(res)
      setMessage(res.message);
      navigate('/login')

      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }

    // Mock flow
    // setTimeout(() => {
    //   localStorage.setItem("user", JSON.stringify(userPayload));

    //   if (userType === "employer") {
    //     navigate("/employer");
    //   } else {
    //     navigate("/jobseeker");
    //   }

    //   setIsLoading(false);
    // }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-1xl font-medium text-gray-800">
              Create Account
            </h1>
            <p className="text-gray-500 mt-1">
              Join HireLink and start your journey
            </p>
          </div>

          {/* User Type Toggle */}
          <div className="bg-gray-50 p-1 rounded-lg flex mb-6">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                userType === "jobseeker"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setUserType("jobseeker")}
            >
              Job Seeker
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                userType === "employer"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setUserType("employer")}
            >
              Employer
            </button>
          </div>

          {/* Signup Form */}
          <form className="space-y-4" onSubmit={handleSignup}>
            {/* Name Section */}
            {userType === "employer" ? (
              <div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  required
                  type="text"
                  value={company_name}
                  onChange={(e) => setCompany_name(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Tech Corp LLC"
                />
              </div>
               <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">
                   Name
               </label>
               <input
                 required
                 type="text"
                 value={name}
                 onChange={(e) => setname(e.target.value)}
                 className="w-full px-4 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                 placeholder="Tech Corp LLC"
               />
             </div>
             </div>
            ) : (
              // <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
        //      </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading
                ? "Creating Account..."
                : userType === "employer"
                ? "Create Employer Account"
                : "Create Job Seeker Account"}
            </button>
            <p className='text-red-600 text-center'>{message}</p>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
