import { useEffect, useState } from "react";
import api from "../services/api";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";

function Home() {

  const [keyword, setKeyword] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(null);
  const [realServices, setRealServices] = useState([]);

  // Fetch real services from backend
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

  // Demo services
  const dummyServices = [
    {
      _id: "demo1",
      title: "Math Tutoring",
      description:
        "Get simple and friendly Mathematics tutoring from a student.",
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
      description:
        "Professional and creative logo designs for student projects.",
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
      description:
        "Get help with Python programming and college assignments.",
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
      description:
        "Well-organized notes for college subjects and exam preparation.",
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
      description:
        "Affordable photography for college events and projects.",
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
      description:
        "Build simple and attractive websites using modern technologies.",
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
      description:
        "Practice English conversation and improve your communication skills.",
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
      description:
        "Editing services for college projects and social media videos.",
      price: 700,
      category: "Editing",
      distance: 22,
      user: {
        _id: "user8",
        name: "Meena"
      }
    }
  ];

  // Combine real + demo services
  const allServices =
  realServices.length > 0
    ? realServices
    : dummyServices.map((service) => ({
        ...service,
        isDemo: true
      }));

  // Search and distance filtering
  const filteredServices = allServices.filter((service) => {

    const searchText = keyword.toLowerCase();

    const matchesSearch =
      service.title?.toLowerCase().includes(searchText) ||
      service.description?.toLowerCase().includes(searchText) ||
      service.category?.toLowerCase().includes(searchText);

    const matchesDistance =
      distanceFilter === null ||
      service.distance === undefined ||
      service.distance <= distanceFilter;

    return matchesSearch && matchesDistance;

  });

  return (

    <div className="min-h-screen bg-slate-50">

      {/* ================= HERO SECTION ================= */}

<section className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

<p className="uppercase tracking-widest text-teal-300 font-semibold mb-4">            Student Gig Marketplace
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to Student GigSphere
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Find trusted student services near you, connect with talented
            students, and earn by sharing your skills.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <a
              href="#services"
              className="bg-teal-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-teal-600 transition shadow-lg"
            >
              Explore Services
            </a>

            <a
              href="#how-it-works"
              className="bg-teal-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-teal-600 transition shadow-lg"
            >
              How It Works
            </a>

          </div>

        </div>

      </section>


      {/* ================= TRUST FEATURES ================= */}

      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border">
            <div className="text-4xl mb-3">🎓</div>

            <h3 className="text-xl font-bold text-slate-800">
              Student Friendly
            </h3>

            <p className="text-slate-500 mt-2">
              Services designed around student needs and budgets.
            </p>
          </div>


          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border">
            <div className="text-4xl mb-3">📍</div>

            <h3 className="text-xl font-bold text-slate-800">
              Hyperlocal
            </h3>

            <p className="text-slate-500 mt-2">
              Discover useful services available around your location.
            </p>
          </div>


          <div className="bg-white rounded-2xl shadow-sm p-6 text-center border">
            <div className="text-4xl mb-3">💡</div>

            <h3 className="text-xl font-bold text-slate-800">
              Share Your Skills
            </h3>

            <p className="text-slate-500 mt-2">
              Turn your skills into opportunities and earn as a student.
            </p>
          </div>

        </div>

      </section>


      {/* ================= SERVICES ================= */}

      <section
        id="services"
        className="max-w-7xl mx-auto px-6 py-12"
      >

        <div className="text-center mb-10">

          <p className="text-blue-600 font-semibold uppercase tracking-wide">
            Explore
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-2">
            Find Student Services
          </h2>

          <p className="text-slate-500 mt-3">
            Search for tutoring, coding, design, editing and more.
          </p>

        </div>


        {/* SEARCH */}

        <div className="max-w-3xl mx-auto mb-6">

          <input
            type="text"
            placeholder="🔍 Search tutoring, coding, design..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border border-slate-300 bg-white p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

        </div>


        {/* DISTANCE FILTER */}

        <div className="flex flex-wrap justify-center gap-3 mb-8">

          <button
            onClick={() => setDistanceFilter(5)}
            className={`px-5 py-2 rounded-xl font-medium transition ${
              distanceFilter === 5
                ? "bg-teal-600 text-white"
                : "bg-white border text-slate-700 hover:bg-teal-50"
            }`}
          >
            Within 5 KM
          </button>


          <button
            onClick={() => setDistanceFilter(10)}
            className={`px-5 py-2 rounded-xl font-medium transition ${
              distanceFilter === 10
                ? "bg-blue-700 text-white"
                : "bg-white border text-slate-700 hover:bg-blue-50"
            }`}
          >
            Within 10 KM
          </button>


          <button
            onClick={() => setDistanceFilter(20)}
            className={`px-5 py-2 rounded-xl font-medium transition ${
              distanceFilter === 20
                ? "bg-blue-700 text-white"
                : "bg-white border text-slate-700 hover:bg-blue-50"
            }`}
          >
            Within 20 KM
          </button>


          <button
            onClick={() => setDistanceFilter(null)}
            className={`px-5 py-2 rounded-xl font-medium transition ${
              distanceFilter === null
                ? "bg-slate-700 text-white"
                : "bg-white border text-slate-700 hover:bg-slate-100"
            }`}
          >
            All Services
          </button>

        </div>


        {/* RESULT COUNT */}

        <p className="text-center text-slate-500 mb-8">

          Showing{" "}
          <span className="font-bold text-blue-700">
            {filteredServices.length}
          </span>{" "}
          services

        </p>


        {/* SERVICE CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {filteredServices.length === 0 ? (

            <div className="col-span-full text-center bg-white rounded-2xl p-12 shadow-sm">

              <div className="text-5xl mb-4">
                🔎
              </div>

              <h2 className="text-2xl font-bold text-slate-700">
                No services found
              </h2>

              <p className="text-slate-500 mt-2">
                Try another keyword or select a larger distance.
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

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        id="how-it-works"
        className="bg-white border-y"
      >

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="text-center mb-12">

            <p className="text-blue-600 font-semibold uppercase">
              Simple Process
            </p>

            <h2 className="text-4xl font-bold text-slate-800 mt-2">
              How It Works
            </h2>

            <p className="text-slate-500 mt-3">
              Getting started with GigSphere is simple.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center">

              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>

              <h3 className="text-xl font-bold mt-5">
                Find a Service
              </h3>

              <p className="text-slate-500 mt-2">
                Search for a service based on your needs, category and
                distance.
              </p>

            </div>


            <div className="text-center">

              <div className="w-16 h-16 mx-auto bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>

              <h3 className="text-xl font-bold mt-5">
                Connect
              </h3>

              <p className="text-slate-500 mt-2">
                View the provider's service and send a booking request.
              </p>

            </div>


            <div className="text-center">

              <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>

              <h3 className="text-xl font-bold mt-5">
                Get Your Work Done
              </h3>

              <p className="text-slate-500 mt-2">
                Connect with the student provider and complete your task.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section className="bg-slate-900 text-white">

        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>

              <p className="text-blue-400 font-semibold uppercase tracking-wide">
                About GigSphere
              </p>

              <h2 className="text-4xl font-bold mt-3 mb-5">
                Built for students, by students.
              </h2>

              <p className="text-slate-300 leading-relaxed">
                Student GigSphere is a hyperlocal marketplace that helps
                students discover affordable services and gives skilled
                students an opportunity to earn.
              </p>

              <p className="text-slate-300 leading-relaxed mt-4">
                Whether you need tutoring, coding assistance, design,
                photography or editing, GigSphere brings useful student
                services closer to you.
              </p>

            </div>


            <div className="grid grid-cols-2 gap-4">

              <div className="bg-slate-800 rounded-2xl p-6">
                <div className="text-3xl">🎓</div>
                <h3 className="font-bold mt-3">
                  Student Community
                </h3>
              </div>


              <div className="bg-slate-800 rounded-2xl p-6">
                <div className="text-3xl">💰</div>
                <h3 className="font-bold mt-3">
                  Affordable
                </h3>
              </div>


              <div className="bg-slate-800 rounded-2xl p-6">
                <div className="text-3xl">📍</div>
                <h3 className="font-bold mt-3">
                  Local Services
                </h3>
              </div>


              <div className="bg-slate-800 rounded-2xl p-6">
                <div className="text-3xl">🚀</div>
                <h3 className="font-bold mt-3">
                  Student Opportunities
                </h3>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="bg-slate-950 text-slate-400 text-center py-6">

        <p>
          © 2026 Student GigSphere. Connecting students with opportunities.
        </p>

      </footer>

    </div>

  );

}

export default Home;