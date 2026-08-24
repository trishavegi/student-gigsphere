import { useEffect, useState } from "react";
import { getDistance } from "geolib";
import api from "../services/api";
import ServiceCard from "../components/ServiceCard";
const demoServices = [
  {
    _id: "demo1",
    title: "Math Tutoring",
    description:
      "Personalized mathematics tutoring for school and college students.",
    price: 300,
    category: "Tutoring",
    user: {
      _id: "demo-user-1",
      name: "Rahul"
    },
    isDemo: true
  },
  {
    _id: "demo2",
    title: "Logo Design",
    description:
      "Creative and professional logo designs for students and small businesses.",
    price: 500,
    category: "Design",
    user: {
      _id: "demo-user-2",
      name: "Sneha"
    },
    isDemo: true
  },
  {
    _id: "demo3",
    title: "Python Programming Help",
    description:
      "Get help with Python assignments, coding problems and projects.",
    price: 400,
    category: "Coding",
    user: {
      _id: "demo-user-3",
      name: "Arjun"
    },
    isDemo: true
  },
  {
    _id: "demo4",
    title: "College Event Photography",
    description:
      "Affordable photography services for college events and functions.",
    price: 800,
    category: "Photography",
    user: {
      _id: "demo-user-4",
      name: "Priya"
    },
    isDemo: true
  },
  {
    _id: "demo5",
    title: "Assignment Typing",
    description:
      "Fast and neat typing services for college assignments and documents.",
    price: 200,
    category: "Academic",
    user: {
      _id: "demo-user-5",
      name: "Kiran"
    },
    isDemo: true
  },
  {
    _id: "demo6",
    title: "Video Editing",
    description:
      "Professional video editing for college projects and social media.",
    price: 600,
    category: "Editing",
    user: {
      _id: "demo-user-6",
      name: "Anjali"
    },
    isDemo: true
  }
];
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
      if (response.data.length === 0) {
  setServices(demoServices);
} else {
  setServices(response.data);
}

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
      {/* HOW IT WORKS */}

<section className="mt-16">

  <div className="text-center mb-10">

    <h2 className="text-3xl font-bold text-gray-800">
      How Student GigSphere Works
    </h2>

    <p className="text-gray-500 mt-3">
      Find the right student service in just a few simple steps.
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-8">

    {/* STEP 1 */}

    <div className="bg-white rounded-2xl shadow-md p-8 text-center">

      <div className="text-4xl mb-4">
        📝
      </div>

      <div className="text-blue-600 font-bold text-lg mb-2">
        Step 1
      </div>

      <h3 className="text-xl font-bold mb-3">
        Post or Find a Gig
      </h3>

      <p className="text-gray-600">
        Post your task or search for services offered by students
        around you.
      </p>

    </div>


    {/* STEP 2 */}

    <div className="bg-white rounded-2xl shadow-md p-8 text-center">

      <div className="text-4xl mb-4">
        💬
      </div>

      <div className="text-blue-600 font-bold text-lg mb-2">
        Step 2
      </div>

      <h3 className="text-xl font-bold mb-3">
        Get Offers & Connect
      </h3>

      <p className="text-gray-600">
        Connect with suitable students, compare offers and
        discuss the work through chat.
      </p>

    </div>


    {/* STEP 3 */}

    <div className="bg-white rounded-2xl shadow-md p-8 text-center">

      <div className="text-4xl mb-4">
        ✅
      </div>

      <div className="text-blue-600 font-bold text-lg mb-2">
        Step 3
      </div>

      <h3 className="text-xl font-bold mb-3">
        Choose & Complete
      </h3>

      <p className="text-gray-600">
        Choose the right provider, complete your task and
        leave a review.
      </p>

    </div>

  </div>

</section>

    </div>

  );

}

export default Home;