import { BrowserRouter, Routes, Route ,useLocation,} from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Reviews from "./pages/Reviews";
import AddReview from "./pages/AddReview";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import CreateService from "./pages/CreateService";
import MapPage from "./pages/MapPage";
import ServiceDetails from "./pages/ServiceDetails";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Services from "./pages/admin/Services";
import Bookings from "./pages/Admin/Bookings";
import Analytics from "./pages/Admin/Analytics";
import Users from "./pages/Admin/Users";
import Reports from "./pages/Admin/Reports";
import Complaints from "./pages/Admin/Complaints";
import Settings from "./pages/Admin/Settings";
import Providers from "./pages/Admin/Providers";
function AppContent() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith("/admin") && <Navbar />}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/services" element={<Services />} />
        <Route path="/admin/bookings" element={<Bookings />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/users" element={<Users />} />
        <Route
  path="/admin/reports"
  element={<Reports />}
/>
<Route
  path="/admin/complaints"
  element={<Complaints />}
/>
<Route
  path="/admin/settings"
  element={<Settings />}
/>
        <Route
          path="/customer-dashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/provider-dashboard"
          element={<ProviderDashboard />}
        />
        <Route
  path="/admin/providers"
  element={<Providers />}
/>

        <Route path="/reviews" element={<Reviews />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/chats" element={<ChatList />} />
        <Route path="/create-service" element={<CreateService />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/admin/analytics" element={<Analytics />} />

      </Routes>
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;