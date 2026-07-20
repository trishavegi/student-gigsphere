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
        src={"https://ui-avatars.com/api/?name=${provider.name}"}
        alt="profile"
        className="w-28 h-28 rounded-full border-4 border-blue-500"
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
          className="bg-gray-100 rounded-xl p-5 shadow hover:shadow-lg transition"
        >

          <h3 className="text-xl font-bold">
            {service.title}
          </h3>

          <p className="mt-2">
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

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        💬 Chat
      </button>

      <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
        Hire Again
      </button>

    </div>

  </div>

</div>

);
}

export default ProviderProfile;