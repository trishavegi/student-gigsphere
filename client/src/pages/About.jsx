function About() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 text-white">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16 md:py-20 text-center">

          <p className="text-teal-400 font-semibold uppercase tracking-widest text-xs sm:text-sm">
            About GigSphere
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight">
            Built for students, powered by student skills.
          </h1>

          <p className="text-slate-300 max-w-3xl mx-auto mt-5 text-base sm:text-lg leading-relaxed">
            Student GigSphere is a hyperlocal platform that connects
            students who need affordable services with students who
            have useful skills to offer.
          </p>

        </div>

      </section>


      {/* Mission */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">

          <div>

            <p className="text-teal-600 font-semibold uppercase tracking-wider text-sm">
              Our Mission
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2 leading-tight">
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


          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition">
              <div className="text-3xl sm:text-4xl">🎓</div>

              <h3 className="font-bold text-slate-800 mt-3 text-sm sm:text-base">
                Student Focused
              </h3>
            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition">
              <div className="text-3xl sm:text-4xl">📍</div>

              <h3 className="font-bold text-slate-800 mt-3 text-sm sm:text-base">
                Hyperlocal
              </h3>
            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition">
              <div className="text-3xl sm:text-4xl">💰</div>

              <h3 className="font-bold text-slate-800 mt-3 text-sm sm:text-base">
                Affordable
              </h3>
            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition">
              <div className="text-3xl sm:text-4xl">🚀</div>

              <h3 className="font-bold text-slate-800 mt-3 text-sm sm:text-base">
                Opportunities
              </h3>
            </div>

          </div>

        </div>

      </section>


      {/* What GigSphere Does */}
      <section className="bg-white border-y border-slate-200">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">

          <div className="text-center mb-8 sm:mb-10">

            <p className="text-teal-600 font-semibold uppercase tracking-wider text-sm">
              How It Works
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">
              What GigSphere Provides
            </h2>

            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
              A simple platform for discovering services, offering skills,
              and connecting with other students.
            </p>

          </div>


          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">

            {/* Card 1 */}
            <div className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-slate-50 hover:bg-white hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl">
                🔎
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-4">
                Discover Services
              </h3>

              <p className="text-slate-500 mt-2 leading-relaxed text-sm sm:text-base">
                Students can search for useful services based on
                their needs and location.
              </p>

            </div>


            {/* Card 2 */}
            <div className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-slate-50 hover:bg-white hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl">
                🛠️
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-4">
                Offer Your Skills
              </h3>

              <p className="text-slate-500 mt-2 leading-relaxed text-sm sm:text-base">
                Skilled students can create service listings and
                showcase what they can offer.
              </p>

            </div>


            {/* Card 3 */}
            <div className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-slate-50 hover:bg-white hover:shadow-lg transition">

              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl">
                🤝
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-4">
                Connect
              </h3>

              <p className="text-slate-500 mt-2 leading-relaxed text-sm sm:text-base">
                Students can connect with providers and request
                services through the platform.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-center px-4 py-7 sm:py-8">

        <p className="text-sm sm:text-base">
          © 2026 Student GigSphere
        </p>

        <p className="mt-2 text-xs sm:text-sm">
          Connecting students with skills and opportunities.
        </p>

      </footer>

    </div>
  );
}

export default About;