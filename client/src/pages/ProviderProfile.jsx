import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ProviderProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);

  useEffect(() => {
    fetchProvider();
  }, []);

  const fetchProvider = async () => {
    try {
      const response = await api.get(`/users/provider/${id}`);
      setProvider(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!provider) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-600">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 py-6 sm:py-10">

      <div className="max-w-5xl mx-auto">

        {/* PROFILE CARD */}
        <div className="bg-white border border-slate-200 shadow-lg rounded-2xl p-5 sm:p-8">

          {/* PROFILE HEADER */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">

            {/* Profile Image */}
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                provider.name
              )}&background=0f766e&color=fff`}
              alt="profile"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-teal-500 flex-shrink-0"
            />

            {/* Profile Information */}
            <div className="min-w-0">

              <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 break-words">
                👤 {provider.name}
              </h1>

              <p className="text-slate-600 mt-2 text-sm sm:text-base break-all">
                📧 {provider.email}
              </p>

              <p className="text-slate-600 mt-1 text-sm sm:text-base">
                📍 {provider.location || "Location not available"}
              </p>

              <p className="text-yellow-500 text-lg sm:text-xl mt-2">
                ⭐⭐⭐⭐⭐
              </p>

            </div>

          </div>

          <hr className="my-6 sm:my-8" />

          {/* SERVICES */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-5">
            Services Offered
          </h2>

          {provider.services?.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <p className="text-slate-500">
                No services available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

              {provider.services?.map((service) => (

                <div
                  key={service._id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition"
                >

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 break-words">
                    {service.title}
                  </h3>

                  <p className="text-lg sm:text-xl font-bold text-teal-600 mt-2">
                    ₹{service.price}
                  </p>

                  <p className="text-slate-500 text-sm sm:text-base mt-2 leading-relaxed">
                    {service.description}
                  </p>

                </div>

              ))}

            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-8 sm:mt-10">

            <button
              onClick={() => navigate(`/chat/${provider._id}`)}
              className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 active:scale-[0.98] transition"
            >
              💬 Chat
            </button>

            <button
              className="w-full sm:w-auto bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 active:scale-[0.98] transition"
            >
              Hire Again
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProviderProfile;