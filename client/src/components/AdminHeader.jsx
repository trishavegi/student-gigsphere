function AdminHeader() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center mb-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Admin 👋
        </h1>

        <p className="text-gray-500 mt-1">
          Manage Student GigSphere Platform
        </p>
      </div>

      <div className="flex items-center gap-5">

        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="text-2xl">
          🔔
        </button>

        <img
          src="https://i.pravatar.cc/45"
          alt="Admin"
          className="rounded-full"
        />

      </div>

    </div>
  );
}

export default AdminHeader;