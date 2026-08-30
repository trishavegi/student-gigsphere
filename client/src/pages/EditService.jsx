import { useState } from "react";
import api from "../services/api";

function EditService({ service, onClose }) {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);
  const [location, setLocation] = useState(service.location || "");
  const [latitude, setLatitude] = useState(service.latitude || "");
  const [longitude, setLongitude] = useState(service.longitude || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      await api.put(
        `/services/${service._id}`,
        {
          title,
          description,
          price,
          location,
          latitude,
          longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Service Updated Successfully!");

      // Close edit form if parent provides onClose
      if (onClose) {
        onClose();
      }

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update service"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">

      <div className="w-full max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 to-teal-900 text-white rounded-2xl p-5 sm:p-6 mb-5 shadow-lg">

          <p className="text-teal-300 text-sm font-semibold uppercase tracking-wide">
            Student GigSphere
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold mt-1">
            Edit Service
          </h1>

          <p className="text-slate-300 text-sm mt-2">
            Update your service details and location.
          </p>

        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl shadow-lg p-5 sm:p-7"
        >

          {/* Service Title */}
          <div className="mb-5">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Service Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter service title"
              className="w-full border border-slate-300 rounded-xl px-4 py-3
              text-slate-800
              focus:outline-none focus:ring-2 focus:ring-teal-500
              focus:border-teal-500 transition"
              required
            />

          </div>

          {/* Description */}
          <div className="mb-5">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your service"
              rows="5"
              className="w-full border border-slate-300 rounded-xl px-4 py-3
              text-slate-800 resize-none
              focus:outline-none focus:ring-2 focus:ring-teal-500
              focus:border-teal-500 transition"
              required
            />

          </div>

          {/* Price */}
          <div className="mb-5">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Price
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
                ₹
              </span>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full border border-slate-300 rounded-xl
                pl-9 pr-4 py-3
                focus:outline-none focus:ring-2 focus:ring-teal-500
                focus:border-teal-500 transition"
                required
              />

            </div>

          </div>

          {/* Location */}
          <div className="mb-5">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Example: Bhimavaram"
              className="w-full border border-slate-300 rounded-xl px-4 py-3
              focus:outline-none focus:ring-2 focus:ring-teal-500
              focus:border-teal-500 transition"
            />

          </div>

          {/* Coordinates */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">

            <h2 className="font-semibold text-slate-800 mb-1">
              📍 Map Location
            </h2>

            <p className="text-xs text-slate-500 mb-4">
              Enter latitude and longitude to show the service on the map.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Latitude */}
              <div>

                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Latitude
                </label>

                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="16.5449"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3
                  bg-white
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  focus:border-teal-500 transition"
                />

              </div>

              {/* Longitude */}
              <div>

                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Longitude
                </label>

                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="81.5212"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3
                  bg-white
                  focus:outline-none focus:ring-2 focus:ring-teal-500
                  focus:border-teal-500 transition"
                />

              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3">

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:flex-1
                border border-slate-300
                text-slate-700
                py-3 rounded-xl
                font-semibold
                hover:bg-slate-50
                transition"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1
              bg-teal-600
              text-white
              py-3 rounded-xl
              font-semibold
              hover:bg-teal-700
              disabled:opacity-60
              disabled:cursor-not-allowed
              transition
              shadow-sm"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditService;