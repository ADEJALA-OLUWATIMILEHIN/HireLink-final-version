import { Bell, Lock } from "lucide-react";
import { type FormEvent, useState } from "react";
import { resetPasswordApi } from "../../api/authAPI/resetPasswordApi";

interface JwtPayload {
  id?: string | number;
}

const getUserIdFromToken = () => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return null;
  }

  try {
    const payload = token.split(".")[1];
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(normalizedPayload)) as JwtPayload;

    return decodedPayload.id ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setMessageType(null);

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match");
      setMessageType("error");
      return;
    }

    const userId = getUserIdFromToken();

    if (!userId) {
      setMessage("Please log in again before changing your password");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await resetPasswordApi(userId, newPassword);
      setMessage(res.message);
      setMessageType(res.success ? "success" : "error");

      if (res.success) {
        setNewPassword("");
        setConfirmPassword("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>

      {/* Notifications */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Bell className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900">Notifications</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            "New Job Alerts",
            "Application Status Updates",
            "Marketing Emails",
          ].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">{item}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Lock className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900">Security</h3>
        </div>
        <form className="p-6 space-y-4" onSubmit={handlePasswordUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 disabled:bg-slate-50"
                disabled={isSubmitting}
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 disabled:bg-slate-50"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {message && (
            <p
              className={`text-sm font-medium ${
                messageType === "success" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
