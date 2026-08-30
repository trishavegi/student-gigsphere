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

    {/* ================= HERO ================= */}

    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">

        <p className="uppercase tracking-[0.2em] text-teal-300 font-semibold text-xs sm:text-sm mb-4">
          Student Gig Marketplace
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-5">
          Welcome to Student GigSphere
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Find trusted student services near you, connect with talented
          students, and earn by sharing your skills.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">

          <a
            href="#services"
            className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-teal-500/20"
          >
            Explore Services
          </a>

          <a
            href="#how-it-works"
            className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            How It Works
          </a>

        </div>

      </div>
    </section>


    {/* ================= TRUST FEATURES ================= */}

    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">

        {[
          {
            icon: "🎓",
            title: "Student Friendly",
            text: "Services designed around student needs and budgets."
          },
          {
            icon: "📍",
            title: "Hyperlocal",
            text: "Discover useful services available around your location."
          },
          {
            icon: "💡",
            title: "Share Your Skills",
            text: "Turn your skills into opportunities and earn as a student."
          }
        ].map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >

            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 flex items-center justify-center text-3xl mb-4">
              {item.icon}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-slate-800">
              {item.title}
            </h3>

            <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
              {item.text}
            </p>

          </div>

        ))}

      </div>

    </section>


    {/* ================= SERVICES ================= */}

    <section
      id="services"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16"
    >

      <div className="text-center mb-8 md:mb-10">

        <p className="text-teal-600 font-semibold uppercase tracking-wide text-sm">
          Explore
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-2">
          Find Student Services
        </h2>

        <p className="text-sm sm:text-base text-slate-500 mt-3 max-w-xl mx-auto">
          Search for tutoring, coding, design, editing and more.
        </p>

      </div>


      {/* SEARCH */}

      <div className="max-w-3xl mx-auto mb-5">

        <div className="relative">

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search tutoring, coding, design..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border border-slate-300 bg-white pl-11 pr-4 py-3.5 sm:py-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
          />

        </div>

      </div>


      {/* DISTANCE FILTER */}

      <div className="flex flex-wrap justify-center gap-2.5 mb-7">

        <button
          onClick={() => setDistanceFilter(5)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            distanceFilter === 5
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-white border border-slate-300 text-slate-700 hover:border-teal-400 hover:bg-teal-50"
          }`}
        >
          Within 5 KM
        </button>

        <button
          onClick={() => setDistanceFilter(10)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            distanceFilter === 10
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-white border border-slate-300 text-slate-700 hover:border-teal-400 hover:bg-teal-50"
          }`}
        >
          Within 10 KM
        </button>

        <button
          onClick={() => setDistanceFilter(20)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            distanceFilter === 20
              ? "bg-teal-600 text-white shadow-sm"
              : "bg-white border border-slate-300 text-slate-700 hover:border-teal-400 hover:bg-teal-50"
          }`}
        >
          Within 20 KM
        </button>

        <button
          onClick={() => setDistanceFilter(null)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            distanceFilter === null
              ? "bg-slate-800 text-white shadow-sm"
              : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
          }`}
        >
          All Services
        </button>

      </div>


      {/* RESULT COUNT */}

      <p className="text-center text-sm text-slate-500 mb-7">

        Showing{" "}

        <span className="font-bold text-teal-700">
          {filteredServices.length}
        </span>{" "}

        services

      </p>


      {/* SERVICE CARDS */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">

        {filteredServices.length === 0 ? (

          <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-sm">

            <div className="text-5xl mb-4">
              🔎
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-700">
              No services found
            </h2>

            <p className="text-sm sm:text-base text-slate-500 mt-2">
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
      className="bg-white border-y border-slate-200"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">

        <div className="text-center mb-10 md:mb-12">

          <p className="text-teal-600 font-semibold uppercase tracking-wide text-sm">
            Simple Process
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-2">
            How It Works
          </h2>

          <p className="text-slate-500 mt-3">
            Getting started with GigSphere is simple.
          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-10 md:gap-8">

          {[
            {
              number: "1",
              title: "Find a Service",
              text: "Search for a service based on your needs, category and distance."
            },
            {
              number: "2",
              title: "Connect",
              text: "View the provider's service and send a booking request."
            },
            {
              number: "3",
              title: "Get Your Work Done",
              text: "Connect with the student provider and complete your task."
            }
          ].map((item) => (

            <div
              key={item.number}
              className="text-center"
            >

              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-teal-50 text-teal-700 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold border border-teal-100">
                {item.number}
              </div>

              <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-5">
                {item.title}
              </h3>

              <p className="text-sm md:text-base text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>


    {/* ================= ABOUT ================= */}

    <section className="bg-slate-900 text-white">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">

        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">

          <div>

            <p className="text-teal-400 font-semibold uppercase tracking-wide text-sm">
              About GigSphere
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-5 leading-tight">
              Built for students, by students.
            </h2>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Student GigSphere is a hyperlocal marketplace that helps
              students discover affordable services and gives skilled
              students an opportunity to earn.
            </p>

            <p className="text-slate-300 leading-relaxed mt-4 text-sm sm:text-base">
              Whether you need tutoring, coding assistance, design,
              photography or editing, GigSphere brings useful student
              services closer to you.
            </p>

          </div>


          <div className="grid grid-cols-2 gap-3 sm:gap-4">

            {[
              ["🎓", "Student Community"],
              ["💰", "Affordable"],
              ["📍", "Local Services"],
              ["🚀", "Student Opportunities"]
            ].map(([icon, title]) => (

              <div
                key={title}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sm:p-6 hover:bg-slate-750 transition"
              >

                <div className="text-2xl sm:text-3xl">
                  {icon}
                </div>

                <h3 className="font-bold mt-3 text-sm sm:text-base">
                  {title}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>


    {/* ================= FOOTER ================= */}

    <footer className="bg-slate-950 text-slate-400 text-center px-4 py-6">

      <p className="text-xs sm:text-sm">
        © 2026 Student GigSphere. Connecting students with opportunities.
      </p>

    </footer>

  </div>
);

}

export default Home;