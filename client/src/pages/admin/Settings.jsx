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

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [registrationAlerts, setRegistrationAlerts] = useState(true);

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistrations, setAllowRegistrations] = useState(true);

  // =========================
  // FETCH ADMIN PROFILE
  // =========================

  const fetchAdminProfile = async () => {
    try {
      const response = await api.get("/auth/profile");

      setAdmin({
        name: response.data.name || "",
        email: response.data.email || "",
      });
    } catch (error) {
      console.log("Profile Error:", error);
    }
  };

  useEffect(() => {
    fetchAdminProfile();

    const savedSettings = localStorage.getItem("adminSettings");

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);

      setEmailNotifications(settings.emailNotifications ?? true);
      setBookingNotifications(settings.bookingNotifications ?? true);
      setRegistrationAlerts(settings.registrationAlerts ?? true);
      setMaintenanceMode(settings.maintenanceMode ?? false);
      setAllowRegistrations(settings.allowRegistrations ?? true);
    }
  }, []);

  // =========================
  // UPDATE PROFILE
  // =========================

  const updateAdminProfile = async () => {
    if (!admin.name.trim() || !admin.email.trim()) {
      return alert("Please fill all profile fields");
    }

    try {
      const response = await api.put("/auth/profile", {
        name: admin.name,
        email: admin.email,
      });

      alert(response.data.message || "Profile updated successfully");

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      window.dispatchEvent(new Event("userChanged"));
    } catch (error) {
      console.log("PROFILE UPDATE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    }
  };

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

    if (newPassword.length < 6) {
      return alert("New password must be at least 6 characters");
    }

    try {
      await api.put("/admin/change-password", {
        currentPassword,
        newPassword,
      });

      alert("Password changed successfully");

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
  // SAVE SETTINGS
  // =========================

  const saveSettings = () => {
    const settings = {
      emailNotifications,
      bookingNotifications,
      registrationAlerts,
      maintenanceMode,
      allowRegistrations,
    };

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(settings)
    );

    alert("Settings saved successfully");
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
    <div className="min-h-screen bg-slate-50">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="ml-0 lg:ml-64 min-h-screen pt-20">

        {/* HEADER */}
        <AdminHeader />

        {/* CONTENT */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

          <div className="max-w-6xl mx-auto">

            {/* ================= PAGE HEADER ================= */}

            <div className="mb-6 lg:mb-8">

              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-600">
                Administration
              </p>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-1">
                Admin Settings
              </h1>

              <p className="text-sm sm:text-base text-slate-500 mt-2">
                Manage your profile, security and platform preferences.
              </p>

            </div>


            {/* ================= PROFILE + SECURITY ================= */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">


              {/* ================= PROFILE ================= */}

              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="
                    w-11 h-11
                    rounded-xl
                    bg-teal-50
                    text-teal-700
                    flex items-center justify-center
                    text-xl
                    shrink-0
                  ">
                    👤
                  </div>

                  <div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Profile Settings
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-500">
                      Update your administrator information.
                    </p>

                  </div>

                </div>


                <div className="space-y-4">

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
                      className="
                        w-full
                        border border-slate-300
                        rounded-xl
                        px-4 py-3
                        text-sm sm:text-base
                        text-slate-800
                        outline-none
                        focus:ring-2
                        focus:ring-teal-500
                        focus:border-teal-500
                        transition
                      "
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
                      className="
                        w-full
                        border border-slate-300
                        rounded-xl
                        px-4 py-3
                        text-sm sm:text-base
                        text-slate-800
                        outline-none
                        focus:ring-2
                        focus:ring-teal-500
                        focus:border-teal-500
                        transition
                      "
                    />

                  </div>

                </div>


                <button
                  onClick={updateAdminProfile}
                  className="
                    mt-5
                    w-full
                    bg-teal-600
                    hover:bg-teal-700
                    active:scale-[0.98]
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                    shadow-sm
                  "
                >
                  Save Profile
                </button>

              </section>


              {/* ================= SECURITY ================= */}

              <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="
                    w-11 h-11
                    rounded-xl
                    bg-slate-100
                    text-slate-700
                    flex items-center justify-center
                    text-xl
                    shrink-0
                  ">
                    🔒
                  </div>

                  <div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Security
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-500">
                      Change your administrator password.
                    </p>

                  </div>

                </div>


                <div className="space-y-4">

                  {/* CURRENT PASSWORD */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Current Password
                    </label>

                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) =>
                        setCurrentPassword(e.target.value)
                      }
                      placeholder="Current password"
                      className="
                        w-full
                        border border-slate-300
                        rounded-xl
                        px-4 py-3
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-teal-500
                        focus:border-teal-500
                        transition
                      "
                    />

                  </div>


                  {/* NEW PASSWORD */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      New Password
                    </label>

                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(e.target.value)
                      }
                      placeholder="New password"
                      className="
                        w-full
                        border border-slate-300
                        rounded-xl
                        px-4 py-3
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-teal-500
                        focus:border-teal-500
                        transition
                      "
                    />

                  </div>


                  {/* CONFIRM PASSWORD */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm password"
                      className="
                        w-full
                        border border-slate-300
                        rounded-xl
                        px-4 py-3
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-teal-500
                        focus:border-teal-500
                        transition
                      "
                    />

                  </div>

                </div>


                <button
                  onClick={changePassword}
                  className="
                    mt-5
                    w-full
                    bg-slate-900
                    hover:bg-slate-800
                    active:scale-[0.98]
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                    shadow-sm
                  "
                >
                  Update Password
                </button>

              </section>

            </div>


            {/* ================= NOTIFICATIONS ================= */}

            <section className="
              mt-5
              bg-white
              border border-slate-200
              rounded-2xl
              shadow-sm
              p-5 sm:p-6
            ">

              <div className="flex items-center gap-3 mb-5">

                <div className="
                  w-11 h-11
                  rounded-xl
                  bg-teal-50
                  text-teal-700
                  flex items-center justify-center
                  text-xl
                  shrink-0
                ">
                  🔔
                </div>

                <div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Notification Settings
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-500">
                    Choose which notifications you want to receive.
                  </p>

                </div>

              </div>


              <div className="space-y-3">

                {/* EMAIL */}

                <label className="
                  flex items-center justify-between
                  gap-4
                  p-4
                  rounded-xl
                  bg-slate-50
                  border border-slate-100
                  cursor-pointer
                  hover:bg-teal-50
                  transition
                ">

                  <div className="min-w-0">

                    <p className="font-semibold text-sm text-slate-800">
                      Email Notifications
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Receive important admin emails.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) =>
                      setEmailNotifications(e.target.checked)
                    }
                    className="w-5 h-5 accent-teal-600 shrink-0"
                  />

                </label>


                {/* BOOKINGS */}

                <label className="
                  flex items-center justify-between
                  gap-4
                  p-4
                  rounded-xl
                  bg-slate-50
                  border border-slate-100
                  cursor-pointer
                  hover:bg-teal-50
                  transition
                ">

                  <div className="min-w-0">

                    <p className="font-semibold text-sm text-slate-800">
                      Booking Notifications
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Receive alerts for new bookings.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    checked={bookingNotifications}
                    onChange={(e) =>
                      setBookingNotifications(e.target.checked)
                    }
                    className="w-5 h-5 accent-teal-600 shrink-0"
                  />

                </label>


                {/* REGISTRATION */}

                <label className="
                  flex items-center justify-between
                  gap-4
                  p-4
                  rounded-xl
                  bg-slate-50
                  border border-slate-100
                  cursor-pointer
                  hover:bg-teal-50
                  transition
                ">

                  <div className="min-w-0">

                    <p className="font-semibold text-sm text-slate-800">
                      Registration Alerts
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Get alerts when new users register.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    checked={registrationAlerts}
                    onChange={(e) =>
                      setRegistrationAlerts(e.target.checked)
                    }
                    className="w-5 h-5 accent-teal-600 shrink-0"
                  />

                </label>

              </div>

            </section>


            {/* ================= PLATFORM ================= */}

            <section className="
              mt-5
              bg-white
              border border-slate-200
              rounded-2xl
              shadow-sm
              p-5 sm:p-6
            ">

              <div className="flex items-center gap-3 mb-5">

                <div className="
                  w-11 h-11
                  rounded-xl
                  bg-slate-100
                  text-slate-700
                  flex items-center justify-center
                  text-xl
                  shrink-0
                ">
                  ⚙️
                </div>

                <div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Platform Settings
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-500">
                    Control important platform preferences.
                  </p>

                </div>

              </div>


              <div className="space-y-3">

                {/* MAINTENANCE */}

                <label className="
                  flex items-center justify-between
                  gap-4
                  p-4
                  rounded-xl
                  bg-slate-50
                  border border-slate-100
                  cursor-pointer
                  hover:bg-teal-50
                  transition
                ">

                  <div className="min-w-0">

                    <p className="font-semibold text-sm text-slate-800">
                      Maintenance Mode
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Temporarily restrict platform access.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) =>
                      setMaintenanceMode(e.target.checked)
                    }
                    className="w-5 h-5 accent-teal-600 shrink-0"
                  />

                </label>


                {/* REGISTRATION */}

                <label className="
                  flex items-center justify-between
                  gap-4
                  p-4
                  rounded-xl
                  bg-slate-50
                  border border-slate-100
                  cursor-pointer
                  hover:bg-teal-50
                  transition
                ">

                  <div className="min-w-0">

                    <p className="font-semibold text-sm text-slate-800">
                      Allow New Registrations
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Allow students and providers to create accounts.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    checked={allowRegistrations}
                    onChange={(e) =>
                      setAllowRegistrations(e.target.checked)
                    }
                    className="w-5 h-5 accent-teal-600 shrink-0"
                  />

                </label>

              </div>

            </section>


            {/* ================= ACCOUNT ================= */}

            <section className="
              mt-5
              bg-white
              border border-slate-200
              rounded-2xl
              shadow-sm
              p-5 sm:p-6
            ">

              <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              ">

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Account Actions
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Manage your administrator session.
                  </p>

                </div>


                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    sm:w-auto
                    bg-slate-800
                    hover:bg-slate-900
                    active:scale-[0.98]
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                  "
                >
                  🚪 Logout
                </button>

              </div>

            </section>


            {/* ================= SAVE ================= */}

            <section className="
              mt-5
              bg-teal-50
              border border-teal-100
              rounded-2xl
              p-5 sm:p-6
            ">

              <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-4
              ">

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Save Preferences
                  </h2>

                  <p className="text-sm text-slate-600 mt-1">
                    Save your notification and platform settings.
                  </p>

                </div>


                <button
                  onClick={saveSettings}
                  className="
                    w-full
                    sm:w-auto
                    bg-teal-600
                    hover:bg-teal-700
                    active:scale-[0.98]
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                    shadow-sm
                  "
                >
                  Save Settings
                </button>

              </div>

            </section>


            {/* ================= DANGER ZONE ================= */}

            <section className="
              mt-5
              bg-white
              border border-red-200
              rounded-2xl
              overflow-hidden
            ">

              <div className="
                bg-red-50
                px-5 sm:px-6
                py-4
                border-b border-red-100
              ">

                <div className="flex items-center gap-3">

                  <div className="
                    w-10 h-10
                    rounded-xl
                    bg-red-100
                    text-red-600
                    flex items-center justify-center
                    shrink-0
                  ">
                    ⚠️
                  </div>

                  <div>

                    <h2 className="text-lg sm:text-xl font-bold text-red-700">
                      Danger Zone
                    </h2>

                    <p className="text-xs sm:text-sm text-red-600">
                      These actions can permanently remove platform data.
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-5 sm:p-6">

                <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-3
                ">

                  <button
                    onClick={() =>
                      alert(
                        "Delete All Services functionality can be connected to your backend."
                      )
                    }
                    className="
                      w-full
                      border border-red-200
                      bg-white
                      text-red-600
                      hover:bg-red-50
                      active:scale-[0.98]
                      py-3
                      rounded-xl
                      font-semibold
                      transition
                    "
                  >
                    Delete All Services
                  </button>


                  <button
                    onClick={() =>
                      alert(
                        "Delete All Bookings functionality can be connected to your backend."
                      )
                    }
                    className="
                      w-full
                      border border-red-200
                      bg-white
                      text-red-700
                      hover:bg-red-50
                      active:scale-[0.98]
                      py-3
                      rounded-xl
                      font-semibold
                      transition
                    "
                  >
                    Delete All Bookings
                  </button>

                </div>

              </div>

            </section>


            {/* BOTTOM SPACE */}

            <div className="h-8" />

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;