
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import AdminHeader from "../../components/AdminHeader";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // =========================
  // CHANGE PASSWORD
  // =========================
  const changePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return alert("Please fill all password fields");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await api.put("/admin/change-password", {
        currentPassword,
        newPassword,
      });

      alert("Password Changed Successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to change password"
      );
    }
  };

  // =========================
  // FETCH ADMIN PROFILE
  // =========================
  const fetchAdminProfile = async () => {
    try {
      const response = await api.get("/auth/profile");

      setAdmin({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      console.log("Profile Error:", error);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  // =========================
  // UPDATE PROFILE
  // =========================
  const updateAdminProfile = async () => {
    try {
      const response = await api.put("/auth/profile", {
        name: admin.name,
        email: admin.email,
      });

      alert(response.data.message);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
    } catch (error) {
      console.log("PROFILE UPDATE ERROR:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to update profile"
      );
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    window.dispatchEvent(new Event("userChanged"));

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0 ml-0 lg:ml-64">

        {/* HEADER */}
        <AdminHeader />

        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-6xl mx-auto">

          {/* PAGE TITLE */}
          <div className="mb-6 lg:mb-8">

            <p className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
              Administration
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Admin Settings
            </h1>

            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Manage your profile, security and platform preferences.
            </p>

          </div>

          {/* SETTINGS CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* ================= PROFILE ================= */}
            <section className="p-5 sm:p-6 lg:p-8">

              <div className="flex items-start gap-4 mb-6">

                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl shrink-0">
                  👤
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Profile Settings
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Update your administrator account information.
                  </p>
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {/* NAME */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Admin Name
                  </label>

                  <input
                    type="text"
                    value={admin.name}
                    onChange={(e) =>
                      setAdmin({
                        ...admin,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter admin name"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                    transition"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={admin.email}
                    onChange={(e) =>
                      setAdmin({
                        ...admin,
                        email: e.target.value,
                      })
                    }
                    placeholder="Enter email"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800
                    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                    transition"
                  />
                </div>

              </div>

              <button
                onClick={updateAdminProfile}
                className="mt-5 w-full sm:w-auto bg-teal-600 hover:bg-teal-700
                text-white px-6 py-3 rounded-xl font-semibold
                transition shadow-sm hover:shadow-md"
              >
                Save Profile
              </button>

            </section>


            {/* ================= PASSWORD ================= */}
            <section className="border-t border-slate-200 p-5 sm:p-6 lg:p-8">

              <div className="flex items-start gap-4 mb-6">

                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl shrink-0">
                  🔒
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Change Password
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Keep your administrator account secure.
                  </p>
                </div>

              </div>

              <div className="grid md:grid-cols-3 gap-5">

                {/* CURRENT */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Current Password
                  </label>

                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3
                    focus:outline-none focus:ring-2 focus:ring-teal-500
                    focus:border-teal-500 transition"
                  />
                </div>

                {/* NEW */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3
                    focus:outline-none focus:ring-2 focus:ring-teal-500
                    focus:border-teal-500 transition"
                  />
                </div>

                {/* CONFIRM */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3
                    focus:outline-none focus:ring-2 focus:ring-teal-500
                    focus:border-teal-500 transition"
                  />
                </div>

              </div>

              <button
                onClick={changePassword}
                className="mt-5 w-full sm:w-auto bg-slate-900 hover:bg-slate-800
                text-white px-6 py-3 rounded-xl font-semibold
                transition shadow-sm"
              >
                Update Password
              </button>

            </section>


            {/* ================= NOTIFICATIONS ================= */}
            <section className="border-t border-slate-200 p-5 sm:p-6 lg:p-8">

              <div className="flex items-start gap-4 mb-6">

                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl shrink-0">
                  🔔
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Notification Settings
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Choose which notifications you want to receive.
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-teal-50 transition cursor-pointer">

                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-teal-600"
                  />

                  <span className="text-sm sm:text-base font-medium text-slate-700">
                    Email Notifications
                  </span>

                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-teal-50 transition cursor-pointer">

                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-teal-600"
                  />

                  <span className="text-sm sm:text-base font-medium text-slate-700">
                    Booking Notifications
                  </span>

                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-teal-50 transition cursor-pointer">

                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-teal-600"
                  />

                  <span className="text-sm sm:text-base font-medium text-slate-700">
                    New User Registration Alerts
                  </span>

                </label>

              </div>

            </section>


            {/* ================= PLATFORM ================= */}
            <section className="border-t border-slate-200 p-5 sm:p-6 lg:p-8">

              <div className="flex items-start gap-4 mb-6">

                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl shrink-0">
                  ⚙️
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Platform Settings
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Control important platform preferences.
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-teal-50 transition cursor-pointer">

                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-teal-600"
                  />

                  <div>
                    <p className="font-medium text-slate-700">
                      Maintenance Mode
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Temporarily restrict platform access.
                    </p>
                  </div>

                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-teal-50 transition cursor-pointer">

                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 accent-teal-600"
                  />

                  <div>
                    <p className="font-medium text-slate-700">
                      Allow New Registrations
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Allow students and providers to create accounts.
                    </p>
                  </div>

                </label>

              </div>

            </section>


            {/* ================= ACTIONS ================= */}
            <section className="border-t border-slate-200 p-5 sm:p-6 lg:p-8">

              <div className="flex flex-col sm:flex-row gap-3">

                <button
                  onClick={changePassword}
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700
                  text-white px-6 py-3 rounded-xl font-semibold
                  transition shadow-sm"
                >
                  Save Changes
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900
                  text-white px-6 py-3 rounded-xl font-semibold
                  transition"
                >
                  Logout
                </button>

              </div>

            </section>


            {/* ================= DANGER ZONE ================= */}
            <section className="border-t border-red-100 bg-red-50/50 p-5 sm:p-6 lg:p-8">

              <div className="flex items-start gap-4 mb-5">

                <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl shrink-0">
                  ⚠️
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-red-700">
                    Danger Zone
                  </h2>

                  <p className="text-sm text-red-600/80 mt-1">
                    These actions can permanently remove platform data.
                  </p>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                <button
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700
                  text-white px-6 py-3 rounded-xl font-semibold
                  transition"
                >
                  Delete All Services
                </button>

                <button
                  className="w-full sm:w-auto bg-red-800 hover:bg-red-900
                  text-white px-6 py-3 rounded-xl font-semibold
                  transition"
                >
                  Delete All Bookings
                </button>

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;

