import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProviderProfile() {

  const { id } = useParams();

  const [provider, setProvider] = useState(null);

  useEffect(() => {

    fetchProvider();

  }, []);

  const fetchProvider = async () => {

    try {

      const response = await api.get(
        `/users/provider/${id}`
      );

      setProvider(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!provider) {

    return (
      <h2 className="text-center mt-10">
        Loading...
      </h2>
    );

  }

  return (

<div className="max-w-5xl mx-auto mt-10 p-8">

  <div className="bg-white shadow-xl rounded-2xl p-8">

    <div className="flex items-center gap-6">

      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name)}&background=0f766e&color=fff`}
        alt="profile"
        className="w-28 h-28 rounded-full border-4 border-teal-500"
      />

      <div>

        <h1 className="text-4xl font-bold">
          👤 {provider.name}
        </h1>

        <p className="text-gray-600 mt-2">
          📧 {provider.email}
        </p>

        <p className="text-gray-600">
          📍 {provider.location || "Location not available"}
        </p>

        <p className="text-yellow-500 text-xl mt-2">
          ⭐⭐⭐⭐⭐
        </p>

      </div>

    </div>

    <hr className="my-8"/>

    <h2 className="text-2xl font-bold mb-5">
      Services Offered
    </h2>

    <div className="grid md:grid-cols-2 gap-5">

      {
        provider.services.map((service)=>(

        <div
          key={service._id}
          className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition"
        >

          <h3 className="text-xl font-bold">
            {service.title}
          </h3>

          <p className="text-xl font-bold text-teal-600 mt-2">
            ₹ {service.price}
          </p>

          <p className="text-gray-500 mt-2">
            {service.description}
          </p>

        </div>

        ))
      }

    </div>

    <div className="flex gap-5 mt-10">

      <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition">
        💬 Chat
      </button>

      <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition">
        Hire Again
      </button>

    </div>

  </div>

</div>

);
}

export default ProviderProfile;