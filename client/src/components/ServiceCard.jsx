import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

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

    const response = await api.get("/favorites", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const exists = response.data.find(
      (fav) => fav.service._id === service._id
    );

    if (exists) {
      setIsFavorite(true);
    }

  } catch (error) {

    console.log(error);

  }

};

  const handleBooking = async () => {
     if (service.isDemo) {
    alert("This is a demo service. Please choose a real service to book.");
    return;
  }

    try {

      const token = localStorage.getItem("token");

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

      alert(error.response?.data?.message);

    }

  };

const handleFavorite = async () => {
  if (service.isDemo) {
    alert("Demo services cannot be added to favorites.");
    return;
  }

  try {

    const token = localStorage.getItem("token");

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

    // Toggle the heart after success
    setIsFavorite(!isFavorite);
    alert(
      isFavorite
        ? "Removed from Favorites 💔"
        : "Added to Favorites ❤️"
    );

  } catch (error) {

    console.log(error);

    alert(error.response?.data?.message || "Failed to update favorite");

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
      : 0;

  return (

    <div className="relative border p-5 rounded-xl shadow-lg m-4 bg-white">
      <h2 className="text-xl font-bold">
        {service.title}
      </h2>

      <p className="mt-2">
        {service.description}
      </p>

      <h3 className="text-green-600 mt-3">
        ₹{service.price}
      </h3>

      <h4 className="mt-2">
        ⭐ Average Rating : {averageRating}
      </h4>

      <hr className="my-3" />

      <h3 className="font-bold">
        Reviews
      </h3>

      {
        reviews.length === 0
        ?
        <p>No reviews yet</p>
        :
        reviews.map((review) => (

          <div key={review._id}>

            <p>
              {"⭐".repeat(review.rating)}
            </p>

            <p>
              {review.comment}
            </p>

            <hr />

          </div>

        ))
      }

      <div className="flex gap-3 mt-3">

  <Link to={`/service/${service._id}`}>
    <button className="bg-green-600 text-white px-4 py-2 rounded">
      View Details
    </button>
  </Link>

  <button
    onClick={handleBooking}
    className="bg-blue-500 text-white px-4 py-2 rounded"
  >
    Book Service
  </button>
  <button
  onClick={handleFavorite}
  className="absolute top-4 right-4 text-2xl"
>
  {isFavorite ? "❤️" : "🤍"}
</button>

</div>

    </div>

  );
}

export default ServiceCard;