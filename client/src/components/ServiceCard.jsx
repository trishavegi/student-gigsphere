import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function ServiceCard({ service }) {

  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {

    if (!service.isDemo) {
      fetchReviews();
      checkFavorite();
    }

  }, [service]);

  const fetchReviews = async () => {

    try {

      const response = await api.get(
        `/reviews/${service.user._id}`
      );

      setReviews(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const checkFavorite = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await api.get(
        "/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const exists = response.data.find(
        (fav) => fav.service?._id === service._id
      );

      setIsFavorite(!!exists);

    } catch (error) {

      console.log(error);

    }

  };

  const handleBooking = async () => {

    if (service.isDemo) {

      alert(
        "This is a demo service. Please choose a real service to book."
      );

      return;

    }

    try {

      const token = localStorage.getItem("token");

      if (!token) {

        alert("Please login to book a service.");

        return;

      }

      await api.post(
        "/bookings",
        {
          serviceId: service._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking Request Sent!");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Booking failed"
      );

    }

  };

  const handleFavorite = async () => {

    if (service.isDemo) {

      alert(
        "Demo services cannot be added to favorites."
      );

      return;

    }

    try {

      const token = localStorage.getItem("token");

      if (!token) {

        alert("Please login first.");

        return;

      }

      await api.post(
        "/favorites",
        {
          serviceId: service._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setIsFavorite(!isFavorite);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update favorite"
      );

    }

  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "New";

  const providerName =
    service.user?.name || "Student Provider";

  return (

    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      {/* Demo label */}

      {service.isDemo && (

        <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          DEMO
        </div>

      )}

      {/* Favorite */}

      <button
        onClick={handleFavorite}
        className="absolute top-3 right-3 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-110 transition z-10"
        title={
          service.isDemo
            ? "Demo service"
            : "Add to favorites"
        }
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>


      <div className="p-6">

        {/* Provider */}

        <div className="flex items-center gap-3 mb-5">

          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white flex items-center justify-center text-lg font-bold">

            {providerName.charAt(0).toUpperCase()}

          </div>

          <div>

            <p className="text-xs text-slate-500">
              Provided by
            </p>

            <p className="font-semibold text-slate-800">
              {providerName}
            </p>

          </div>

        </div>


        {/* Category */}

        {service.category && (

          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">

            {service.category}

          </span>

        )}


        {/* Title */}

        <h2 className="text-2xl font-bold text-slate-800">

          {service.title}

        </h2>


        {/* Description */}

        <p className="text-slate-500 mt-3 leading-relaxed">

          {service.description}

        </p>


        {/* Price */}

        <div className="mt-5">

          <span className="text-2xl font-bold text-teal-600">

            ₹{service.price}

          </span>

          <span className="text-sm text-slate-400 ml-2">
            starting price
          </span>

        </div>


        {/* Rating */}

        <div className="mt-4 bg-yellow-50 rounded-xl px-4 py-3 flex items-center justify-between">

          <div>

            <span className="text-yellow-500 text-xl">
              ⭐⭐⭐⭐⭐
            </span>

          </div>

          <div className="font-bold text-slate-700">

            {averageRating}

          </div>

        </div>


        {/* Reviews */}

        {!service.isDemo && (

          <div className="mt-4">

            <p className="font-semibold text-slate-700">
              {reviews.length}{" "}
              {reviews.length === 1
                ? "Review"
                : "Reviews"}
            </p>

          </div>

        )}


        {/* Buttons */}

        <div className="flex gap-3 mt-6">

          <Link
            to={`/service/${service._id}`}
            className="flex-1"
          >

            <button className="w-full bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-200 transition">

              View Details

            </button>

          </Link>


          <button
            onClick={handleBooking}
            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >

            Book Now

          </button>

        </div>

      </div>

    </div>

  );

}

export default ServiceCard;