import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

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

  const deleteService = async (id) => {
    try {
      await api.delete(`/admin/services/${id}`);

      alert("Service Deleted Successfully");
      fetchServices();
    } catch (error) {
      console.log(error);
      alert("Unable to delete service");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/services/${id}`, {
        status,
      });

      alert("Status Updated Successfully");
      fetchServices();
    } catch (error) {
      console.log(error);
      alert("Unable to update status");
    }
  };

  const filteredServices = services.filter((service) =>
    service.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main
        className="
          ml-0
          lg:ml-64
          px-4
          sm:px-6
          lg:px-8
          pt-24
          lg:pt-8
          pb-8
        "
      >

        {/* ================= HEADER ================= */}
        <div className="mb-7">

          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            Admin Panel
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
            Manage Services
          </h1>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Review, approve, reject and remove student services.
          </p>

        </div>


        {/* ================= SEARCH ================= */}
        <div
          className="
            bg-white
            border border-slate-200
            rounded-2xl
            shadow-sm
            p-4
            sm:p-5
            mb-6
          "
        >

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Search Services
          </label>

          <input
            type="text"
            placeholder="Search by service title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              border border-slate-300
              rounded-xl
              px-4
              py-3
              text-sm
              sm:text-base
              text-slate-800
              placeholder:text-slate-400
              outline-none
              focus:ring-2
              focus:ring-teal-500
              focus:border-teal-500
              transition
            "
          />

        </div>


        {/* ================= COUNT ================= */}
        <div className="mb-5 text-sm text-slate-500">

          Showing{" "}

          <span className="font-bold text-slate-800">
            {filteredServices.length}
          </span>{" "}

          service{filteredServices.length !== 1 ? "s" : ""}

        </div>


        {/* ================================================= */}
        {/* MOBILE CARDS */}
        {/* ================================================= */}

        <div className="space-y-4 lg:hidden">

          {filteredServices.length === 0 ? (

            <div
              className="
                bg-white
                border border-slate-200
                rounded-2xl
                p-8
                text-center
                shadow-sm
              "
            >

              <div className="text-4xl mb-3">
                🛠️
              </div>

              <h3 className="font-semibold text-slate-800">
                No services found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Try a different search.
              </p>

            </div>

          ) : (

            filteredServices.map((service) => (

              <div
                key={service._id}
                className="
                  bg-white
                  border border-slate-200
                  rounded-2xl
                  shadow-sm
                  p-5
                "
              >

                {/* TITLE + STATUS */}
                <div className="flex items-start justify-between gap-4">

                  {/* TITLE */}
                  <div className="min-w-0">

                    <h2
                      className="
                        text-lg
                        sm:text-xl
                        font-bold
                        text-slate-900
                        break-words
                        leading-snug
                      "
                    >
                      {service.title}
                    </h2>

                    {/* CATEGORY */}
                    <span
                      className="
                        inline-block
                        mt-2
                        bg-teal-50
                        text-teal-700
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                      "
                    >
                      {service.category || "Service"}
                    </span>

                  </div>


                  {/* STATUS */}
                  <span
                    className={`
                      shrink-0
                      whitespace-nowrap
                      px-3
                      py-1.5
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        service.status === "Approved"
                          ? "bg-green-50 text-green-700"
                          : service.status === "Rejected"
                          ? "bg-red-50 text-red-700"
                          : "bg-yellow-50 text-yellow-700"
                      }
                    `}
                  >
                    {service.status || "Pending"}
                  </span>

                </div>


                {/* PRICE */}
                <div className="mt-5">

                  <p className="text-xs text-slate-500">
                    Price
                  </p>

                  <p className="text-2xl font-bold text-teal-600 mt-0.5">
                    ₹{service.price}
                  </p>

                </div>


                {/* ACTION BUTTONS */}
                <div
                  className="
                    grid
                    grid-cols-3
                    gap-2
                    sm:gap-3
                    mt-5
                  "
                >

                  {/* APPROVE */}
                  <button
                    onClick={() =>
                      updateStatus(service._id, "Approved")
                    }
                    className="
                      w-full
                      bg-teal-600
                      hover:bg-teal-700
                      active:scale-95
                      text-white
                      py-2.5
                      rounded-xl
                      text-xs
                      sm:text-sm
                      font-semibold
                      transition
                    "
                  >
                    Approve
                  </button>


                  {/* REJECT */}
                  <button
                    onClick={() =>
                      updateStatus(service._id, "Rejected")
                    }
                    className="
                      w-full
                      bg-slate-700
                      hover:bg-slate-800
                      active:scale-95
                      text-white
                      py-2.5
                      rounded-xl
                      text-xs
                      sm:text-sm
                      font-semibold
                      transition
                    "
                  >
                    Reject
                  </button>


                  {/* DELETE */}
                  <button
                    onClick={() =>
                      deleteService(service._id)
                    }
                    className="
                      w-full
                      bg-red-600
                      hover:bg-red-700
                      active:scale-95
                      text-white
                      py-2.5
                      rounded-xl
                      text-xs
                      sm:text-sm
                      font-semibold
                      transition
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>


        {/* ================================================= */}
        {/* DESKTOP TABLE */}
        {/* ================================================= */}

        <div className="hidden lg:block">

          <div
            className="
              bg-white
              border border-slate-200
              rounded-2xl
              shadow-sm
              overflow-hidden
            "
          >

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-900 text-white">

                  <tr>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Title
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Status
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-semibold">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredServices.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-12 text-slate-500"
                      >
                        No services found.
                      </td>

                    </tr>

                  ) : (

                    filteredServices.map((service) => (

                      <tr
                        key={service._id}
                        className="
                          border-b
                          border-slate-100
                          hover:bg-slate-50
                          transition
                        "
                      >

                        {/* TITLE */}
                        <td className="px-5 py-4 font-semibold text-slate-800">
                          {service.title}
                        </td>


                        {/* CATEGORY */}
                        <td className="px-5 py-4">

                          <span
                            className="
                              bg-teal-50
                              text-teal-700
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                            "
                          >
                            {service.category || "Service"}
                          </span>

                        </td>


                        {/* PRICE */}
                        <td className="px-5 py-4 font-bold text-teal-600">
                          ₹{service.price}
                        </td>


                        {/* STATUS */}
                        <td className="px-5 py-4">

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                              ${
                                service.status === "Approved"
                                  ? "bg-green-50 text-green-700"
                                  : service.status === "Rejected"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-yellow-50 text-yellow-700"
                              }
                            `}
                          >
                            {service.status || "Pending"}
                          </span>

                        </td>


                        {/* ACTIONS */}
                        <td className="px-5 py-4">

                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                updateStatus(
                                  service._id,
                                  "Approved"
                                )
                              }
                              className="
                                bg-teal-600
                                hover:bg-teal-700
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                text-sm
                                font-semibold
                                transition
                              "
                            >
                              Approve
                            </button>


                            <button
                              onClick={() =>
                                updateStatus(
                                  service._id,
                                  "Rejected"
                                )
                              }
                              className="
                                bg-slate-700
                                hover:bg-slate-800
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                text-sm
                                font-semibold
                                transition
                              "
                            >
                              Reject
                            </button>


                            <button
                              onClick={() =>
                                deleteService(service._id)
                              }
                              className="
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                text-sm
                                font-semibold
                                transition
                              "
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Services;