function Contact() {

  return (

    <div className="min-h-screen bg-slate-50">

      <section className="bg-slate-900 text-white">

        <div className="max-w-4xl mx-auto px-6 py-14 text-center">

          <p className="text-teal-400 font-semibold uppercase">
            Get in Touch
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Contact GigSphere
          </h1>

          <p className="text-slate-300 mt-4">
            Have a question or need help? We'd love to hear from you.
          </p>

        </div>

      </section>


      <div className="max-w-4xl mx-auto px-6 py-14">

        <div className="bg-white border rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-bold text-slate-800">
            Contact & Support
          </h2>

          <p className="text-slate-600 mt-3">
            For questions, feedback or support regarding Student
            GigSphere, please contact us.
          </p>

          <div className="mt-8 space-y-5">

            <div>
              <p className="font-semibold text-slate-700">
                📧 Support Email
              </p>

              <p className="text-teal-600 mt-1">
                support@gigsphere.com
              </p>
            </div>

            <div>
              <p className="font-semibold text-slate-700">
                🎓 Platform
              </p>

              <p className="text-slate-600 mt-1">
                Student GigSphere
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Contact;