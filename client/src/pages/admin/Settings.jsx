import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import AdminHeader from "../../components/AdminHeader";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const changePassword = async () => {

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
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">

        <AdminHeader />

        <h1 className="text-3xl font-bold mb-6">
          Admin Settings
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">

          {/* Profile Settings */}
          <div>

            <h2 className="text-2xl font-bold mb-4">
              👤 Profile Settings
            </h2>

            <div className="mb-5">

              <label className="font-semibold">
                Admin Name
              </label>

              <input
                type="text"
                defaultValue="Admin"
                className="w-full border p-3 rounded mt-2"
              />

            </div>

            <div>

              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"
                defaultValue="admin@gmail.com"
                className="w-full border p-3 rounded mt-2"
              />

            </div>

          </div>

          {/* Password */}

          <div className="border-t pt-8">

            <h2 className="text-2xl font-bold mb-4">
              🔒 Change Password
            </h2>

            <div className="mb-5">

              <label className="font-semibold">
                Current Password
              </label>

              <input
  type="password"
  placeholder="Current Password"
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
  className="w-full border p-3 rounded-lg"
/>

            </div>

            <div className="mb-5">

              <label className="font-semibold">
                New Password
              </label>

              <input
  type="password"
  placeholder="New Password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  className="w-full border p-3 rounded-lg"
/>

            </div>

            <div>

              <label className="font-semibold">
                Confirm Password
              </label>

              <input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full border p-3 rounded-lg"
/>

            </div>

          </div>

          {/* Notifications */}

          <div className="border-t pt-8">

            <h2 className="text-2xl font-bold mb-4">
              🔔 Notification Settings
            </h2>

            <div className="space-y-4">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  defaultChecked
                />

                Email Notifications

              </label>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  defaultChecked
                />

                Booking Notifications

              </label>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  defaultChecked
                />

                New User Registration Alerts

              </label>

            </div>

          </div>

          {/* Platform */}

          <div className="border-t pt-8">

            <h2 className="text-2xl font-bold mb-4">
              ⚙ Platform Settings
            </h2>

            <div className="space-y-4">

              <label className="flex items-center gap-3">

                <input type="checkbox" />

                Enable Maintenance Mode

              </label>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  defaultChecked
                />

                Allow New Registrations

              </label>

            </div>

          </div>

          {/* Buttons */}

          <div className="border-t pt-8 flex gap-4">

            <button
  onClick={changePassword}
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
>
  Save Changes
</button>

            <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }}
  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
>
  Logout
</button>

          </div>

          {/* Danger Zone */}

          <div className="border-t pt-8">

            <h2 className="text-red-600 text-2xl font-bold">

              ⚠ Danger Zone

            </h2>

            <p className="text-gray-500 mt-2">

              These actions cannot be undone.

            </p>

            <div className="mt-5 flex gap-4">

              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">

                Delete All Services

              </button>

              <button className="bg-red-800 hover:bg-red-900 text-white px-6 py-3 rounded-lg">

                Delete All Bookings

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;