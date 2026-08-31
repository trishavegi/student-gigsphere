
import Sidebar from "../../components/Sidebar";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import api from "../../services/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchServices();
    fetchBookings();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get("/services");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await api.get("/admin/bookings");
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // USERS PDF
  // =========================

  const downloadUsersPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("GigSphere Users Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Name", "Email", "Role"]],
      body: users.map((user) => [
        user.name,
        user.email,
        user.role,
      ]),
    });

    doc.save("Users_Report.pdf");
  };

  // =========================
  // USERS EXCEL
  // =========================

  const downloadUsersExcel = () => {
    const excelData = users.map((user) => ({
      Name: user.name,
      Email: user.email,
      Role: user.role,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Users"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Users_Report.xlsx");
  };

  // =========================
  // SERVICES PDF
  // =========================

  const downloadServicesPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("GigSphere Services Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Title", "Category", "Price", "Provider"]],
      body: services.map((service) => [
        service.title,
        service.category,
        `Rs.${service.price}`,
        service.user?.name || "N/A",
      ]),
    });

    doc.save("Services_Report.pdf");
  };

  // =========================
  // SERVICES EXCEL
  // =========================

  const downloadServicesExcel = () => {
    const excelData = services.map((service) => ({
      Title: service.title,
      Category: service.category,
      Price: service.price,
      Provider: service.user?.name || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Services"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Services_Report.xlsx");
  };

  // =========================
  // BOOKINGS PDF
  // =========================

  const downloadBookingsPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("GigSphere Bookings Report", 14, 20);

    autoTable(doc, {
      startY: 30,

      head: [
        ["Customer", "Provider", "Service", "Status"],
      ],

      body: bookings.map((booking) => [
        booking.customer?.name || "N/A",
        booking.provider?.name || "N/A",
        booking.service?.title || "Deleted",
        booking.status,
      ]),
    });

    doc.save("Bookings_Report.pdf");
  };

  // =========================
  // BOOKINGS EXCEL
  // =========================

  const downloadBookingsExcel = () => {
    const excelData = bookings.map((booking) => ({
      Customer: booking.customer?.name || "N/A",
      Provider: booking.provider?.name || "N/A",
      Service: booking.service?.title || "Deleted",
      Status: booking.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Bookings"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Bookings_Report.xlsx");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <main className="flex-1 min-w-0 lg:ml-64 pt-16 lg:pt-0">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-900 text-white">

          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

            <div className="max-w-7xl mx-auto">

              <p className="text-teal-300 font-semibold text-sm uppercase tracking-wider">
                Admin Panel
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold mt-2">
                Reports
              </h1>

              <p className="text-slate-300 mt-2 text-sm sm:text-base">
                Download and manage GigSphere platform reports.
              </p>

            </div>

          </div>

        </div>


        {/* CONTENT */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

          {/* SUMMARY */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <p className="text-slate-500 text-sm">
                Total Users
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {users.length}
              </h2>

            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <p className="text-slate-500 text-sm">
                Total Services
              </p>

              <h2 className="text-3xl font-bold text-teal-600 mt-1">
                {services.length}
              </h2>

            </div>


            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

              <p className="text-slate-500 text-sm">
                Total Bookings
              </p>

              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {bookings.length}
              </h2>

            </div>

          </div>


          {/* REPORT CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">


            {/* USERS */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition p-5 sm:p-6">

              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl mb-4">
                👥
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Users Report
              </h2>

              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                Download details of all registered users,
                including their roles and email addresses.
              </p>

              <div className="flex flex-col gap-3 mt-6">

                <button
                  onClick={downloadUsersPDF}
                  className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl font-semibold hover:bg-slate-800 active:scale-[0.98] transition"
                >
                  📄 Download PDF
                </button>

                <button
                  onClick={downloadUsersExcel}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-teal-700 active:scale-[0.98] transition"
                >
                  📊 Download Excel
                </button>

              </div>

            </div>


            {/* SERVICES */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition p-5 sm:p-6">

              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl mb-4">
                🛠️
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Services Report
              </h2>

              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                Download details of services available on
                the GigSphere platform.
              </p>

              <div className="flex flex-col gap-3 mt-6">

                <button
                  onClick={downloadServicesPDF}
                  className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl font-semibold hover:bg-slate-800 active:scale-[0.98] transition"
                >
                  📄 Download PDF
                </button>

                <button
                  onClick={downloadServicesExcel}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-teal-700 active:scale-[0.98] transition"
                >
                  📊 Download Excel
                </button>

              </div>

            </div>


            {/* BOOKINGS */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition p-5 sm:p-6">

              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl mb-4">
                📋
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Bookings Report
              </h2>

              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                Download booking information including
                customers, providers, services and status.
              </p>

              <div className="flex flex-col gap-3 mt-6">

                <button
                  onClick={downloadBookingsPDF}
                  className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl font-semibold hover:bg-slate-800 active:scale-[0.98] transition"
                >
                  📄 Download PDF
                </button>

                <button
                  onClick={downloadBookingsExcel}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-teal-700 active:scale-[0.98] transition"
                >
                  📊 Download Excel
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Reports;
