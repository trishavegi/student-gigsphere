function About() {

  return (

    <div className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="bg-slate-900 text-white">

        <div className="max-w-6xl mx-auto px-6 py-16 text-center">

          <p className="text-teal-400 font-semibold uppercase tracking-wider">
            About GigSphere
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Built for students, powered by student skills.
          </h1>

          <p className="text-slate-300 max-w-3xl mx-auto mt-5 text-lg">
            Student GigSphere is a hyperlocal platform that connects
            students who need affordable services with students who
            have useful skills to offer.
          </p>

        </div>

      </section>


      {/* Mission */}

      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>

            <p className="text-teal-600 font-semibold uppercase">
              Our Mission
            </p>

            <h2 className="text-3xl font-bold text-slate-800 mt-2">
              Creating opportunities within the student community
            </h2>

            <p className="text-slate-600 mt-5 leading-relaxed">
              Many students have useful skills such as tutoring,
              coding, designing, photography and video editing.
              However, finding nearby opportunities to use these
              skills can be difficult.
            </p>

            <p className="text-slate-600 mt-4 leading-relaxed">
              GigSphere aims to make this easier by providing a
              platform where students can discover services nearby
              and skilled students can offer their services and earn.
            </p>

          </div>


          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border rounded-2xl p-6 shadow-sm text-center">
              <div className="text-4xl">🎓</div>
              <h3 className="font-bold mt-3">
                Student Focused
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm text-center">
              <div className="text-4xl">📍</div>
              <h3 className="font-bold mt-3">
                Hyperlocal
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm text-center">
              <div className="text-4xl">💰</div>
              <h3 className="font-bold mt-3">
                Affordable
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-6 shadow-sm text-center">
              <div className="text-4xl">🚀</div>
              <h3 className="font-bold mt-3">
                Opportunities
              </h3>
            </div>

          </div>

        </div>

      </section>


      {/* What GigSphere Does */}

      <section className="bg-white border-y">

        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="text-center mb-10">

            <h2 className="text-3xl font-bold text-slate-800">
              What GigSphere Provides
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="border rounded-2xl p-6">

              <div className="text-3xl">
                🔎
              </div>

              <h3 className="text-xl font-bold mt-4">
                Discover Services
              </h3>

              <p className="text-slate-500 mt-2">
                Students can search for useful services based on
                their needs and location.
              </p>

            </div>


            <div className="border rounded-2xl p-6">

              <div className="text-3xl">
                🛠️
              </div>

              <h3 className="text-xl font-bold mt-4">
                Offer Your Skills
              </h3>

              <p className="text-slate-500 mt-2">
                Skilled students can create service listings and
                showcase what they can offer.
              </p>

            </div>


            <div className="border rounded-2xl p-6">

              <div className="text-3xl">
                🤝
              </div>

              <h3 className="text-xl font-bold mt-4">
                Connect
              </h3>

              <p className="text-slate-500 mt-2">
                Students can connect with providers and request
                services through the platform.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Footer */}

      <footer className="bg-slate-950 text-slate-400 text-center py-8">

        <p>
          © 2026 Student GigSphere
        </p>

        <p className="mt-2">
          Connecting students with skills and opportunities.
        </p>

      </footer>

    </div>

  );

}

export default About;