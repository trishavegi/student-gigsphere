import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie ,Line} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AdminCharts({ analytics ,monthlyData}) {

  const data = {
    labels: [
      "Users",
      "Services",
      "Bookings",
      "Accepted",
      "Pending",
      "Rejected",
      "Cancelled",
    ],

    datasets: [
      {
        label: "GigSphere Statistics",

        data: [
          analytics.users,
          analytics.services,
          analytics.bookings,
          analytics.accepted,
          analytics.pending,
          analytics.rejected,
          analytics.cancelled,
        ],

        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#F59E0B",
          "#10B981",
          "#FACC15",
          "#EF4444",
          "#6B7280",
        ],
      },
    ],
  };
  const pieData = {
  labels: [
    "Accepted",
    "Pending",
    "Rejected",
    "Cancelled",
  ],

  datasets: [
    {
      data: [
        analytics.accepted,
        analytics.pending,
        analytics.rejected,
        analytics.cancelled,
      ],

      backgroundColor: [
        "#22C55E",
        "#FACC15",
        "#EF4444",
        "#6B7280",
      ],
    },
  ],
};
const lineData = {
  labels: monthlyData.map(item => `Month ${item._id}`),

  datasets: [
    {
      label: "Bookings",

      data: monthlyData.map(item => item.total),

      borderColor: "#3B82F6",

      backgroundColor: "#93C5FD",

      fill: false,

      tension: 0.4,
    },
  ],
};
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Platform Statistics
      </h2>

      <Bar data={data} />
      <div className="mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Booking Status Distribution
  </h2>

  <div className="w-96">

    <Pie data={pieData} />
    <div className="bg-white rounded-xl shadow-lg p-6 mt-10">

  <h2 className="text-2xl font-bold mb-5">
    Monthly Bookings
  </h2>

  <Line data={lineData} />

</div>

  </div>

</div>

    </div>
  );
}

export default AdminCharts;