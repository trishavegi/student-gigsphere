import { useEffect, useState } from "react";
import api from "../services/api";

function Reviews() {

  const [reviews, setReviews] = useState([]);

  const providerId = "PASTE_PROVIDER_ID";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {

    const response = await api.get(
      `/reviews/${providerId}`
    );

    setReviews(response.data);

  };
  const averageRating =
reviews.length > 0
?
(
reviews.reduce(
(sum, review)=>
sum + review.rating,
0
)
/
reviews.length
).toFixed(1)
:
0;

  return (
    <div>

      <h1>Reviews</h1>
      <h2>
Average Rating ⭐ {averageRating}
</h2>

      {
        reviews.map((review) => (

          <div key={review._id}>

            <h3>
              {review.userId.name}
            </h3>

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

    </div>
  );
}

export default Reviews;