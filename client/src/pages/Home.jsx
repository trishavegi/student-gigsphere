import { useEffect,useState } from "react";
import api from "../services/api";
import ServiceCard from "../components/ServiceCard";

function Home() {

  const [keyword, setKeyword] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(null);
  const [realServices, setRealServices] = useState([]);
  useEffect(() => {
  fetchRealServices();
}, []);

const fetchRealServices = async () => {

  try {

    const response = await api.get("/services");

    console.log("REAL SERVICES:", response.data);

    setRealServices(response.data);

  } catch (error) {

    console.log("Failed to load real services:", error);

  }

};

  // Dummy services for demonstration
  const dummyServices = [
    {
      _id: "demo1",
      title: "Math Tutoring",
      description: "I can help school and college students with Mathematics.",
      price: 300,
      category: "Tutoring",
      distance: 2,
      user: {
        _id: "user1",
        name: "Rahul"
      }
    },

    {
      _id: "demo2",
      title: "Logo Design",
      description: "I will create a simple and professional logo for your project.",
      price: 500,
      category: "Design",
      distance: 4,
      user: {
        _id: "user2",
        name: "Anjali"
      }
    },

    {
      _id: "demo3",
      title: "Python Programming Help",
      description: "Get help with Python programming and college assignments.",
      price: 400,
      category: "Coding",
      distance: 7,
      user: {
        _id: "user3",
        name: "Kiran"
      }
    },

    {
      _id: "demo4",
      title: "Notes Preparation",
      description: "Well-organized notes for college subjects and exams.",
      price: 200,
      category: "Notes",
      distance: 9,
      user: {
        _id: "user4",
        name: "Sneha"
      }
    },

    {
      _id: "demo5",
      title: "Photography Service",
      description: "Affordable photography for college events and projects.",
      price: 800,
      category: "Photography",
      distance: 12,
      user: {
        _id: "user5",
        name: "Arjun"
      }
    },

    {
      _id: "demo6",
      title: "Web Development",
      description: "I can help build simple websites using React.",
      price: 1000,
      category: "Coding",
      distance: 15,
      user: {
        _id: "user6",
        name: "Priya"
      }
    },

    {
      _id: "demo7",
      title: "English Speaking Practice",
      description: "Practice English conversation and improve your confidence.",
      price: 250,
      category: "Tutoring",
      distance: 18,
      user: {
        _id: "user7",
        name: "Vikram"
      }
    },

    {
      _id: "demo8",
      title: "Video Editing",
      description: "Editing services for college projects and social media videos.",
      price: 700,
      category: "Editing",
      distance: 22,
      user: {
        _id: "user8",
        name: "Meena"
      }
    }
  ];

  // Search + distance filtering
 const allServices = [
  ...realServices,
  ...dummyServices
];

const filteredServices = allServices.filter((service) => {
    // Search filter
    const searchText = keyword.toLowerCase();

    const matchesSearch =
      service.title.toLowerCase().includes(searchText) ||
      service.description.toLowerCase().includes(searchText) ||
      service.category.toLowerCase().includes(searchText);

    // Distance filter
    const matchesDistance =
      distanceFilter === null ||
      service.distance <= distanceFilter;

    return matchesSearch && matchesDistance;
  });

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-3">
        Student GigSphere
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Find trusted student services near you
      </p>

      {/* Search */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">

        <input
          type="text"
          placeholder="Search tutoring, coding, design..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-80"
        />

      </div>

      {/* Distance Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">

        <button
          onClick={() => setDistanceFilter(5)}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
        >
          Within 5 KM
        </button>

        <button
          onClick={() => setDistanceFilter(10)}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
        >
          Within 10 KM
        </button>

        <button
          onClick={() => setDistanceFilter(20)}
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600"
        >
          Within 20 KM
        </button>

        <button
          onClick={() => setDistanceFilter(null)}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
        >
          All Jobs
        </button>

      </div>

      {/* Result count */}
      <p className="text-center text-gray-600 mb-5">

        Showing{" "}
        <span className="font-bold">
          {filteredServices.length}
        </span>{" "}
        services

      </p>

      {/* Services */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredServices.length === 0 ? (

          <div className="col-span-full text-center">

            <h2 className="text-xl font-semibold text-gray-600">
              No services found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another keyword or increase the distance.
            </p>

          </div>

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