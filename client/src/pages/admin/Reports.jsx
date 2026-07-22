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

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(file, "Users_Report.xlsx");

};
const downloadServicesPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("GigSphere Services Report", 14, 20);

  autoTable(doc, {
    startY: 30,

    head: [["Title", "Category", "Price"]],

    body: services.map((service) => [
      service.title,
      service.category,
      `₹${service.price}`,
    ]),
  });

  doc.save("Services_Report.pdf");

};
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

  const file = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(file, "Services_Report.xlsx");

};
const downloadBookingsPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("GigSphere Bookings Report", 14, 20);

  autoTable(doc, {
    startY: 30,

    head: [["Customer", "Provider", "Service", "Status"]],

    body: bookings.map((booking) => [

      booking.customer?.name || "N/A",

      booking.provider?.name || "N/A",

      booking.service?.title || "Deleted",

      booking.status,

    ]),
  });

  doc.save("Bookings_Report.pdf");

};
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-0 md:ml-64 flex-1 p-4 sm:p-6 lg:p-8">

        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="text-gray-500 mt-2">
          Download Platform Reports
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-semibold">
              Users Report
            </h2>

            <p className="text-gray-500 mt-2">
              Download all registered users.
            </p>

            <button
onClick={downloadUsersPDF}
className="mt-5 bg-green-600 text-white px-5 py-2 rounded-lg"
>
  Download PDF
</button>
<button
  onClick={downloadServicesPDF}
  className="mt-3 bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
>
  Download Excel
</button>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-semibold">
              Services Report
            </h2>

            <p className="text-gray-500 mt-2">
              Download all services.
            </p>

            <button
  onClick={downloadUsersPDF}
  className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
>
  Download PDF
</button>
<button
  onClick={downloadUsersExcel}
  className="mt-3 bg-green-600 text-white px-5 py-2 rounded-lg"
>
  Download Excel
</button>

          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-semibold">
              Bookings Report
            </h2>

            <p className="text-gray-500 mt-2">
              Download all bookings.
            </p>

            <button
  onClick={downloadBookingsPDF}
  className="mt-5 bg-purple-600 text-white px-5 py-2 rounded-lg"
>
  Download PDF
</button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;