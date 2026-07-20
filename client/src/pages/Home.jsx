import { useEffect, useState } from "react";
import { getDistance } from "geolib";
import api from "../services/api";
import ServiceCard from "../components/ServiceCard";

function Home() {

  const [services, setServices] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {

      const response = await api.get("/services");
      setServices(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const searchServices = async () => {
    try {

      if (keyword.trim() === "") {
        fetchServices();
        return;
      }

      const response = await api.get(
        `/services/search?keyword=${keyword}`
      );

      setServices(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const getCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        alert("Location Found!");

      },

      (error) => {

        alert("Please allow location access.");
        console.log(error);

      }

    );

  };

  const filteredServices = services.filter((service) => {

    if (!distanceFilter || !userLocation)
      return true;

    if (!service.latitude || !service.longitude)
      return false;

    const distance = getDistance(

      {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude
      },

      {
        latitude: service.latitude,
        longitude: service.longitude
      }

    );

    return distance <= distanceFilter * 1000;

  });

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Student GigSphere
      </h1>

      <div className="flex flex-wrap gap-3 justify-center mb-8">

        <input
          type="text"
          placeholder="Search Service..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-3 rounded-lg w-80"
        />

        <button
          onClick={searchServices}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Search
        </button>

        <button
          onClick={getCurrentLocation}
          className="bg-green-600 text-white px-5 py-3 rounded-lg"
        >
          Nearby Jobs
        </button>

      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">

        <button
          onClick={() => setDistanceFilter(5)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          5 KM
        </button>

        <button
          onClick={() => setDistanceFilter(10)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          10 KM
        </button>

        <button
          onClick={() => setDistanceFilter(20)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          20 KM
        </button>

        <button
          onClick={() => setDistanceFilter(null)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          All Jobs
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {filteredServices.length === 0 ? (

          <h2 className="text-center col-span-3 text-xl font-semibold">
            No Services Found
          </h2>

        ) : (

          filteredServices.map((service) => (

            <ServiceCard
              key={service._id}
              service={service}
            />

          ))

        )}

      </div>

    </div>

  );

}

export default Home;