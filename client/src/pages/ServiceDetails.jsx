import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ServiceMap from "../components/ServiceMap";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [reason, setReason] = useState("");

  const providerId = service?.user?._id || service?.user;

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await api.get(`/services/${id}`);

      console.log("SERVICE DATA:", response.data);
      console.log("PROVIDER DATA:", response.data.user);

      setService(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-slate-600 font-medium">
            Loading service...
          </h2>
        </div>
      </div>
    );
  }

  const openDirections = () => {
    if (!service.latitude || !service.longitude) {
      alert("Location not available");
      return;
    }

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${service.latitude},${service.longitude}`,
      "_blank"
    );
  };

  const submitComplaint = async () => {
    if (!reason.trim()) {
      alert("Please write your complaint.");
      return;
    }

    try {
      await api.post("/complaints", {
        serviceId: service._id,
        reason: reason,
      });

      alert("Complaint Submitted Successfully");
      setReason("");
    } catch (error) {
      console.log(error);
      alert("Unable to submit complaint");
    }
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to book a service.");
      return;
    }

    try {
      await api.post(
        "/bookings",
        {
          serviceId: service._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Request Sent Successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-3 sm:px-5 py-6 sm:py-10">

      <div className="max-w-4xl mx-auto">

        {/* MAIN CARD */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-900 px-5 sm:px-8 py-7 sm:py-9">

            <p className="text-teal-300 text-sm font-semibold uppercase tracking-wider mb-2">
              Service Details
            </p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white break-words">
              {service.title}
            </h1>

            <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
              {service.description}
            </p>

          </div>


          {/* CONTENT */}
          <div className="p-5 sm:p-8">

            {/* SERVICE INFORMATION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

              {/* CATEGORY */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase font-semibold">
                  Category
                </p>

                <p className="font-semibold text-slate-800 mt-1 break-words">
                  {service.category || "Not specified"}
                </p>
              </div>


              {/* PRICE */}
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
                <p className="text-xs text-teal-700 uppercase font-semibold">
                  Price
                </p>

                <p className="text-2xl font-bold text-teal-700 mt-1">
                  ₹{service.price}
                </p>
              </div>


              {/* LOCATION */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:col-span-2">
                <p className="text-xs text-slate-500 uppercase font-semibold">
                  Location
                </p>

                <p className="font-semibold text-slate-800 mt-1 break-words">
                  📍 {service.location || "Location not available"}
                </p>
              </div>


              {/* SKILLS */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase font-semibold">
                  Skills
                </p>

                <p className="font-semibold text-slate-800 mt-1 break-words">
                  {service.skills || "Not specified"}
                </p>
              </div>


              {/* DURATION */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase font-semibold">
                  Duration
                </p>

                <p className="font-semibold text-slate-800 mt-1 break-words">
                  {service.duration || "Not specified"}
                </p>
              </div>

            </div>


            {/* PROVIDER */}
            <div className="border border-slate-200 rounded-xl p-4 sm:p-5 mb-8">

              <p className="text-xs text-slate-500 uppercase font-semibold">
                Service Provider
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-3">

                <div className="flex items-center gap-3 min-w-0">

                  <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                    {service.user?.name
                      ?.charAt(0)
                      .toUpperCase() || "P"}
                  </div>

                  <div className="min-w-0">

                    <p className="font-bold text-slate-800 break-words">
                      {service.user?.name || "Unknown Provider"}
                    </p>

                    <p className="text-sm text-slate-500">
                      Student Provider
                    </p>

                  </div>

                </div>


                {providerId && (
                  <button
                    onClick={() =>
                      navigate(`/chat/${providerId}`)
                    }
                    className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-semibold transition"
                  >
                    💬 Chat
                  </button>
                )}

              </div>

            </div>


            {/* MAP */}
            <div className="mb-8">

              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4">
                📍 Service Location
              </h2>

              {service.latitude && service.longitude ? (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <ServiceMap
                    latitude={service.latitude}
                    longitude={service.longitude}
                    title={service.title}
                  />
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                  <p className="text-slate-500">
                    Map not available for this service.
                  </p>
                </div>
              )}

              <button
                onClick={openDirections}
                className="w-full sm:w-auto mt-4 bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                🧭 Get Directions
              </button>

            </div>


            {/* BOOK SERVICE */}
            <div className="border-t border-slate-200 pt-6">

              <button
                onClick={handleBooking}
                className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white py-3.5 rounded-xl font-bold text-base sm:text-lg transition shadow-sm"
              >
                📅 Book This Service
              </button>

              <p className="text-center text-xs text-slate-500 mt-3">
                Send a booking request to the provider.
              </p>

            </div>


            {/* REPORT */}
            <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-5">

              <h2 className="text-lg font-bold text-slate-800">
                Report this Service
              </h2>

              <p className="text-sm text-slate-500 mt-1 mb-4">
                Tell us if you find this service inappropriate or suspicious.
              </p>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Write your complaint..."
                rows="4"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-white"
              />

              <button
                onClick={submitComplaint}
                className="w-full sm:w-auto mt-3 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                🚩 Report Service
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ServiceDetails;